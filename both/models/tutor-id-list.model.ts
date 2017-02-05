import { CollectionObject } from './collection-object.model';
import { Meteor } from 'meteor/meteor';

export interface TutorIdsList extends CollectionObject{
  tutorIds: string;
}