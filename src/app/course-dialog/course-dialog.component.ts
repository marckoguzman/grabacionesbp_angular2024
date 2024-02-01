import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialog,  MatDialogConfig,  MatDialogRef} from '@angular/material/dialog';
import {Course} from "../model/course";
import {Recordings} from "../model/recordings";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    description:string;

    /*
    form1 = this.fb.group({
       description: [this.course.description, Validators.required],
       category: [this.course.category,  Validators.required],
       releasedAt: [new Date(), Validators.required],
       longDescription: [this.course.longDescription, Validators.required]
    });
*/

    form = this.fb.group({
        conversationId: [this.recordings.conversationId, Validators.required],
        ani: [this.recordings.ani,  Validators.required],
        dnis: [this.recordings.dnis, Validators.required],
        cola: [this.recordings.cola, Validators.required],
        usuario: [this.recordings.usuario, Validators.required],
        identificacion: [this.recordings.identificacion, Validators.required],
        fecha: [this.recordings.fecha, Validators.required]
     });

   /* constructor(private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) private course:Course,
                private dialogRef: MatDialogRef<CourseDialogComponent>) {

        this.description = course.description;

    }*/

    constructor(private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private recordings:Recordings,
        private dialogRef: MatDialogRef<CourseDialogComponent>) {

this.description = "Id de conversacion";

}

    ngOnInit() {

    }

    close() {

        this.dialogRef.close();

    }

    save() {

        this.dialogRef.close(this.form.value);

    }
}


export function openEditCourseDialog1(dialog: MatDialog, course:Course) {

    const config1 = new MatDialogConfig();

    config1.disableClose = true;
    config1.autoFocus = true;
    config1.panelClass = "modal-panel";
    config1.backdropClass = "backdrop-modal-panel";

    config1.data = {
        ...course
    };

    const dialogRef = dialog.open(CourseDialogComponent, config1);

    return dialogRef.afterClosed();
}


export function openEditCourseDialog(dialog: MatDialog, recordings:Recordings) {

    const config = new MatDialogConfig();

    config.disableClose = false;
    config.autoFocus = false;
    config.panelClass = "modal-panel";
    config.backdropClass = "backdrop-modal-panel";

    config.data = {
        ...recordings
    };

    const dialogRef = dialog.open(CourseDialogComponent, config);

    return dialogRef.afterClosed();
}








