import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from "meteor-rxjs";
import { Tutors } from "../../../../both/collections/tutors.collection";
import { Tutor } from "../../../../both/models/tutor.model";
// import { Accounts } from 'meteor/accounts-base';

import template from "./loginT.component.html";

@Component({
  selector: "login",
  template
})
export class LoginTComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  tutorId: string;
  tutor: Tutor;
  subscribed: boolaen;
  tutorSub: Subscription;

  constructor(
    private router: Router,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Bert.defaults = {
    //   hideDelay: 3500,
    // };
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.tutorSub = MeteorObservable.subscribe("tutors");
    this.error = "";
  }
  login() {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(
        this.loginForm.value.email,
        this.loginForm.value.password,
        err => {
          if (err) {
            this.zone.run(() => {
              this.error = err;
            });
            this.subscribed = false;
          } else {
            this.subscribed = true;
            this.tutorSub.subscribe(() => {
              this.tutor = Tutors.findOne({ userId: { $eq: Meteor.userId() } });
              if (this.tutor) {
                this.router.navigate(["/tutors/" + this.tutor._id]);
                console.log("jklkj");
              } else {
                Bert.alert("you are a user not a tutor", "danger");
                this.router.navigate(["/tutors"]);
              }
            });
          }
        }
      );
      // Meteor.loginWithGoogle({requestPermissions: ['email']
      //   }, function(error) {
      //     if (error) {
      //       console.log(error); //If there is any error, will get error here
      //     }else{
      //       console.log(Meteor.user());// If there is successful login, you will get login details here
      //     }
      //   });
    }
  }

  googleLogin(): void {
    Meteor.loginWithGoogle(
      {
        requestPermissions: [
          "email",
          "https://www.googleapis.com/auth/calendar"
        ],
        forceApprovalPrompt: true,
        requestOfflineToken: true
      },
      error => {
        if (error) {
          Session.set("errorMessage", error.reason || "Unknown error");
        } else {
          this.router.navigate(["/tutors"]);
        }
      }
    );
  }
  ngOnDestroy() {
    //   if(this.subscribed)
    //     this.tutorSub.unsubscribe();
  }
}
