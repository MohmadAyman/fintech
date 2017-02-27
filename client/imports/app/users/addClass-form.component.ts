import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tutors } from '../../../../both/collections/tutors.collection';
import { Requests } from '../../../../both/collections/requests.collection';
import { Meteor } from 'meteor/meteor';
import template from './addClass-form.component.html';



// Should be renamed to addRequest
@Component({
  selector: 'addClass-Userform',
  template
})
export class AddClassUserFormComponent implements OnInit{
 startDate: any;
 addForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder
      ) {
  }
 
  ngOnInit() {
     if (!Meteor.userId()) {
      alert('You hve to be a user to request a class');
      window.location.href='/signup';
      return;
    }else{
      this.addForm = this.formBuilder.group({
        language: ['', Validators.required],
        startDate: ['',Validators.required],
        startTime: ['',Validators.required],
        comment: [''],
        userSkype: [''],
        userGmail: ['']
      });
    }
  }

  addClass(): void {

     if (!Meteor.userId()) {
      alert('Please log in first');
      return;
    }
    
    // TODO check if the user already requested a class
    if (this.addForm.valid) {
      Requests.insert(Object.assign({},this.addForm.value,{ userId: Meteor.userId() }));
      this.addForm.reset();
      window.location.href = '/thanks';
    }else{
      alert('Form invalid');
    }
  }

}