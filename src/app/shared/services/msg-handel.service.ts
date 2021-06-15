import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';

/**
 * services import
 */
import { JwtService } from '../../infrastructure/jwt.service';
import { ToastrService } from 'ngx-toastr';

/**
 * common services
 */
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable()
export class MsgHandelService implements ErrorHandler {
  // declare error msg
  private REFRESH_MESSAGE = 'Something went wrong. Please Login again!';
  private DEFAULT_ERROR_TITLE = 'Something went wrong';

  constructor(
    private _Router: Router,
    private _JwtService: JwtService,
    private toastr: ToastrService
  ) {}

  /**
   * show success msg as notifications
   * @param title : string
   * @param content : string
   */
  public showSuccessMsg(title: string, content: string) {
    this.toastr.success(content, title);
  }

  /**
   * show Error msg as notifications
   * @param title : string
   * @param content : string
   */
  public showErrorMsg(title: string, content: string) {
    this.toastr.error(content, title);
  }

  /**
   * handle common errors
   * @param error : error with the response
   */
  public handleError(error: any) {
    const httpErrorCode = error.status;
    switch (httpErrorCode) {
      case 403:
        this.showError('Forbidden');
        this._Router.navigateByUrl('');
        break;
      case 401:
        this.showError('Unauthorized');
        this._Router.navigateByUrl('');
        break;
      case 400:
        this.showError('Bad Request');
        break;
      default: {
        if (error.error.msg !== undefined || error.error.msg !== null) {
          // call for customized error handle
          this.handleCustomErrors(error.error);
        } else {
          this.showError(this.DEFAULT_ERROR_TITLE);
        }
      }
    }
  }

  /**
   * show custom errors according to
   * @param errorMsg : custom error appended with response body
   */
  private handleCustomErrors(errorMsg) {
    if (errorMsg.msg === 'Forbidden') {
      // show msg
      Swal.fire({
        imageUrl: 'assets/gif/worry.gif',
        text: this.REFRESH_MESSAGE,
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false,
      }).then((val) => {
        if (val.value) {
          // clear local storage
          this._JwtService.destroyToken();
          // redirect to login
          this._Router.navigateByUrl('');
          // reload page
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
    } else {
      this.showError(errorMsg.msg);
    }
  }

  /**
   * show error msg in common way
   * @param message : error msg
   */
  private showError(message: string) {
    if (message !== undefined && message.length < 80) {
      this.toastr.error(message, '');
    } else {
      this.toastr.error('Network issue. Please refresh and try again', '');
    }
  }
}
