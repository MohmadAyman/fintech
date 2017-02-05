import { Meteor } from 'meteor/meteor';
import { Classes } from '../../../both/collections/classes.collection';
 
Meteor.publish('classes', () => Classes.find());