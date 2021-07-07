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
  selector: "app-daily-activity",
  templateUrl: "./daily-activity.component.html",
  styleUrls: ["./daily-activity.component.scss"],
})
export class DailyActivityComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "company",
    "host",
    "checkIn",
    "buildingName",
    "action",
  ];
  dataSource: any;
  dataSource2: any;
  loading: Boolean = false;
  public resultsLength: any = 0;
  public resultsLength2: any = 0;
  public pageLength: any = 5;
  public pageLength2: any = 5;
  initLoad: Boolean = false;
  data: any = [
    {
      name: "hello 123",
      company: "comapny 01",
      host: "hoster 01",
      checkIn: "10.30 AM",
      buildingName: "building 01",
      id: "1",
    },
  ];

  data2: any = [
    {
      name: "hello 123",
      company: "comapny 01",
      host: "hoster 01",
      checkOut: "10.30 AM",
      buildingName: "building 01",
      id: "1",
    },
    {
      name: "hello 123",
      company: "comapny 01",
      host: "hoster 01",
      checkOut: "10.30 AM",
      buildingName: "building 01",
      id: "1",
    },
    {
      name: "hello 123",
      company: "comapny 01",
      host: "hoster 01",
      checkOut: "10.30 AM",
      buildingName: "building 01",
      id: "1",
    },
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  dataObj: any;
  dataObj2: any;
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
      this.dataSource = new MatTableDataSource<TableElement>(
        this.data.slice(0, this.pageLength)
      );
      this.dataSource2 = new MatTableDataSource<TableElement>(
        this.data2.slice(0, this.pageLength)
      );
    } else {
      this.dataSource = new MatTableDataSource<TableElement>(this.data);
      this.dataSource2 = new MatTableDataSource<TableElement>(this.data2);
    }
    // data 01
    this.dataObj = this.data;
    this.resultsLength = this.data.length;
    this.dataSource.paginator = this.paginator;

    // data 02
    this.dataObj2 = this.data2;
    this.resultsLength2 = this.data2.length;
    this.dataSource2.paginator = this.paginator2;

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
    this.initLoad = false;
    this.pageLength = event.pageSize;
    this.loadData();
  }
  public onPaginateChange2(event) {
    this.initLoad = false;
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
