import { Meteor } from 'meteor/meteor';
import './imports/publish/classes';
import './imports/publish/tutors';
import './imports/publish/users';
import './imports/publish/requests';
import './imports/publications/images';
import { Accounts } from 'meteor/accounts-base';

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false}); 

// very not secure
Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: 'google' },
            {
                $set: {
                clientId: '453095962576-n8osreaqhfol3m0vn5rlhepqek56vlb2',
                loginStyle: 'popup',
                secret:'cpw0xjpTUTeCrZRN_ilvscBm'
            }
        }
    );
   process.env.MAIL_URL = 'smtp://sandboxff74ed144c154ecf832508ba9c4b9d08.mailgun.org:mpkfaa123@smtp.mailgun.org:456';
});
Meteor.methods({
  'chargeCard': function(stripeToken, amount) {
    console.log(stripeToken);
    var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
    console.log('charge card called');
    Stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
    });
  },
  'sendVerificationLink':function() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
// Meteor.startup(() => {
//     ServiceConfiguration.configurations.upsert(
//         { service: 'facebook' },
//             {
//                 $set: {
//                 appId: '1866726566949246',
//                 loginStyle: 'popup',
//                 secret:'fc1a807fb273a28f6ce9f36a538966cf'
//             }
//         }
//     );
// });

// Meteor.startup(() => {
//   loadTutors();
// });