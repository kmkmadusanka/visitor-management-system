import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import form modules
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import common libraries
import { confPassValidation } from '../../shared/validations/validator';

/* import service */
import { AuthService } from '../../services/authentication.service';

/**
 * Common Services
 */
import { MsgHandelService } from '../../shared/services/msg-handel.service';
import { JwtService } from '../../infrastructure/jwt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([])],
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\./0-9]*$/),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      confirmPassword: [null, [Validators.required, confPassValidation]],
      agreement: [true, Validators.compose([Validators.required])],
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

  public registerUser = () => {
    // create user object
    const userObj = {
      first_name: this.rForm.controls['firstName'].value,
      last_name: this.rForm.controls['lastName'].value,
      phone: this.rForm.controls['phone'].value,
      password: this.rForm.controls['password'].value,
      role: this.USER_ROLE,
    };

    this._AuthService.registerUser(userObj).subscribe(
      (data) => {
        // reload the data
        this._Router.navigate(['/login']);
        // show msg
        this._MsgHandelService.showSuccessMsg(
          'successful!',
          'You have successfully registered with the Sterling Aftercare!'
        );
      },
      (error) => {
        // show msg
        this._MsgHandelService.handleError(error);
      }
    );
  };
}
