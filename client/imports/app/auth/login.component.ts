import {Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Tutors } from '../../../../both/collections/tutors.collection';
import { Tutor } from  '../../../../both/models/tutor.model';

import template from './login.component.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  tutorId: string;
  tutor: Tutor;
  tutorSub: Subscription;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.tutorSub = MeteorObservable.subscribe('tutors');

    this.error = '';
  }

  login() {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          this.tutorSub.subscribe(() => {
            this.tutor = Tutors.findOne({userId:{$eq:Meteor.userId()}});
            if(this.tutor){
                window.location.href = '/tutors/'+this.tutor._id;
            }
            else{
              window.location.href = '/classesList';
            }
          });
  
    }
      });
    }
  }
  ngOnDestroy() {
    this.tutorSub.unsubscribe();
  }
}