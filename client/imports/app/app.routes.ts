import { Route } from '@angular/router';
 
import { TutorsListComponent } from './tutors/tutors-list.component';
import { AddClassFormComponent } from './tutors/addClass-form.component';
import { AddClassUserFormComponent } from './users/addClass-form.component';
import { TutorsFormComponent } from './tutors/tutors-form.component'; 
import { MyClassesListComponent } from './tutors/classes-list.component';
import { ClassDetailsComponent } from './tutors/class-details.component';
import { TutorDetailsComponent } from './tutors/tutor-details.component';
import {LoginComponent} from "./auth/login.component";
import {SignupComponent} from "./auth/singup.component";
import {RecoverComponent} from "./auth/recover.component";
import { SignupTutorComponent } from "./auth/singup-tutor.component";
import { VideoOneToOneComponent } from './communication/video-one-to-one.component';
import { HomeComponent } from './home.component';
import { AvilableClasses } from './users/active-classes.component';
import { ThanksComponent} from './users/thanks.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'tutors', component: TutorsListComponent },
  { path: 'request', component: AddClassUserFormComponent },
  { path: 'newtutor', component: TutorsFormComponent },
  { path: 'addClass', component: AddClassFormComponent },
  { path: 'classesList', component: MyClassesListComponent},
  { path: 'class/:classId', component: ClassDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'tutor/signup', component: SignupTutorComponent},
  { path: 'one2one', component: VideoOneToOneComponent},
  { path: 'avilable-classes', component: AvilableClasses},
  { path: 'tutors/:tutorId', component: TutorDetailsComponent}
];