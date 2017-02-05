import { Meteor } from 'meteor/meteor';
import { Users } from '../../../both/collections/users.collection';

Meteor.publish('users', () => Users.find());
