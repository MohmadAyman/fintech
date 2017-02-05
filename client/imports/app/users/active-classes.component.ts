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
  ngOnInit() {
    
    this.classSub = MeteorObservable.subscribe('classes').subscribe(() => {
          // console.log('displaying classes');
          // TODO only find classes where a userId doesn't exist.
          this.classes = Classes.find();
    });
  }
  
  ngOnDestroy() {
    
  }
  sky = 'skype:super.saiyan@live?call';
}
