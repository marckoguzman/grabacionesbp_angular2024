import {Component, Input, OnInit, ViewEncapsulation,ViewChild,AfterViewInit,SimpleChanges,OnChanges} from '@angular/core';
import {Course} from '../model/course';
import {Recordings} from '../model/recordings';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {openEditCourseDialog} from '../course-dialog/course-dialog.component';
import {filter} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CoursesService} from "../services/courses.service";

import {searchRecordings} from "../services/search-recordings";

import {Users} from '../model/users';
import {DisplayGrabs, Grabs} from '../model/grab';



import {ActivatedRoute} from "@angular/router";
import {  MatPaginator,PageEvent  } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table'


import { tap, catchError, finalize} from 'rxjs/operators';
import {merge, throwError} from 'rxjs';
import {Lesson} from '../model/lesson';
//import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";


import { DataSource,SelectionChange,SelectionModel} from "@angular/cdk/collections";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Detgrabs } from '../model/detgrab';

import { FormControl } from '@angular/forms';


//import { MultiSelectDropdownComponent } from '../multiselect-drop-down/multi-select-dropdown.component'; 
import { NgMultiSelectDropDownModule,IDropdownSettings } from 'ng-multiselect-dropdown';
const CLIPBOARD_SHOWS_ALL = true;
const SELECT_ALL_FIRST = false;
const SELECT_ACCROSS_PAGES = true;
const MULTISELECT = true;
const MASTER_TOGGLES_PAGE_ONLY = true;




export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
  }
  



  
  /** Constants used to fill up our data base. */
  const COLORS: string[] = [
    "maroon",
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "purple",
    "fuchsia",
    "lime",
    "teal",
    "aqua",
    "blue",
    "navy",
    "black",
    "gray"
  ];
  const NAMES: string[] = [
    "Maia",
    "Asher",
    "Olivia",
    "Atticus",
    "Amelia",
    "Jack",
    "Charlotte",
    "Theodore",
    "Isla",
    "Oliver",
    "Isabella",
    "Jasper",
    "Cora",
    "Levi",
    "Violet",
    "Arthur",
    "Mia",
    "Thomas",
    "Elizabeth"
  ];

  const  countries =[
    {
       "id" : 1,
       "name":"USA"
    },
    {
       "id" : 2,
       "name":"Australia"
    },
    {
       "id" : 3,
       "name":"Germany"
    },
    {
       "id" : 4,
       "name":"England"
    }
   ];
   const selectedCB1 = [{id:1,name:'USA'}]; 

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
   
})
export class CoursesCardListComponent implements OnInit,AfterViewInit {


  dropdownList = [];
  selectedItems = [];
  dropdownSettings={};

    @Input()
    courses: Course[];
    recordings: Recordings[];
    recordings1: Recordings[];
    //pageEvent: PageEvent;
    cols = 1;

    curPage: number;
    pageSize: number;

    rowHeight = '500px';

    handsetPortrait = false;

    columns1=["User ID","ID","Desc","BOddy"]
    index1=["userId","id","tittle","body"];

    columns=["id","conversationId","conversationStart","path","customerDocumentNumber","customerFullName","queueName","namefile"];
    index=["id","conversationId","conversationStart","path","customerDocumentNumber","customerFullName","queueName","namefile"];
    //grabs : Detgrabs[];
    grabs: Detgrabs[] = [];
    /*const grabs1: Detgrabs = {
        converdstionId: '',
        country: '',
      };*/

    displayedColumns1 = ['id', 'conversationId', 'namefile', 'path'];
    //displayedColumns: string[] = ['id', 'conversationId', 'namefile', 'path'];
    dataSource: MatTableDataSource<Detgrabs>;


    tableDataSource: MatTableDataSource<Detgrabs>;
    selectionDataSource: MatTableDataSource<Detgrabs>;


    gridCheckbox: boolean = true;
    gridMultiselect: boolean = true;
    gridPersistSelection: boolean = true;
    gridMasterSelectAllFirst: boolean = false;
    gridShowDuplicatesInClipboard: boolean = false;
    gridShowClipboard: boolean = false;
    gridMasterTogglesPageOnly: boolean = false; //requires all data to be in tableDatasource
    gridRowClickChangesSelection: boolean = false;
    gridHighlightLastClickedOnly: boolean = false;
    gridClickedLastNullable: boolean = false;


