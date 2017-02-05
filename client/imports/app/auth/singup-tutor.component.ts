import {Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { TutorsIds } from '../../../../both/collections/tutors-ids.collection';
import template from './signup.component.html';
import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'signup',
  template
})
export class SignupTutorComponent implements OnInit {
  signupForm: FormGroup;
  error: string;
  title: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.title = 'Signup tutor';
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    TutorsIds.insert({ tutorIds: Meteor.userId() });
    this.error = '';
  }

  signup() {
    if (this.signupForm.valid) {
      Accounts.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }
}