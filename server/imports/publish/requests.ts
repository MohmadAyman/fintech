import { Meteor } from 'meteor/meteor';
import { Requests } from '../../../both/collections/requests.collection';

Meteor.publish('requests', () => Requests.find());
