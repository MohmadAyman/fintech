import { Component } from '@angular/core';
import template from './stripe.component.html';
// import style from './stripe.component.scss';

@Component({
  template
  // styles: [ style ],
})
export class StripeFormComponent {

}

// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   moduleId: module.id,
//   selector: 'sd-custom-form',
//   templateUrl: 'custom-form.component.html',
//   styleUrls: ['custom-form.component.css']
// })
// export class StripeFormComponent {
//   cardNumber: string;
//   expiryMonth: string;
//   expiryYear: string;
//   cvc: string;

//   message: string;

//   getToken() {
//     this.message = 'Loading...';

//     (<any>window).Stripe.card.createToken({
//       number: this.cardNumber,
//       exp_month: this.expiryMonth,
//       exp_year: this.expiryYear,
//       cvc: this.cvc
//     }, (status: number, response: any) => {
//       if (status === 200) {
//         this.message = `Success! Card token ${response.card.id}.`;
//       } else {
//         this.message = response.error.message;
//       }
//     });
//   }
// }