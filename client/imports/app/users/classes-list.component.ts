import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
 
import { Classes } from '../../../../both/collections/classes.collection';
import { Class_ } from  '../../../../both/models/class.model';
 
import template from './classes-list.component.html';
 
@Component({
  selector: 'classes-list',
  template
})
export class ClassesListComponent {
  classes: Observable<Class_[]>;
 
  constructor() {
    this.classes = Classes.find({}).zone();
  }

    // only activate when owner
    joinClass(c: Class_): void {
        Classes.remove(c._id);
    }
}