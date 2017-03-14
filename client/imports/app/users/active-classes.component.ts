import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Classes } from '../../../../both/collections/classes.collection';
import { Class_ } from  '../../../../both/models/class.model';
import template from './active-classes.component.html';

@Component({
  selector: 'avilable-classes',
  template
})

export class AvilableClasses{
  classes: Observable<Class_[]>;
  username: string;
  classSub: Subscription;
  // times: string[];
  times: string[];
  time: string;
  AM: string;
  PM: string;
  timeAsNum: number;
  ngOnInit() {
    this.times = [['10:00-10:45'],[ '11:00-11:45'],['12:00-12:45'],[ '01:00-01:45']
    ,['02:00-02:45'],[ '03:00-03:45'],['04:00-04:45'],[ '05:00-05:45']
    ,['06:00-06:45'],[ '07:00-07:45'],['08:00-08:45'],[ '09:00-09:45']];
    if (!Meteor.userId()) {
      alert('You hve to be a user to request a class');
      window.location.href='/signup';
      return;
    }
    this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
          // console.log('displaying classes');
          // TODO only find classes where a userId doesn't exist.
          this.classes = Classes.find();
    });
  }

  book(): void {
    console.log(this.AM);
    // route to the page where the user enters
    // his skype name and confirms booking
  }
  trackByFn():boolean{
    return false;
  }
  ngOnDestroy() {
    
  }
  sky = 'skype:super.saiyan@live?call';
}
