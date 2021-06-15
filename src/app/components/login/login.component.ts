import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* import service */
import { AuthService } from '../../services/authentication.service';

/**
 * Common Services
 */
import { MsgHandelService } from '../../shared/services/msg-handel.service';
import { JwtService } from '../../infrastructure/jwt.service';

// import form modules
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // form values
  rForm: FormGroup;
  USER_ROLE = 'Patient';
  constructor(
    private _Router: Router,
    private _JwtService: JwtService,
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _MsgHandelService: MsgHandelService
  ) {
    // form data
    this.rForm = this._FormBuilder.group({
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*$/),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    /**
     * redirect to dashboard if the user is already logged in
     */
    if (this._JwtService.getToken()) {
      this._Router.navigateByUrl('/home');
    }
  }

  public loginUser = () => {
    // create user object
    const userObj = {
      phone: this.rForm.controls['phone'].value,
      password: this.rForm.controls['password'].value,
      role: this.USER_ROLE,
    };

    this._AuthService.loginUser(userObj).subscribe(
      (response) => {
        // store token
        this._JwtService.saveToken(response.token);

        // show msg
        this._MsgHandelService.showSuccessMsg(
          'Welcome to Health X!',
          'Successfully logged in!'
        );

        // load the dashboard
        this._Router.navigateByUrl('/home');
      },
      (error) => {
        // show msg
        this._MsgHandelService.handleError(error);
      }
    );
  };
}
