import { MongoObservable } from 'meteor-rxjs';
import { TutorIdsList } from '../models/tutor-id-list.model';

export const TutorsIds = new MongoObservable.Collection<TutorIdsList>('tutors-ids');

function loggedIn() {
  return true;
}

TutorsIds.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});