    //form: FormGroup;


    loading = false;

    private collecctionToAdd = {};

    
//**************************************************** */
list : any[];
toppings = new FormControl();

 toppingList = [
  {
    id: 1,
    title: 'Title1'
  },
  {
    id: 2,
    title: 'Title2'
  },
  {
    id: 3,
    title: 'Title3'
  }
];

show() {
  console.log(this.toppings);
}

selectSome() {
  // this.toppings. = ['Extra cheese', 'Mushroom'];
  this.toppings.setValue([1,3]);

  // setTimeout(() => {
  //   this.toppingList = [
  //     {
  //       id: 1,
  //       title: 'Title1'
  //     },
  //     {
  //       id: 2,
  //       title: 'Title1'
  //     },
  //     {
  //       id: 3,
  //       title: 'Title1'
  //     }
  //   ];
  // }, 2000);

}

//******************************************************* */



    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


    @ViewChild(MatSort)
    sort: MatSort;

    selection1 = new SelectionModel<Detgrabs>(true, []);

    selection = new SelectionModel<Detgrabs>(this.gridMultiselect, []);
    clickedLast: Detgrabs | null = null;
  


    constructor(private dialog: MatDialog,
                private responsive: BreakpointObserver, private rs: CoursesService,private http: HttpClient) {
    

                  this.list = 
                  [
                    {name :'India',checked : false},
                    {name :'US',checked : false},
                    {name :'China',checked : false},
                    {name :'France',checked : false}
                  ]

                   // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
                    //this.tableDataSource = new MatTableDataSource(users);
                   const grabs11: Detgrabs[] = [];

                    this.tableDataSource = new MatTableDataSource(grabs11);
                    this.selectionDataSource = new MatTableDataSource(this.selection.selected);
         
                    this.tableDataSource
                      .connect()
                      .pipe(
                        tap(p => {
                          const selection = this.selection.selected;
                
                          (this.selection as any)._emitChanges = false;
                
                          this.selection.deselect(
                            ...this.selection.selected.filter(
                              s => !!this.tableDataSource.data.find(d => this.rowCompare(s, d))
                            )
                          );
                          this.selection.select(
                            ...this.tableDataSource.data.filter(d =>
                              selection.find(s => this.rowCompare(s, d))
                            )
                          );
                          (this.selection as any)._emitChanges = true;
                        })
                      )
                      .subscribe();
                
                    this.selection.changed
                      .pipe(tap(this.updateSelectionClientData))
                      .subscribe(c => {
                        if (this.gridShowDuplicatesInClipboard)
                          this.selectionDataSource.data = c.source.selected;
                        else
                          this.selectionDataSource.data = this.selectedDataNotInPage(
                            c.source.selected
                          );
                      });  



    }//end constructor

    shareCheckedList(item:any[]){
      console.log(item);
    }
    shareIndividualCheckedList(item:{}){
      console.log(item);
    }


