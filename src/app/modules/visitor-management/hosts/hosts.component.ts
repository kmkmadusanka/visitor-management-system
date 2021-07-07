import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

/**
 * MODULES
 */
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * SERVICES
 */
import { InvitationService } from "../invitation.service";
import { MsgHandelService } from "../../../shared/services/msg-handel.service";

// import Jquery
declare var $: any;

@Component({
  selector: "app-hosts",
  templateUrl: "./hosts.component.html",
  styleUrls: ["./hosts.component.scss"],
})
export class HostComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "email",
    "ext",
    "visitors",
    
  ];
  dataSource: any;
  loading: Boolean = false;
  public resultsLength: any = 0;
  public pageLength: any = 5;
  initLoad: Boolean = false;
  campuses:any= [
  {
    name:"Campus 1",
    value:"Campus 1"
  },
  {
    name:"Campus 2",
    value:"Campus 2"
  },
  {
    name:"Campus 3",
    value:"Campus 3"
  }
  ]
  buildings:any= [
    {
      name:"Building 1",
      value:"Building 1"
    },
    {
      name:"Building 2",
      value:"Building 2"
    },
    {
      name:"Building 3",
      value:"Building 3"
    }
    ]
  data: any = [
    {
      name: "hello 123",
      email: "hello@gmail.com",
      ext: "1234",
      visitors: "500",
      campus: "campus 01",
      building: "building 01",
      id: "1",
    },
    
    {
      name: "hello 123",
      email: "hello@gmail.com",
      ext: "1234",
      visitors: "1000",
      campus: "campus 02",
      building: "building 02",
      id: "2",
    },
  ];
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataObj: any;
  searchObj: any;
  constructor(
    private _InvitationService: InvitationService,
    private _FormBuilder: FormBuilder,
    private _MsgHandelService: MsgHandelService
  ) {}

  ngOnInit() {
    this.initLoad = true;
    this.searchObj = {
      name: "",
    };
    // load initial data
    this.loadData();
  }

  private loadData() {
    
    if (this.initLoad) {
    this.dataSource = new MatTableDataSource<TableElement>(this.data .slice(0, this.pageLength));
    } else {
      this.dataSource = new MatTableDataSource<TableElement>(this.data);
    }
    this.dataObj = this.data;
    this.resultsLength = this.data.length;
    this.dataSource.paginator = this.paginator;
    this.loading = true;
    // this._InvitationService.getAll().subscribe(
    //   (response) => {

    //       if (this.initLoad) {
    //         this.dataSource = new MatTableDataSource<TableElement>(
    //           response['data']['value']
    //             .sort((a, b) =>
    //               a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    //             )
    //             .slice(0, this.pageLength)
    //         );
    //         this.initLoad = false;
    //       } else {
    //         this.dataSource = new MatTableDataSource<TableElement>(
    //           response['data']['value'].sort((a, b) =>
    //             a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    //           )
    //         );
    //       }

    //       this.dataObj = response['data']['value'].sort((a, b) =>
    //         a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    //       );
    //       this.resultsLength = response['data']['value'].length;
    //       this.dataSource.paginator = this.paginator;

    //     this.loading = false;
    //   },
    //   (error) => {
    //     this.loading = false;
    //     this._MsgHandelService.handleError(error);
    //   }
    // );
  }

  public onPaginateChange(event) {
    this.initLoad=false
    this.pageLength = event.pageSize;
    this.loadData();
  }

  public applyFilter(filterValue: string) {
    this.paginator.pageIndex = 0;
    if (this.dataSource !== undefined) {
      this.searchObj["name"] = filterValue.trim().toLowerCase().trim();
      this.loadData();
    }
  }
}

export interface TableElement {
  id: number;
  name: string;
}
