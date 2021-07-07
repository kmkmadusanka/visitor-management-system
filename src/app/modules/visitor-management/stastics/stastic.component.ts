import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

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
  selector: "app-stastic",
  templateUrl: "./stastic.component.html",
  styleUrls: ["./stastic.component.scss"],
})
export class StatisticsComponent implements OnInit {
  displayedColumns: string[] = ["col1", "col2", "col3"];
  dataSource1: any;
  dataSource2: any;
  dataSource3: any;
  loading: Boolean = false;
  initLoad: Boolean = false;
  hosts: any = [
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "1",
    },
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "2",
    },
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "2",
    },
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "2",
    },
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "2",
    },
    {
      name: "hello 123",
      email: "abc@gmail.com",
      visitors: "10",
      id: "2",
    },
  ];

  building: any = [
    {
      campus: "campus 01",
      building: "building 01",
      visitors: "10",
      id: "1",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
  ];

  campus: any = [
    {
      campus: "campus 01",
      building: "building 01",
      visitors: "10",
      id: "1",
    },
    {
      campus: "campus 02",
      building: "building 02",
      visitors: "14",
      id: "2",
    },
  ];

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
    this.dataSource1 = new MatTableDataSource<TableElement>(this.campus);
    this.dataSource2 = new MatTableDataSource<TableElement>(this.hosts);
    this.dataSource3 = new MatTableDataSource<TableElement>(this.building);

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
}

export interface TableElement {
  id: number;
  name: string;
}
