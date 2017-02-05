import { MongoObservable } from 'meteor-rxjs';
import { Class_ } from '../models/class.model';
import { Meteor } from 'meteor/meteor';

export const Classes = new MongoObservable.Collection<Class_>('classes');


function loggedIn() {
  return !!Meteor.user();
}
 
Classes.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});