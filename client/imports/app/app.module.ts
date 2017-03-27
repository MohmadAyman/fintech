import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import {AUTH_DECLARATIONS} from "./auth/index";
import { SHARED_DECLARATIONS } from './shared';

import { MdButtonModule } from "@angular2-material/button";
import { MdToolbarModule } from "@angular2-material/toolbar";
import { MdInputModule } from "@angular2-material/input";
import { MdCardModule } from "@angular2-material/card";
import { MdCoreModule } from "@angular2-material/core";
import { MdCheckboxModule } from "@angular2-material/checkbox";
import {MdListModule} from "@angular2-material/list";
import { FileDropModule } from "angular2-file-drop";

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TUTOR_DECLARATIONS } from './tutors';
import { USER_DECLARATIONS } from './users';
import { CommDeclerations } from './communication';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdInputModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdListModule.forRoot(),
    FileDropModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ...TUTOR_DECLARATIONS,
    ...SHARED_DECLARATIONS,
    ...AUTH_DECLARATIONS,
    ...USER_DECLARATIONS,
    ...CommDeclerations
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}