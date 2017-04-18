import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { CreditCardValidator } from 'ng2-cc-library';

// import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { Tutors } from '../../../../both/collections/tutors.collection';

import template from './tutors-form.component.html';

@Component({
  selector: 'tutors-form',
  template
})

export class TutorsFormComponent implements OnInit {
  addForm: FormGroup;
  images: string[] = [];
  a_day: number[] = new Array(24);
  times: number[][] = new Array();
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    for (var i = 0; i < 24; i++) {
        this.a_day[i]=0;
    }
    for (var i = 0; i < 7; i++) {
      this.times[i]=this.a_day;
    }
  console.log(this.times);
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      hourly_rating: ['', Validators.required],
      language: ['', Validators.required],
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]]
    });
  }
 
  onImage(imageId: string) {
    this.images.push(imageId);
    console.log(imageId);
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
      console.log(this.times);

      Tutors.insert(Object.assign({},this.addForm.value,{ userId: Meteor.userId()
      ,times: this.times, images: this.images}));

      // this.addForm.reset();
    }
  }

//   onImage(imageId: string) {
//     this.images.push(imageId);
//   }
}
