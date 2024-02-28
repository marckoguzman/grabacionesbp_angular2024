import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {  MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import { tap, catchError, finalize} from 'rxjs/operators';
import {merge, throwError} from 'rxjs';
import {Lesson} from '../model/lesson';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {


    private httpOptions = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
          "Content-Type": "application/json"
        })
      };



        grabaciones = [
        {
          id: 1,
          conversationId: '22222222-73e4-4817-93d0-8ff4074214e3',
          conversationStart: '2024-01-02T16:51:43.159Z',
          path: 'year=2024/month=1/day=2/hour=16/conversation_id=acc32f36-73e4-4817-93d0-8ff4074214e3',
          customerDocumentNumber: '1715592547',
          customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
          queueName: 'ELIMINACION CLAVE DIGITAL KN',
          namefile: 'acc32f36-73e4-4817-93d0-8ff4074214e3_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
          courseId: 11
      },
      {
          id:2,
          conversationId: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
          conversationStart: '2024-01-02T16:57:26.269Z',
          path: 'year=2024/month=1/day=2/hour=16/conversation_id=085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
          customerDocumentNumber: '1715592547',
          customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
          queueName: 'ELIMINACION CLAVE DIGITAL KN',
          namefile: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
          courseId: 11
      },
      {
        id: 3,
        conversationId: '33333333-73e4-4817-93d0-8ff4074214e3',
        conversationStart: '2024-01-02T16:51:43.159Z',
        path: 'year=2024/month=1/day=2/hour=16/conversation_id=acc32f36-73e4-4817-93d0-8ff4074214e3',
        customerDocumentNumber: '1715592547',
        customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
        queueName: 'ELIMINACION CLAVE DIGITAL KN',
        namefile: 'acc32f36-73e4-4817-93d0-8ff4074214e3_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
        courseId: 11
      },
      {
        id:4,
        conversationId: '44444444-32ed-471e-9cd0-9f4b1ed2f305',
        conversationStart: '2024-01-02T16:57:26.269Z',
        path: 'year=2024/month=1/day=2/hour=16/conversation_id=085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
        customerDocumentNumber: '1715592547',
        customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
        queueName: 'ELIMINACION CLAVE DIGITAL KN',
        namefile: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
        courseId: 11
      }
      
      
      ];




    course:Course;

    lessons: Lesson[] = [];

    loading = false;

    private collecctionToAdd = {};

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    selection = new SelectionModel<Lesson>(true, []);


    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService,private http: HttpClient) {

    }

    displayedColumns = ['select', 'seqNo', "description", "duration"];

    expandedLesson: Lesson = null;

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.loadLessonsPage();

    }

    onLessonToggled(lesson:Lesson) {

        this.selection.toggle(lesson);

      //  console.log(this.selection.selected);

    }

    loadLessonsPage() {

        this.loading = true;

        this.coursesService.findLessons(
            this.course.id,
            this.sort?.direction ?? "asc",
            this.paginator?.pageIndex ?? 0,
            this.paginator?.pageSize ?? 3,
            this.sort?.active ?? "seqNo")
            .pipe(
                tap(lessons => this.lessons = lessons),
                catchError(err => {
                    console.log("Error loading lessons", err);
                    alert("Error loading lessons.");
                    return throwError(err);

                }),
                finalize(() => this.loading = false)
            )
            .subscribe();

    }

    onToggleLesson(lesson:Lesson) {
        if (lesson == this.expandedLesson) {
            this.expandedLesson = null;
        }
        else {
            this.expandedLesson = lesson;
        }

    }

    save() {

        this.course;
    }
    close() {

        this.course;
    }

    submit3() {
        const rowsToSubmit = []
        for (const key in this.collecctionToAdd) {
          const element: any = this.collecctionToAdd[key]
          rowsToSubmit.push(element)
        }
        console.log(this.selection.selected);
      }

      submit() {

//https://e7ui02jlxc.execute-api.us-east-1.amazonaws.com/Stage/p1
//https://71ryxc655c.execute-api.us-east-1.amazonaws.com/dev/api/downloadZip
https://aiqykjpmof.execute-api.us-east-1.amazonaws.com

// this.http.post('https://e7ui02jlxc.execute-api.us-east-1.amazonaws.com/Stage/p1', this.selection.selected).subscribe(
        this.http.post('https://e7ui02jlxc.execute-api.us-east-1.amazonaws.com/Stage/p1', this.selection.selected).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error + this.selection.selected );
          }
        );
      }
      

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();


    }

    isAllSelected() {
        return this.selection.selected?.length == this.lessons?.length;
    }

    toggleAll() {
        if (this.isAllSelected()) {
            this.selection.clear();
        }
        else {
            this.selection.select(...this.lessons);
        }
    }

}
