    numberOfPages() {
        return Math.ceil(this.grabs.length / this.pageSize);
      }
/*

      ngOnChanges(changes: SimpleChanges) {
       // if (changes['grabs']) {
            //this.tableDataSource = new MatTableDataSource(users);
           // this.displayedColumns = this.columnHeader.map(c => c.columnDef);
             this.tableDataSource.sort = this.sort;
          this.tableDataSource.paginator = this.paginator
        //  }
        this.paginator._changePageSize(this.paginator.pageSize);
        //this.dataSource.paginator = this.paginator;
       // this.dataSource.sort = this.sort;
      }
*/

getData(): void {
  let tmp = [];
  this.http.get<any>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
    for(let i=0; i < data.length; i++) {
      tmp.push({ item_id: i, item_text: data[i].name });
    }
    this.dropdownList = tmp;
  });
}

    ngOnInit() {

      this.getData();
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
        
      
        //this.getUserss();

       // this.openDialog();
        //this.editCourse(this.recordings);
        //this.editCourse(this.recordings11); 
        
/*
        this.responsive.observe([
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape
        ])
            .subscribe(result => {

                this.cols = 3;
                this.rowHeight = "500px";
                this.handsetPortrait = false;

                const breakpoints = result.breakpoints;

                if (breakpoints[Breakpoints.TabletPortrait]) {
                    this.cols = 1;
                }
                else if (breakpoints[Breakpoints.HandsetPortrait]) {
                    this.cols = 1;
                    this.rowHeight = "430px";
                    this.handsetPortrait = true;
                }
                else if (breakpoints[Breakpoints.HandsetLandscape]) {
                    this.cols = 1;
                }
                else if (breakpoints[Breakpoints.TabletLandscape]) {
                    this.cols = 2;
                }

            });
            */
            this.curPage = 1;
            this.pageSize = 3; // any page size you want

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

    editCourse1(course: Course) {

       /* openEditCourseDialog(this.dialog, course)
            .pipe(
                filter(val => !!val)
            )
            .subscribe(
                val => console.log('new course value:', val)
            );

*/
    }


    refresh() {
            console.log("Testing");
    }
    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(CoursesCardListComponent, dialogConfig);
    }

    getUserss(recc: Recordings){
        this.loading = true;
        this.rs.getUsers(recc,
           
            ) 
            .subscribe(
            (response)=>{
           this.grabs= response;
           console.log("response getUserss");
           console.log(response);
           this.dataSource = new MatTableDataSource(this.grabs);


          // console.log( this.grabs[0].message.conversationId);
           //**************************************************************************** */

           //const users = Array.from({ length: 20 }, (_, k) => createNewUser(k + 1));
            //this.tableDataSource = new MatTableDataSource(users);


           // this.tableDataSource.data = new MatTableDataSource(users);

            this.tableDataSource = new MatTableDataSource(this.grabs);
            this.selectionDataSource = new MatTableDataSource(this.selection.selected);
 
            this.tableDataSource
              .connect()
              .pipe(
                tap(p => {
                  const selection = this.selection.selected;
        
                  (this.selection as any)._emitChanges = false;
        
                  this.selection.deselect(
                    ...this.selection.selected.filter(
                      s => !!this.tableDataSource.data.find(d => this.rowCompare(s, d))
                    )
                  );
                  this.selection.select(
                    ...this.tableDataSource.data.filter(d =>
                      selection.find(s => this.rowCompare(s, d))
                    )
                  );
                  (this.selection as any)._emitChanges = true;
                })
              )
              .subscribe();
        
            this.selection.changed
              .pipe(tap(this.updateSelectionClientData))
              .subscribe(c => {
                if (this.gridShowDuplicatesInClipboard)
                  this.selectionDataSource.data = c.source.selected;
                else
                  this.selectionDataSource.data = this.selectedDataNotInPage(
                    c.source.selected
                  );
              });  

              //  this.selectionDataSource.paginator = this.paginator;
            //    this.selectionDataSource.sort = this.sort;
            // this.paginator._changePageSize(this.paginator.pageSize);
           // this.tableDataSource = new MatTableDataSource(users);
            // this.displayedColumns = this.columnHeader.map(c => c.columnDef);
              this.tableDataSource.sort = this.sort;
           this.tableDataSource.paginator = this.paginator
         //  }
         //this.paginator._changePageSize(this.paginator.pageSize);

/*
           this.tableDataSource = new MatTableDataSource(this.grabs);
           this.selectionDataSource = new MatTableDataSource(this.selection.selected);

           this.tableDataSource
             .connect()
             .pipe(
               tap(p => {
                 const selection = this.selection.selected;
       
                 (this.selection as any)._emitChanges = false;
       
                 this.selection.deselect(
                   ...this.selection.selected.filter(
                     s => !!this.tableDataSource.data.find(d => this.rowCompare(s, d))
                   )
                 );
                 this.selection.select(
                   ...this.tableDataSource.data.filter(d =>
                     selection.find(s => this.rowCompare(s, d))
                   )
                 );
                 (this.selection as any)._emitChanges = true;
               })
             )
             .subscribe();
       
           this.selection.changed
             .pipe(tap(this.updateSelectionClientData))
             .subscribe(c => {
               if (this.gridShowDuplicatesInClipboard)
                 this.selectionDataSource.data = c.source.selected;
               else
                 this.selectionDataSource.data = this.selectedDataNotInPage(
                   c.source.selected
                 );
             });   


*/
           //****************************************************************************** */




            },
            (error)=> console.log(error)   
        )
        

    }

    clientdataClick(){
        
        //console.log(value);
         var ress= JSON.stringify(
            {
              selected: this.gridMultiselect
                ? this.selection.selected
                : this.selection.selected[0],
              clickedLast: this.clickedLast
            },
            (key, value) => {
              if (key === "selected") {
               
                return value;
      
              }
              return value;
            },
            2
          );
          console.log("Seleccionado");
          console.log(ress);
    }

    editCourse(recordings: Recordings) {

     
        openEditCourseDialog(this.dialog, recordings)
            .pipe(
                filter(val => !!val)
            )

            .subscribe(
                (res)=>{
                  // Receive data from dialog component
                  // res contains data sent from the dialog
                  console.log("Respuesta:" );
                 // console.log(res.ani);
                  this.getUserss(res);

                }
            );
            
           /* .subscribe(
                val => console.log('nuevo valor de grabacion:', val)
            );*/


    }

    save() {
       // this.dialogRef.close(this.form.value);
    }

    close() {
        //this.dialogRef.close();
    }

  ngAfterViewInit1() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected1() {
    return this.selection1.selected?.length == this.grabs?.length;
}

