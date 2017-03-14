import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

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
export class ConfirmBooking implements OnInit, OnDestroy {
  paramsSub: Subscription;
  tutorId: string;
  time: number;
  constructor(
  ) {}

  ngOnInit() {    
    this.paramsSub = this.route.params
        .map(params => params['tutorId']) 
        .subscribe(tutorId => {
          this.tutorId = tutorId;
          console.log(this.tutorId);
    
          // if (this.tutorSub) {
          //   this.tutorSub.unsubscribe();
          // }
      });
      console.log(this.tutorId);
      this.paramsSub = this.route.params
        .map(params => params['classTime']) 
        .subscribe(classTime => {
          this.time = classTime;
          // if (this.tutorSub) {
          //   this.tutorSub.unsubscribe();
          // }
      });
      console.log(time);
  }


  ngOnDestroy() {
  }

}