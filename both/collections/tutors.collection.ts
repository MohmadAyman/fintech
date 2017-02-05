import { MongoObservable } from 'meteor-rxjs';
import { Tutor } from '../models/tutor.model';
import { Meteor } from 'meteor/meteor';

export const Tutors = new MongoObservable.Collection<Tutor>('tutors');

function loggedIn() {
  return !!Meteor.user();
}


Tutors.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});