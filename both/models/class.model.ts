import { CollectionObject } from './collection-object.model';

export interface Class_ extends CollectionObject {
  tutorId: string; //tutor's UserId
  startDate: Date;
  startTime?: string;
  userId?: string;
  userGmail?: string;
  userSkype?: string;

  description?: string;
  rating?: Number;
  requestesIds?: string[]; //is it used?
  tutorEmail?: string;
}