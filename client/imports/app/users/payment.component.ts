import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import template from './payment.component.html';

@Component({
  selector: 'payment',
  template
})
export class PaymentComponent implements OnInit, OnDestroy {
  payment_form: FormGroup;
  // cc
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  @Input()
  checkDetails: number = 0;

  constructor(
    private formBuilder: FormBuilder
  ) {}

    ngOnInit() {
        this.payment_form = this.formBuilder.group({
        cardNumber: ['', Validators.required],
        expiryMonth: ['', Validators.required],
        expiryYear: ['', Validators.required],
        cvc: ['', Validators.required]
        });
    }

    pay():void{
        const userId = Meteor.userId()
        console.log(this.checkDetails);
    }

    // if (this.payment_form.valid) {
    //   console.log('payment form valid')
    // }
    // const amount = this.tutor.hourly_rating;
    // Stripe.card.createToken({
    //   number: 4105605102445584,
    //   cvc: 057,
    //   exp_month: 11,
    //   exp_year: 18,
    // }, function(status, response) {
    //   console.log(status);
    //   console.log(response);
    //   stripeToken = response.id;
    //   Meteor.call('chargeCard', stripeToken, amount);
    // });
}