

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable,of} from "rxjs";
import {Course} from "../model/course";
import {map,delay} from "rxjs/operators";
import {Lesson} from "../model/lesson";
import {Recordings} from "../model/recordings";
import {DisplayGrabs, Grabs} from "../model/grab";
import {Users} from "../model/users";
import { HttpHeaders} from '@angular/common/http';

import {Detgrabs} from "../model/detgrab";


@Injectable()
export class CoursesService {

    constructor(private http:HttpClient) {

    }

    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {


        let items = this.getInitData();
      //  if (term) {
          //  items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
       // }
       return of(items).pipe(delay(500));
          

        // return COURSES;
       // console.log("Valores API"+ JSON.stringify(COURSES) )
        //    return COURSES ; 
        return this.http.get('/api/courses')
            .pipe(
                map(res => res['payload'])
            );
            
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findLessons(
        courseId:number, sortOrder = 'asc',
        pageNumber = 0, pageSize = 3, sortColumn = 'seqNo'):  Observable<Lesson[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('sortColumn', sortColumn)
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findRecords(
        id:number, sortOrder = 'asc',
        pageNumber = 0, pageSize = 3, sortColumn = 'title'):  Observable<Recordings[]> {

        return this.http.get('https://jsonplaceholder.typicode.com/posts', {
        }).pipe(
            map(res =>  res["payload"])
            
        );
        
    }

     getInitData() {
        return [
            {
                id: 11,
                description: 'Grabaciones Históricas Banco Pichincha',
                category: 'BEGINNER',
                //iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-material-course-1.jpg',
                iconUrl: 'https://img.freepik.com/free-photo/digital-cloud-data-storage-digital-concept-cloudscape-digital-online-service-global-network-database-backup-computer-infrastructure-technology-solution_90220-1046.jpg?w=900&t=st=1705611630~exp=1705612230~hmac=abfad58f0c2e8841d426609646d7ca192a61a0d43fbee068f44ea623678bfa48',
                courseListIcon: "string",
                longDescription: '',
                lessonsCount: 11,
            }]
        }


        getUsers(record:Recordings): Observable<Detgrabs[]> {
       // getUsers(
       //baseURL:string = "https://71ryxc655c.execute-api.us-east-1.amazonaws.com/dev/api/downloadRecords";
        /*
        id:number, sortOrder = 'asc',
        pageNumber = 0, pageSize = 3, sortColumn = 'title'):  Observable<Users[]> {

        return this.http.get('https://jsonplaceholder.typicode.com/posts', {
        }).pipe(
            map(res =>  res["payload"])
            
        );
*/
       // return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/posts");
       // return this.http.get<Users[]>("https://jsonplaceholder.typicode.com/posts");

/*
        
        return this.http.get('https://71ryxc655c.execute-api.us-east-1.amazonaws.com/dev/api/downloadRecords', {
            params: new HttpParams()
                .set('StartDate',"2024-01-05T00:00:01.000Z")
                .set('EndDate', "2024-01-05T00:00:01.000Z")
                .set('QueuesId', "")
                .set('Ani', "")
                .set('Dnis', "")
                .set('UserId', "")
                .set('Identificacion', "")

                .set('StartDate', record.fecha.toString())
                .set('EndDate', record.fecha.toString())
                .set('QueuesId', record.cola.toString())
                .set('Ani', record.ani.toString())
                .set('Dnis', record.dnis.toString())
                .set('UserId', record.usuario.toString())
                .set('Identificacion', record.identificacion.toString())
        }).pipe(
            map(res =>  res["payload"])
        );

*/
var person = 
{
    "StartDate": "2024-01-05T00:00:01.000Z",
    "EndDate": "2024-01-05T00:00:01.000Z",
    "QueuesId":"",
    "Ani":"",
    "Dnis":"",
    "UserId":"",
    "Identificacion":"",

};

const headers = new HttpHeaders()
.append('Content-Type', 'application/json')
/*.append('Access-Control-Allow-Headers', 'Content-Type')
.append('Access-Control-Allow-Methods', 'GET,POST')
.append('Access-Control-Allow-Origin', '*');*/
//return this.http.get(baseUrl + 'accounts',  {headers});

     //const headers = { 'content-type': 'application/json'}  
     const body=JSON.stringify(person);
        console.log(body)
        return this.http.post<Detgrabs[]>("https://e7ui02jlxc.execute-api.us-east-1.amazonaws.com/Stage/p1", body,{'headers':headers})         
         .pipe(map((res) => res["message"]));
  // .pipe(map(({message}}) => message.items));
        //return this.http.post("https://71ryxc655c.execute-api.us-east-1.amazonaws.com/dev/api/downloadRecords" + 'people', body,{'headers':headers})
    }
   



/*
private extractData(res: Response) {
  let body = res.json();
  console.log("extraData: ");
  if (body && body.test) {
    body=body.test;
  }
  return body || []; // devolvemos un array vacio si la respuesta no tiene un array
}
*/ 

/*
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response;
    });
*/

/*
private url = 'http://jsonplaceholder.typicode.com/posts';

constructor(private httpClient: HttpClient) { }

getPosts() {
  return this.httpClient.get(this.url);
}
*/

}
