import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';

/**
 * import services
 */
import { MainService } from '../../infrastructure/api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _MainService: MainService) {}

  /**
   * Get all doctors
   */
  getAllDoctors(): Observable<any> {
    return this._MainService.get('users/roles?role=Doctor&limit=20').pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * Get all medical centers
   */
  getAllMedicalCenters(): Observable<any> {
    return this._MainService.get('medicalCenters?limit=20').pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * Get all Specializations
   */
  getAllSpecialization(): Observable<any> {
    return this._MainService.get('specializations?limit=20').pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }

  /**
   * Advance search
   */
  advanceSearch(body): Observable<any> {
    return this._MainService.post('dailySchedules/doctorFilter', body).pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }
}
