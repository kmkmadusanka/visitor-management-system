import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2/dist/sweetalert2.js';

/**
 * Add common services
 */
import { MsgHandelService } from '../../services/msg-handel.service';
import { NavBarService } from '../../../services/navBar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  showModal = false;

  constructor(
    public location: Location,
    private router: Router,
    private _NavBarService: NavBarService,
    private _MsgHandelService: MsgHandelService
  ) {}

  ngOnInit() {
    // this.globleSearch('');
  }

  openAdvanceSearch() {
    this.router.navigateByUrl('/home');
    this.showModal = !this.showModal;
    this._NavBarService.setModalValue(this.showModal);
  }

  logOut(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure that you want to Log out?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
    }).then((willDelete) => {
      if (willDelete.value) {
        // window.localStorage.clear();
        localStorage.clear();
        this._MsgHandelService.showSuccessMsg(
          'Signed out!',
          'successfully logout'
        );
        this.router.navigateByUrl('/login');
      }
    });
  }

  public globleSearch(key) {
    this._NavBarService.searchFromKeyWord(key).subscribe(
      (response) => {
        this._NavBarService.setNavSearchResult(response.data);
      },
      (error) => {
        // show msg
        this._MsgHandelService.handleError(error);
      }
    );
  }
}
