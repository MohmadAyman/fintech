import { MongoObservable } from 'meteor-rxjs';
import { Request } from '../models/request.model';
import { Meteor } from 'meteor/meteor';

export const Requests = new MongoObservable.Collection<Request>('requests');

function loggedIn() {
  return !!Meteor.user();
}


Requests.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});