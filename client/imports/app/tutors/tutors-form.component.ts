import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
// import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { Tutors } from '../../../../both/collections/tutors.collection';

import template from './tutors-form.component.html';

@Component({
  selector: 'tutors-form',
  template
})

export class TutorsFormComponent implements OnInit {
  addForm: FormGroup;
  // language_list = [
  //   { display: 'Arabic' },
  //   { display: 'English' },
  //   { display: 'French' },
  // ];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  // AccountsModule.onCreateUser(function(options, user) {
  //     console.log(user._id);

  //     return user;
  // });

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      hourly_rating: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

  // addTutor(): void {
  //   if (this.addForm.valid) {
  //     Tutors.insert(this.addForm.value);
 
  //     this.addForm.reset();
  //   }
  // }

  addTutor(): void {
    if (!Meteor.userId()) {
      alert('login first to be able to register as a Tutor');
      return;
    }

    if (this.addForm.valid) {
      Tutors.insert(Object.assign({},this.addForm.value,{ userId: Meteor.userId()}));

      this.addForm.reset();
    }
  }

//   onImage(imageId: string) {
//     this.images.push(imageId);
//   }
}
