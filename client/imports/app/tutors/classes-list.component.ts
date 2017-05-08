import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Classes } from '../../../../both/collections/classes.collection';
import { Tutors } from '../../../../both/collections/tutors.collection';
import { Class_ } from  '../../../../both/models/class.model';
import { Tutor } from  '../../../../both/models/tutor.model';
import { Request } from  '../../../../both/models/request.model';
import { Requests } from '../../../../both/collections/requests.collection';
import template from './classes-list.component.html';
 
@Component({
  selector: 'classes-list',
  template
})
export class MyClassesListComponent implements OnInit, OnDestroy {
  classes: Observable<Class_[]>;
  noclasses: number=0;
  classSub: Subscription;
  requests: Observable<Request[]>;
  reqSub: Subscription;
  tutorSub: Subscription;
  is_a_tutor: boolean;
  tutor: Tutor;
  is_a_user: boolean;
  there_are_classes: boolean;
    ngOnInit() {
      this.is_a_user = false;
      if(Meteor.userId()){      
            this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
              this.tutor = Tutors.findOne({userId:{$eq:Meteor.userId()}});
              if(this.tutor){
                console.log('tutor');
                this.is_a_tutor=true;
                this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
                    this.classes = Classes.find({tutorId:{$eq:this.tutor._id}});
                    if(this.classes){
                      for(let i of this.classes){
                        this.noclasses=this.noclasses+1;
                        console.log('+1');
                      }
                    }else{
                      this.noclasses = 0;
                    }
                });
              }else{
                console.log('Not a tutor');
                this.is_a_user = true;
                this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
                    this.classes = Classes.find({userId:{$eq:Meteor.userId()}}).zone();
                    if(this.classes){
                      for(let i of this.classes){
                        this.noclasses=this.noclasses+1;
                        console.log('+1');
                      }
                    }else{
                      this.noclasses = 0;
                    }
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