import {Component, Inject, OnInit, ViewEncapsulation,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialog,  MatDialogConfig,  MatDialogRef} from '@angular/material/dialog';
import {Course} from "../model/course";
import {Recordings} from "../model/recordings";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { FormControl } from '@angular/forms';
@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})



export class CourseDialogComponent implements OnInit {
    dropdownList = [];
    dropdownListQU = [];
    selectedItems = [];
    selectedItemsQU = [];
    dropdownSettings={};
    dropdownSettingsQU={};
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
        private dialogRef: MatDialogRef<CourseDialogComponent>,private http: HttpClient) {

this.description = "Id de conversacion";

}
getdataUser(): void {
    let tmp = [];
    this.http.get<any>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push({ item_id: i, item_text: data[i].name });
      }
      this.dropdownList = tmp;
    });
  }

  getdataQueues(): void {
    let tmp = [];
    this.http.get<any>('https://ze9l39fzei.execute-api.us-east-1.amazonaws.com/dev/genesyscolas').subscribe(data => {
      for(let i=0; i < data.queues.length; i++) {
        tmp.push({ id: data.queues[i].id, name: data.queues[i].name });
      }
      this.dropdownListQU = tmp;
      //console.log("Colkas"+ tmp)
    });
  }

  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}

onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}

onItemSelectQU(item:any){
    console.log(item);
    console.log(this.selectedItemsQU);
}
OnItemDeSelectQU(item:any){
    console.log(item);
    console.log(this.selectedItemsQU);
}
onSelectAllQU(items: any){
    console.log(items);
}
onDeSelectAllQU(items: any){
    console.log(items);
}

    ngOnInit() {
       // this.openEditCourseDialog();
       this.getdataUser();
       this.dropdownSettings = {
         singleSelection: false,
         idField: 'item_id',
         textField: 'item_text',
         selectAllText: 'Select All',
         unSelectAllText: 'UnSelect All',
         itemsShowLimit: 3,
         allowSearchFilter: true
       };
       this.getdataQueues();
       this.dropdownSettingsQU = {
         singleSelection: false,
         idField: 'id',
         textField: 'name',
         selectAllText: 'Selecionar Todos',
         unSelectAllText: 'Deseleccionar Todos',
         itemsShowLimit: 3,
         allowSearchFilter: true
       };
    }

    close() {

        this.dialogRef.close();

    }

    save() {

        this.dialogRef.close(this.form.value);
//console.log(this.form.value);
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








