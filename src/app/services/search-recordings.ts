
import {Request, Response} from 'express';
import {setTimeout} from "timers";
import {Recordings} from '../model/recordings';
import {DisplayGrabs, Grabs} from '../model/grab';
import {CoursesService} from "../services/courses.service";

export function searchRecordings(req: Request, res: Response, recc1: Recordings) {

/*
    grabs : Grabs[];

    const queryParams = req.query as any;

    const courseId = queryParams.courseId,
          filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize),
          sortColumn = queryParams.sortColumn ?? "courseId";

           getUserss(recc1){
            this.loading = true;
            this.rs.getUsers(recc,
               
                ) 
                .subscribe(
                (response)=>{
               this.grabs= response;
               console.log(response);
                },
                (error)=> console.log(error)   
            )
    
        }

          
    let grab = Object.values(this.grabs)
        .filter(grab => grab.courseId == courseId)
        .sort((l1, l2) => {
            if (l1[sortColumn] > l2[sortColumn]) {
                return 1;
            }
            else if (l1[sortColumn] < l2[sortColumn]) {
                return -1;
            }
            else {
                return 0;
            }
        });

    if (filter) {
       lessons = lessons.filter(lesson => lesson.namefile.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder == "desc") {
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: lessonsPage});
    },1000);



    getUserss(recc2: Recordings){
        this.loading = true;
        this.rs.getUsers(recc2,
           
            ) 
            .subscribe(
            (response)=>{
           this.grabs= response;
           console.log(response);
            },
            (error)=> console.log(error)   
        )

    }
*/
}

