import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';

/**
 * import services
 */
import { MainService } from '../infrastructure/api.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private modalStatus: BehaviorSubject<boolean>;
  private navSearchResult: BehaviorSubject<any>;

  constructor(private _MainService: MainService) {
    this.modalStatus = new BehaviorSubject<boolean>(false);
    this.navSearchResult = new BehaviorSubject<any>([]);
  }

  getModalStatus(): Observable<boolean> {
    return this.modalStatus.asObservable();
  }
  getNavSearchResult(): Observable<boolean> {
    return this.navSearchResult.asObservable();
  }
  setModalValue(val): void {
    this.modalStatus.next(val);
  }
  setNavSearchResult(val): void {
    this.navSearchResult.next(val);
  }

  /**
   * Get all Specializations
   */
  searchFromKeyWord(keyword): Observable<any> {
    return this._MainService
      .get(`users/roles?order=asc&role=Doctor&search=${keyword}`)
      .pipe(
        debounceTime(5000),
        map((data) => {
          return data;
        }),
        catchError((res) => {
          throw res;
        })
      );
  }
}
