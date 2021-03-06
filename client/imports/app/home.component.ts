import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Meteor} from 'meteor/meteor';
import { Tutors } from '../../../both/collections/tutors.collection';
import { Tutor } from '../../../both/models/tutor.model';
import {InjectUser} from "angular2-meteor-accounts-ui";

import template from './home.component.html';
 import style from './home.component.scss';

@Component({
  selector: 'home',
  template,
  styles : [style] 
})
@InjectUser('user')
export class HomeComponent {
  tutorSub: Subscription;
  tutor: Tutor;

  constructor() {
  }
  
  ngOnInit(){
    let title = "ElMohfez, your place to learn Quran online";
    // let metaInfo = {name: "description", 
    //   content: "Elmohfez connects Quran teachers with students, It is the best way to learn Quran online with live classes"};
    DocHead.setTitle(title);  
    // DocHead.addMeta(metaInfo);

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

  avilableClasses():void{
   if (!Meteor.userId()) {
      alert('You hve to be a user to request a class');
      window.location.href='/signup';
      return;
    }
    window.location.href = '/tutors';
  }

  request():void{
    if (!Meteor.userId()) {
      alert('You hve to be a user to request a class');
      window.location.href='/signup';
      return;
    }
    window.location.href = '/request';
  }
  ngOnDestroy() {
    if(this.tutor){
        this.tutorSub.unsubscribe();
    }
  }
}