onLessonToggled() {
    return this.selection1.selected?.length == this.grabs?.length;
}

toggleAll() {
    if (this.isAllSelected1()) {
        this.selection1.clear();
    }
    else {
        //this.selection1.select(...this.grabs);
    }
}

//************************************************************************************************ */

_onMultiselectChange = (val: MatCheckboxChange) => {
    //only for stackblitz
    (this.selection as any)._multiple = val.checked;
  };

  get clientData() {
    return JSON.stringify(
      {
        selected: this.gridMultiselect
          ? this.selection.selected
          : this.selection.selected[0],
        clickedLast: this.clickedLast
      },
      (key, value) => {
        if (key === "selected") {
          return value;

        }
        return value;
      },
      2
    );
  }

  
  rowCompare(row1: Detgrabs, row2: Detgrabs) {
    const state = row1.message;
    const id1 = (state as any)?.id;
    const state2 = row2.message;
    const id2 = (state2 as any)?.id;

    return id1 === id2;
  }

  isHighlighted(row: Detgrabs) {
    if (this.gridHighlightLastClickedOnly) return row === this.clickedLast;
    return this.selection.isSelected(row);
  }

/*
  rowCompare(row1: UserData, row2: UserData) {
return row1.id === row2.id;
  }

  isHighlighted(row: UserData) {
    if (this.gridHighlightLastClickedOnly) return row === this.clickedLast;
    return this.selection.isSelected(row);
  }
*/
  updateSelectionClientData(selectionChange: SelectionChange<any>) {
    selectionChange.source.selected;
  }

  selectedDataNotInPage(selected = this.selection.selected) {
    const currentPageData = this.tableDataSource.connect().getValue();
    return selected.filter(
      s => !currentPageData.find(c => this.rowCompare(c, s))
    );
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;


  }

  page(e: PageEvent) {
    if (!this.gridPersistSelection) {
      this.selection.clear();
      return;
    }
    if (!this.gridShowDuplicatesInClipboard) {
      this.tableDataSource.data = [
        ...this.tableDataSource.data.map(d => ({ ...d }))
      ];
      // const selection = this.selection.selected;

      // (this.selection as any)._emitChanges = false;

      // this.selection.deselect(
      //   ...this.selection.selected.filter(
      //     s => !!this.tableDataSource.data.find(d => this.rowCompare(s,d))
      //   )
      // );
      // this.selection.select(
      //   ...this.tableDataSource.data.filter(d =>
      //     selection.find(s => this.rowCompare(s,d))
      //   )
      // );
      // (this.selection as any)._emitChanges = true;

      const currentPageData = this.tableDataSource._pageData(
        this.tableDataSource.data
      ); //.connect().getValue();
      const selectedNotInPage = this.selection.selected.filter(
        s => !currentPageData.find(c => this.rowCompare(c, s)) //TODO: Use primary key
      );
      this.selectionDataSource.data = selectedNotInPage;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource.filterPredicate = (d, f) =>
    //   JSON.stringify(d)
    //     .trim()
    //     .toLocaleLowerCase()
    //     .includes(f) || this.selection.isSelected(d);

    // this.dataSource.sortingDataAccessor = (d, h) => {
    //   if (h == "select") return this.selection.isSelected(d) ? "a" : "b";
    //   return d[h as keyof Detgrabs];
    // };

    this.tableDataSource.sortData;

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  checkAll() {
    if (this.gridPersistSelection)
      this.tableDataSource.data.forEach(row => this.selection.select(row));
   // else this.checkPage();
  }

  checkPage(invert = false) {
    this.tableDataSource
      .connect()
      .getValue()
      .forEach(row =>
        invert ? this.selection.deselect(row) : this.selection.select(row)
      );
  }

  clearPage = () => this.checkPage(true);

  clearAll = () => this.selection.clear();

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(e: MatCheckboxChange) {
    if (this.gridMasterTogglesPageOnly) {
      if (this.gridMasterSelectAllFirst)
        this.isPageChecked ? this.clearPage() : this.checkPage();
      else this.isPageCleared ? this.checkPage() : this.clearPage();
    } else {
      if (this.gridMasterSelectAllFirst)
        this.isAllSelected ? this.selection.clear() : this.checkAll();
      else this.isNoneSelected ? this.checkAll() : this.selection.clear();
    }
  }

  get displayedColumns() {
    let checkbox = this.gridCheckbox ? ["select"] : [];
    return [...checkbox, "id", "conversationId", "namefile", "path"];
  }

  get showVisibilityButton() {
    if (this.gridShowDuplicatesInClipboard) return this.selection.hasValue();
    else return this.selectedDataNotInPage().length > 0;
  }

  get isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  get isNoneSelected() {
    return this.selection.selected.length === 0;
  }

  get masterIsChecked() {
    if (this.gridMasterSelectAllFirst)
      return this.selection.hasValue() && this.isAllSelected;
    return this.selection.hasValue() && !this.isNoneSelected;
  }

  get masterIsIndeterminate() {
    return this.selection.hasValue() && !this.isAllSelected;
  }

  get numberOfSelectedItems() {
    return this.selection.selected.length;
  }

  get isPageChecked() {
    return this.tableDataSource
      .connect()
      .getValue()
      .reduce(
        (isPageSelected, row) =>
          isPageSelected && this.selection.isSelected(row),
        true
      );
  }

  get isPageCleared() {
    return this.tableDataSource
      .connect()
      .getValue()
      .reduce(
        (isPageCleared, row) =>
          isPageCleared && !this.selection.isSelected(row),
        true
      );
  }

  rowClick(row: Detgrabs, event: MouseEvent) {
    if (["button", "a", "mat-icon"].includes((event as any)?.tagName.toLocaleLowerCase())) {
      return;
    }
    if (this.gridRowClickChangesSelection) {
      this.selection.toggle(row);
    }

    if (
      this.gridClickedLastNullable &&
      this.clickedLast &&
      this.rowCompare(row, this.clickedLast)
    ) {
      this.clickedLast = null;
    } else this.clickedLast = row;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Detgrabs): string {
    const state = row?.message;
    const id1 = (state as any)?.id;
    if (!row) {
      return `${this.isAllSelected ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${id1 + 1}`;
    
   // console.log("checkboxLabel");
    //console.log(this.selectionDataSource.data);
   //return "1"
  }

  get selected() {
    const state = this.selection.selected;
    const id1 = (state as any)?.id;

    console.log("getSelected");
    console.log( this.selection.selected);
    //const state = row1.message;
   // const id1 = (state as any)?.id; 
   return JSON.stringify(this.selection.selected.map(u => id1));
  }

  
}




//************************************************************************************************ */

function createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      " " +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      ".";

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color:  COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }









