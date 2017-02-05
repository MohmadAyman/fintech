import { CollectionObject } from './collection-object.model';

export interface Class_ extends CollectionObject {
  tutorId: string; //tutor's UserId
  language: string;
  startDate: Date;
  startTime: string;

  enrollmentRequests?: string[];
  userId?: string;
  userGmail?: string;
  userSkype?: string;
  description?: string;
  rating?: Number;
  maxCapacity?: Number;
  requestesIds?: string[]; //is it used?
  active?: boolean;
  tutorEmail?: string;
}

interface Schedule {
  startDate: Date;
  startTime?: string;
}