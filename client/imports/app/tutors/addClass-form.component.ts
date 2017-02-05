import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tutors } from '../../../../both/collections/tutors.collection';
import { Classes } from '../../../../both/collections/classes.collection';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

import template from './addClass-form.component.html';
 
@Component({
  selector: 'addClass-form',
  template
})
@InjectUser('user')
export class AddClassFormComponent implements OnInit{
  user: Meteor.User;  
  addForm: FormGroup;
  tutorSub: Subscription;
  is_a_tutor: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit() {
     this.addForm = this.formBuilder.group({
      language: ['', Validators.required],
      startDate: ['',Validators.required],
      startTime: ['',Validators.required],
      comment: [''],
      userSkype: [''],
      userGmail: ['']
    });
  }

  addClass(): void {
     if (!Meteor.userId()) {
      alert('Please log in first');
      return;
    }
    this.tutorSub = MeteorObservable.subscribe('tutors').subscribe(() => {
            if(Tutors.findOne({userId:{$eq:Meteor.userId()}})){
              if (this.addForm.valid) {

                Classes.insert(Object.assign({},this.addForm.value,{ tutorId: Meteor.userId()}));
                
                alert('you have successfuly added a class at '+this.addForm.value.startTime);
                this.addForm.reset();
              }else{
                console.log(this.addForm.value);
                alert('Form invalid');
              }
            }else{
              alert('Are you a tutuor?');
            }
    }); 
    // check if hes a tutor
  }

}