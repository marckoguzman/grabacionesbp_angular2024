import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";
//import {FormBuilder, Validators, FormGroup} from "@angular/forms";
//import {Recordings} from "../model/recordings";
//import {MAT_DIALOG_DATA,  MatDialog,  MatDialogConfig,  MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   
  //  description:string;
    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


/*
    form = this.fb.group({
        conversationId: [this.recordings.conversationId, Validators.required],
        ani: [this.recordings.ani,  Validators.required],
        dnis: [this.recordings.dnis, Validators.required],
        cola: [this.recordings.cola, Validators.required],
        usuario: [this.recordings.usuario, Validators.required],
        identificacion: [this.recordings.identificacion, Validators.required],
        fecha: [this.recordings.fecha, Validators.required]
     });
*/
  //  constructor(private coursesService: CoursesService,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)private recordings:Recordings) {
        constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {

        const COURSES1: any = [

            {
              id: 11,
              description: 'Grabaciones Históricas Genesys Cloud',
              
              //iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-material-course-1.jpg',
              iconUrl: 'https://img.freepik.com/free-photo/digital-cloud-data-storage-digital-concept-cloudscape-digital-online-service-global-network-database-backup-computer-infrastructure-technology-solution_90220-1046.jpg?w=900&t=st=1705611630~exp=1705612230~hmac=abfad58f0c2e8841d426609646d7ca192a61a0d43fbee068f44ea623678bfa48',
              courseListIcon: "string",
              longDescription: '',
              lessonsCount: 11,
            }
        ];
       // this.description = "Id de conversacion";
        const courses$ = this.coursesService.findAllCourses();

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );
      //  console.log("Respuesta servicio");
       // console.log(courses);
        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );
       
    }
    close() {

        this.close();

    }

    save() {

        //this.close(this.form.value);

    }

}
