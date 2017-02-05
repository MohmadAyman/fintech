import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Classes } from '../../../../both/collections/classes.collection';
import { Tutors } from '../../../../both/collections/tutors.collection';
import { Class_ } from  '../../../../both/models/class.model';
import { Request } from  '../../../../both/models/request.model';
import { Requests } from '../../../../both/collections/requests.collection';
import template from './classes-list.component.html';
 
@Component({
  selector: 'classes-list',
  template
})
export class MyClassesListComponent implements OnInit, OnDestroy {
  classes: Observable<Class_[]>;
  classSub: Subscription;
  requests: Observable<Request[]>;
  reqSub: Subscription;
  tutorSub: Subscription;
  is_a_tutor: boolean;
  is_a_user: boolean;
  there_are_classes: boolean;
    ngOnInit() {
      this.is_a_user = false;
      if(Meteor.userId()){      
            this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
              if(Tutors.findOne({userId:{$eq:Meteor.userId()}})){
                console.log('tutor');
                this.is_a_tutor=true;
                this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
                    this.classes = Classes.find({tutorId:{$eq:Meteor.userId()}});
                });
              }else{
                console.log('Not a tutor');
                this.is_a_user = true;
                this.reqSub = MeteorObservable.subscribe('requests').subscribe(() => {
                    this.requests = Requests.find({userId:{$eq:Meteor.userId()}}).zone();
                });
                this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
                    this.classes = Classes.find({userId:{$eq:Meteor.userId()}}).zone();
                });
              }
            });

          }
        }
  
  ngOnDestroy() {
    if(Meteor.userId()){
      if(!this.is_a_tutor){
        this.reqSub.unsubscribe();
      }
        this.classSub.unsubscribe();
    }
  }
}