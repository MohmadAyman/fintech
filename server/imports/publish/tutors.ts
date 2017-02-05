import { Meteor } from 'meteor/meteor';
import { Tutors } from '../../../both/collections/tutors.collection';

Meteor.publish('tutors', () => Tutors.find());
