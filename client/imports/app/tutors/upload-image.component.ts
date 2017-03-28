import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { upload } from '../../../../both/methods/images.methods';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Thumb} from "../../../../both/models/image.model";
import {Thumbs} from "../../../../both/collections/images.collection";
import style from './parties-upload.component.scss';

import template from './upload-image.component.html';
 
@Component({
  selector: 'upload-image',
  template,
  styles: [style]
})
export class UploadImageComponent implements OnInit {
  fileIsOver: boolean = false;
  uploading: boolean = false;
  files: Subject<string[]> = new Subject<string[]>();
  thumbsSubscription: Subscription;
  filesArray: string[] = [];
  thumbs: Observable<Thumb[]>;
  @Output() onFile: EventEmitter<string> = new EventEmitter<string>();


  constructor() {}

 ngOnInit() {
    this.files.subscribe((filesArray) => {
      MeteorObservable.autorun().subscribe(() => {
        if (this.thumbsSubscription) {
          this.thumbsSubscription.unsubscribe();
          this.thumbsSubscription = undefined;
        }

        this.thumbsSubscription = MeteorObservable.subscribe("thumbs", filesArray).subscribe(() => {
          this.thumbs = Thumbs.find({
            originalStore: 'images',
            originalId: {
              $in: filesArray
            }
          }).zone();
        });

 
        this.thumbsSubscription = MeteorObservable.subscribe("thumbs", filesArray).subscribe();
      });
    });
  }
 

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

   
  onFileDrop(file: File): void {
    this.uploading = true;
    console.log('Iploading');
       upload(file)
      .then((result) => {
        this.uploading = false;
        this.addFile(result);
        console.log('uploaded');
        console.log(result);
      })
      .catch((error) => {
        this.uploading = false;
        console.log(`Something went wrong!`, error);
      });
    }
 
    addFile(file) {
      this.filesArray.push(file._id);
      this.files.next(this.filesArray);
      this.onFile.emit(file._id);
    }
    reset() {
      this.filesArray = [];
      this.files.next(this.filesArray);
    }
}
