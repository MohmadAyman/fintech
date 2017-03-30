import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

import { Requests } from '../../../../both/collections/requests.collection';
import { Request } from '../../../../both/models/request.model';

import 'rxjs/add/operator/map';

import { Users } from '../../../../both/collections/users.collection';

import { Classes } from '../../../../both/collections/classes.collection';
import { Class_ } from  '../../../../both/models/class.model';

import { Tutors } from '../../../../both/collections/tutors.collection';
import { Tutor } from  '../../../../both/models/tutor.model';

import template from './tutor-details.component.html';

@Component({
  selector: 'tutor-details',
  template
})
@InjectUser('user')
export class TutorDetailsComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  today_show: Date = new Date();
  lastUpdateDate: Date;
  diffrenceDays: number;
  tutorId: string;
  slot: number;
  color: string[]= new Array(24); 
  day: number=0;
  tutorAsUserId: string;
  tutor: Tutor;
  paramsSub: Subscription;
  classesSub: Subscription;
  reqSub: Subscription;
  tutorSub: Subscription;
  requests: Observable<Request[]>;
  mailtoTutor: string;
  tutor_user_email: string;
  //TODO enable tutors to hold more than one class.
  class: Class_;
  tutorClasses: Observable<Class_[]>;
  user: Meteor.User;
  subbed: boolean;

  a_day: number[] = new Array(24);
  tutorSchedule: number[][] = new Array();
  colorsSched: string[][] = new Array();

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.today);
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
    // TODO handle if thelustupdateDate doesnt exist yet
    this.lastUpdateDate = this.tutor.lastUpdateDate;
    if(!this.lastUpdateDate){
      console.log('first edit');
      this.lastUpdateDate = this.today;
    }
    console.log(this.lastUpdateDate);
    this.diffrenceDays = this.lastUpdateDate.getDate() - this.today.getDate();
    console.log(this.diffrenceDays);
    for (var i = 0; i < 7; i++) {
        for(var j = 0; j < 24; j++) {
          if(this.tutorSchedule[i][j]==1){
            this.colorsSched[i][j]='blue';
          }else if(this.tutorSchedule[i][j]==0){
            this.colorsSched[i][j]='green';
          }else{
            this.colorsSched[i][j]='red';
          }
        }
      }
 });

  console.log(this.colorsSched);
  this.tutorSub = MeteorObservable.subscribe('users').subscribe(() => {
      this.tutor_user_email=Users.findOne(this.tutorAsUserId).emails[0].address;
      this.mailtoTutor="mailto:"+ this.tutor_user_email;
  });
    
  this.reqSub = MeteorObservable.subscribe('requests').subscribe(() => {
      this.requests=Requests.find();
  });
    
    //TODO only find classes that this tutor do
    this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
      this.tutorClasses = Classes.find({tutorId: {$eq: this.tutorAsUserId} });
    });
  }

  get isMe(): boolean {
    if(this.user)
      return this.user._id === this.tutorAsUserId;
    return false;
  }

  addClass(r: Request): void{
    Classes.insert(Object.assign({ tutorId: Meteor.userId() 
        ,language:this.tutor.language,
        startDate: r.startDate, startTime: r.startTime, userId:r.userId,
        userGmail: r.userGmail, userSkype: r.userSkype}));
    Requests.remove(r._id);
  }

  toggleSlot(i: number): void {
    this.today_show.setHours(i,0,0);
    this.slot = i;
    console.log(this.day);
    if(this.tutorSchedule[this.day][i]==0){
      this.tutorSchedule[this.day][i]=1;
      this.colorsSched[this.day][i]='blue';
    }else{
      this.tutorSchedule[this.day][i]=0;
      this.colorsSched[this.day][i]='green';
    }
  }

  changeDay(i : number): void{
    console.log(i);
    this.day = i;
    this.today_show.setDate(this.today.getDate()+i);
    for(var j = 0; j < 24; j++) {
      if(this.tutorSchedule[i][j]==1){
        this.colorsSched[i][j]='blue';
      }else if(this.tutorSchedule[i][j]==0){
        this.colorsSched[i][j]='green';
      }else{
        this.colorsSched[i][j]='red';
      }
      // TODO Handle if the slot is already booked
    }
  }

  addSlot(): void{
    this.lastUpdateDate = this.today;
    this.today.setDate( this.today.getDate() + 7);
    console.log(this.tutorSchedule);
    Tutors.update(this.tutorId, {
              $set:{times: this.tutorSchedule
                , lastUpdateDate: this.lastUpdateDate }
          });
    // window.location.href = 'confirm-booking/'+this.tutorId+'/'+i;
  }

  ngOnDestroy() {
    this.reqSub.unsubscribe();
    this.classesSub.unsubscribe();
    this.paramsSub.unsubscribe();
    this.tutorSub.unsubscribe();
  }

}