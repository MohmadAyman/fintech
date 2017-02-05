import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Meteor} from 'meteor/meteor';
import { Tutors } from '../../../both/collections/tutors.collection';
import { Tutor } from '../../../both/models/tutor.model';
import {InjectUser} from "angular2-meteor-accounts-ui";

import template from './home.component.html';
// import style from './home.component.scss';

@Component({
  selector: 'home',
  template
//   styles : [style] 
})
@InjectUser('user')
export class HomeComponent {
  tutorSub: Subscription;
  tutor: Tutor;

  constructor() {
  }
  
  ngOnInit(){
    if(Meteor.userId()){
      this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
            // console.log(Meteor.userId());
            this.tutor = Tutors.findOne({userId:{$eq:Meteor.userId()}});
      });
    }
  }

  logout() {
    Meteor.logout();
  }

  ngOnDestroy() {
    if(this.tutor){
        this.tutorSub.unsubscribe();
    }
  }
}