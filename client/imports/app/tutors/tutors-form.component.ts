import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { CreditCardValidator } from 'ng2-cc-library';
import { InjectUser } from "angular2-meteor-accounts-ui";

// import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { Users } from '../../../../both/collections/users.collection';
import { User } from  '../../../../both/models/user.model';

import { Tutors } from '../../../../both/collections/tutors.collection';
import { Router } from '@angular/router';

import template from './tutors-form.component.html';

@Component({
  selector: 'tutors-form',
  template
})
@InjectUser('user')
export class TutorsFormComponent implements OnInit {
  addForm: FormGroup;
  user: User;
  submitted: boolean = false;
  step1: boolean=true;

  images: string[] = [];
  a_day: number[] = new Array(24);
  times: number[][] = new Array();
  constructor(private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log(Meteor.userId());
    if(Meteor.userId()){
      this.user = Users.findOne(Meteor.userId());
    }
    for (var i = 0; i < 24; i++) {
        this.a_day[i]=0;
    }
    for (var i = 0; i < 7; i++) {
      this.times[i]=this.a_day;
    }
  console.log(this.times);
    this.addForm = this.formBuilder.group({
      hourly_rating: ['', Validators.required],
      language: ['', Validators.required],
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }
 
  onImage(imageId: string) {
    this.images.push(imageId);
    // console.log(imageId);
  }

  addTutor(): void {
   this.submitted = true;
    console.log(Meteor.userId());
    
      if (this.addForm.valid) {
          Accounts.createUser({
            email: this.addForm.value.email,
            password: this.addForm.value.password,
            username: this.addForm.value.username
          }, (err) => {
            if (err) {
              this.zone.run(() => {
                this.error = err;
              });
            } else {
              console.log(Meteor.userId())

              Tutors.insert(Object.assign({},this.addForm.value,{ userId:Meteor.userId(), name: this.user.username ,times: this.times, images: this.images, createdAt: new Date()}));
              Bert.alert('You are now a tutor','success');
              this.route.navigate(['/']);
              // this.router.navigate(['/']);
            //   Meteor.call( 'sendVerificationLink', ( error, response ) => {
            //   if ( error ) {
            //     Bert.alert( error.reason, 'danger' );
            //   } else {
            //     Bert.alert( 'Welcome!', 'success' );
            //   }
            // });
            }
          });
      }
      else{
        Bert.alert('Form invalid','danger');
      }
  }

//   onImage(imageId: string) {
//     this.images.push(imageId);
//   }
}
