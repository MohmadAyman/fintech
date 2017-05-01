import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    if(Meteor.userId()){
      Bert.alert( 'You are already signedin, redirecting', 'danger' );
      setTimeout(() => 
      {
          this.router.navigate(['/']);
      },
      2000);
    }    
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });

    this.error = '';
  }

  googleLogin():void{

    Meteor.loginWithGoogle({
        requestPermissions: ['email','https://www.googleapis.com/auth/calendar'],
        forceApprovalPrompt: true,
        requestOfflineToken: true
        }, (error) => {
          if (error) {
            Session.set('errorMessage', error.reason || 'Unknown error');
          }else{
              this.router.navigate(['/tutors']);
          }
        });
 }
 
  signup() {
    console.log('in signup');
    if (this.signupForm.valid) {
    console.log('valid');
     Bert.alert('Form valid', 'success');
      Accounts.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        username: this.signupForm.value.username
      }, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          console.log('nth')
          this.router.navigate(['/']);
        //   Meteor.call( 'sendVerificationLink', ( error, response ) => {
        //   if ( error ) {
        //     Bert.alert( error.reason, 'danger' );
        //   } else {
        //     Bert.alert( 'Welcome!', 'success' );
        //   }
        // });
        }
      });
    }else{
     Bert.alert('Form invalid', 'danger');
    }
  }
}