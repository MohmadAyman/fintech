import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Tutors } from '../../../../both/collections/tutors.collection';
import { Tutor } from  '../../../../both/models/tutor.model';
 
import template from './tutors-list.component.html';
import style from './tutors-list.component.scss';


@Component({
  selector: 'tutors-list',
  template,
  styles : [style] 

})
export class TutorsListComponent {
  tutors: Observable<Tutor[]>;
  t : Tutor;
  loggedIn: boolean=true;
  tutorSub: Subscription;
  imagesSubs: Subscription;
 
   ngOnInit() {
      this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
      this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
        
        this.tutors = Tutors.find({}).zone();
      });
  
        // if (this.tutorSub) {
        //   this.tutorSub.unsubscribe();
        // }      
  

      //TODO only find classes that this tutor do
      // this.classesSub = MeteorObservable.subscribe('classes').subscribe(() => {
      //   this.tutorClasses = Classes.find().zone();
      // });
  }

    get isAdmin(): boolean{
      return false;
    }

    removeTutor(tutor: Tutor){
      Tutors.remove(tutor._id);
    }

    booktrial(tutor: Tutor): void{
      // if(Meteor.userId()){
      //   window.location.href = '/tutors/' + tutor._id;
      // }
    }

    ngOnDestroy() {
      // this.classesSub.unsubscribe();
      // this.paramsSub.unsubscribe();
      this.tutorSub.unsubscribe();
      this.imagesSubs.unsubscribe();
    }

}