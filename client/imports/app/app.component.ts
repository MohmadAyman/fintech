import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Meteor } from 'meteor/meteor';
import {InjectUser} from "angular2-meteor-accounts-ui";
import style from './app.component.scss';
import template from './app.component.html';
 

@Component({
  selector: 'app',
  // styles: [ style ],
  template
})
@InjectUser('user')
export class AppComponent {

  constructor() {
  }
  ngOnInit() {
    
  }
  logout() {
    Meteor.logout();
  }
  ngOnDestroy() {

  }
}