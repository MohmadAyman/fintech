import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {ROUTER_DIRECTIVES, Location} from "angular2/router";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from 'ng2-cc-library';

import { Requests } from '../../../../both/collections/requests.collection';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../../../../both/models/request.model';

import 'rxjs/add/operator/map';

import { Users } from '../../../../both/collections/users.collection';

import { Classes } from '../../../../both/collections/classes.collection';
import { Class_ } from  '../../../../both/models/class.model';

import { Tutors } from '../../../../both/collections/tutors.collection';
import { Tutor } from  '../../../../both/models/tutor.model';

import { Accounts } from 'meteor/accounts-base';

import style from './tutor-details.component.scss';
import template from './tutor-details.component.html';

import {IMyOptions} from 'mydatepicker';

Meteor.startup(() => {
    Accounts.ui.config({requestPermissions:{google:['https://www.googleapis.com/auth/calendar']}, forceApprovalPrompt: {google: true}, requestOfflineToken: {google: true}});

    Stripe.setPublishableKey(Meteor.settings.public.stripe.livePublishableKey);
    var handler = StripeCheckout.configure({
      key: Meteor.settings.public.stripe.testPublishableKey,
      token: function(token) {}
    });
});
 
@Component({
  selector: 'tutor-details',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class TutorDetailsComponentUser implements OnInit, OnDestroy {
  loggedIn:boolean=true;
  user_skype_email: string;
  today: Date = new Date();
  today_show: Date = new Date();
  tutorId: string;
  slot: number;
  color: string[]= new Array(24); 
  day: number=1;
  tutorAsUserId: string;
  tutor: Tutor;
  paramsSub: Subscription;  
  imagesSubs: Subscription;
 
  classesSub: Subscription;
  reqSub: Subscription;
  tutorSub: Subscription;
  requests: Observable<Request[]>;
  mailtoTutor: string;
  tutor_user_email: string;
  class: Class_;
  tutorClasses: Observable<Class_[]>;
  user: Meteor.User;
  checkout: boolean=false;
  a_day: number[] = new Array(24);
  tutorSchedule: number[][] = new Array();
  colorsSched: string[][] = new Array();

  range_for_disp: number[] = new Array(12);
  amount: number=0;

  checkDetails: string[]=new Array(3);
  payment_form: FormGroup;
  payment_form_2: FormGroup;
  submitted: boolean = false;

  g_calendar: boolean=false;

  // cc
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute

  ) {}

  private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        inline: true,
        disableDateRanges: [{ begin: {year: this.today.getFullYear(), month: this.today.getMonth()-2, day: this.today.getDate()}, end: {year: this.today.getFullYear(),
           month: this.today.getMonth()+1, day: this.today.getDate()-1} },{ begin: {year: this.today.getFullYear(),month: this.today.getMonth()+1, day: this.today.getDate()+7}, 
           end: {year: this.today.getFullYear(),month: this.today.getMonth()+2, day: this.today.getDate()} }]
  };

    // Initialized to specific date (09.10.2018).
    private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  
  ngOnInit() {
    console.log(Meteor.userId());
     if(!Meteor.userId()){
        this.loggedIn=false;
          Bert.alert( 'You need to be logged in to view this page', 'danger', 'fixed-bottom' );
          this.router.navigate('/login');
    }

    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();

    this.payment_form_2 = this.formBuilder.group({
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      expDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] 
    });

  this.payment_form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvc: ['', Validators.required]
    });
    for (var i = 0; i < 24; i++) {
        this.color[i]='green';
    }
    for (var i = 0; i < 7; i++) {
      this.colorsSched[i]=this.color;
    }
 
    this.paramsSub = this.route.params
      .map(params => params['tutorId']) 
      .subscribe(tutorId => {
        this.tutorId = tutorId;
        if (this.tutorSub) {
          this.tutorSub.unsubscribe();
        }
    });

  this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
    this.tutor=Tutors.findOne(this.tutorId);
    this.tutorAsUserId=this.tutor.userId;
    this.tutorSchedule=this.tutor.times;
    this.amount = this.tutor.hourly_rating;

    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let utc1 = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    let utc2 = Date.UTC(this.tutor.lastUpdateDate.getFullYear(), this.tutor.lastUpdateDate.getMonth(), this.tutor.lastUpdateDate.getDate());
    let last_update_diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    for (var i = 0; i < last_update_diff; i++) {
        for(var j = 0; j < 24; j++) {
          this.colorsSched[i][j]='blue';
        }
      }

    for (var i = last_update_diff; i < 7; i++) {
        for(var j = 0; j < 24; j++) {
          // console.log(this.tutorSchedule[i][j]);
          if(this.tutorSchedule[i][j]==1){
            this.colorsSched[i][j]='blue';
          }else{
            this.colorsSched[i][j]='green';
          }
        }
      }
    // console.log(this.colorsSched);
 });


  console.log(this.colorsSched);
  this.tutorSub = MeteorObservable.subscribe('users').subscribe(() => {
      this.tutor_user_email=Users.findOne(this.tutorAsUserId).emails[0].address;
      this.mailtoTutor="mailto:"+ this.tutor_user_email;
  });
    
    
    //TODO only find classes that this tutor do 34064745
    this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
      this.tutorClasses = Classes.find({tutorId: {$eq: this.tutorAsUserId} });
    });
  }

  get isMe(): boolean {
    if(this.user)
      return this.user._id === this.tutorAsUserId;
    return false;
  }

  toggleSlot(i: number): void {
    this.today_show.setHours(i,0,0);
    this.slot = i;
    console.log(this.tutorSchedule[this.day][i]);
    if(this.tutorSchedule[this.day][i]==0){
      this.tutorSchedule[this.day][i]=1;
      this.colorsSched[this.day][i]='green';
    }else if(this.tutorSchedule[this.day][i]==1){
      this.tutorSchedule[this.day][i]=0;
      this.colorsSched[this.day][i]='blue';
    }
    // else if(this.colorsSched[this.day][i]='blue'){
    //   this.colorsSched[this.day][i]='green';
    // }
  }

  onDateChanged(event: IMyDateModel) {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let utc1 = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    let utc2 = Date.UTC(event.jsdate.getFullYear(), event.jsdate.getMonth(), event.jsdate.getDate());
    let diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    let i = diff;
    this.day = diff;
    this.today_show.setDate(this.today.getDate()+i);
    for(var j = 0; j < 24; j++) {
      // console.log(this.tutorSchedule[i][j]);
      if(this.tutorSchedule[i][j]==1){
        this.colorsSched[i][j]='green';
      }else{
        this.colorsSched[i][j]='red';
      }
    }
  }

  CheckoutFn():void{
    if (this.payment_form.valid) {
      console.log('payment form valid')
      Stripe.card.createToken({
        number: this.payment_form.value.cardNumber,
        cvc: this.payment_form.value.cvc,
        exp_month: this.payment_form.value.expiryMonth,
        exp_year: this.payment_form.value.expiryYear
      }, function(status, response) {
        console.log(status);
        console.log(response.error.message);
        stripeToken = response.id;
        Meteor.call('chargeCard', stripeToken, amount);
      });
    }
  }

  step1(): void{
    this.checkout = false;
  }

  GoToCheckOut(): void{
    // if(!this.user_skype_email){
    //   alert('Please enter your skype username so the teatch can contact you :)');
    // }else{
    //   alert('you are now registered in this class :)');
    // }
    console.log(this.slot);
    console.log(this.tutorSchedule)
    this.tutorSchedule[this.day][this.slot]=2;
    // Tutors.update(this.tutorId, {
    //           $set:{times: this.tutorSchedule }
    //       });
    this.checkout=true;
  }

  onSubmit() {
    let success= false;
    let free= true;
    if (this.payment_form_2.valid) {
        this.submitted = true;
        let m = this.payment_form_2.value.expDate[0]+this.payment_form_2.value.expDate[1];
        let y = this.payment_form_2.value.expDate[5]+this.payment_form_2.value.expDate[6];

        Bert.alert('berfore payment','success');
        Stripe.card.createToken({
          number: this.payment_form_2.value.creditCard,
          cvc: this.payment_form_2.value.cvc,
          exp_month: m,
          exp_year: y
        }, function(status, response) {
          console.log(status);
          console.log(response);
          stripeToken = response.id;
          // Meteor.call('chargeCard', stripeToken, this.amount);
          Meteor.call('chargeCard', stripeToken, 3);
        });
        Bert.alert('Thanks for booking my class','success');
        this.router.navigate(['/thanks']);

        // let id = Classes.findOne({
        //   userId:{
        //     $elemMatch:{$eq: Meteor.userId()}
        //   }
        // })._id;

        // console.log(id);
        // if(id){
        //   free=false;
        // }
    }

        // if(free||success){
        // //add the user skype user name to the class
        //   Classes.insert(Object.assign({ userId: Meteor.userId(),
        //     tutorId: this.tutorId,startDate: this.today_show, userSkype: this.user_skype_email}));
        //     this.router.navigate(['/thanks']);
        // }else{
        //   Bert.alert('Payment failed, or you are already registered in another classs', 'danger');
        // }
      // this.g_calendar=true;
    }

  addToCalendnaer():void {
    
  // let dateString = "2010-08-09 01:02:03"
  // , reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
  // , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString)
  // , dateObject = new Date(year, month-1, day, hours, minutes, seconds);
  // let utc1 = Date.UTC(this.today_show.getFullYear(), this.today_show.getMonth(), this.today_show.getDate());
  // console.log(utc1);
  // console.log(this.today_show[1]);
  let user = Meteor.users.findOne({_id: Meteor.userId()});
    
    const event = {
      'summary': 'Quran Class',
      'location': 'Online- Skype',
      'description': '45min class',
      'start':{
        'dateTime': this.today_show.toISOString(),
        'timeZone': 'America/Los_Angeles'},
      'end':{
        'dateTime': this.today_show.toISOString(),
        'timeZone': 'America/Los_Angeles'}
      };
    GoogleApi.post('calendar/v3/calendars/primary/events', { data: event },function (error, result){
      console.log(error);
      console.log(result);
    });
      
  }


  ngOnDestroy() {
    this.classesSub.unsubscribe();
    this.paramsSub.unsubscribe();
    this.tutorSub.unsubscribe();
    this.imagesSubs.unsubscribe();
  }

}
