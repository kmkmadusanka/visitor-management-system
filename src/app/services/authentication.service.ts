import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * import services
 */
import { MainService } from '../infrastructure/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _MainService: MainService) {}

  /**
   * calling to login endpoint
   * @param user : userObject<email,password>
   */
  loginUser(user: any): Observable<any> {
    return this._MainService.post('users/patientLogin', user).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * Register User
   * @param user : userObject
   */
  registerUser(user): Observable<any> {
    return this._MainService.post('users/patient', user).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }
}
