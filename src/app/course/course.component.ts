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

    submit() {
        const rowsToSubmit = []
        for (const key in this.collecctionToAdd) {
          const element: any = this.collecctionToAdd[key]
          rowsToSubmit.push(element)
        }
        console.log(this.selection.selected);
      }

      submit3() {

//https://e7ui02jlxc.execute-api.us-east-1.amazonaws.com/Stage/p1
//https://71ryxc655c.execute-api.us-east-1.amazonaws.com/dev/api/downloadZip
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
















