import { Meteor } from 'meteor/meteor';
import './imports/publish/classes';
import './imports/publish/tutors';
import './imports/publish/users';
import './imports/publish/requests';
import './imports/publications/images';
import { Accounts } from 'meteor/accounts-base';

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false}); 

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster@sandboxff74ed144c154ecf832508ba9c4b9d08.mailgun.org:mpkfaa123@smtp.mailgun.org:587';
});

// Meteor.startup(() => {
//   loadTutors();
// });