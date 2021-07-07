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
export class InvitationService {
  constructor(private _MainService: MainService) {}

  /**
   * Get all invitation
   */
  getAll(): Observable<any> {
    return this._MainService.get('invitation').pipe(
      map((data) => {
        return data;
      }),
      catchError((res) => {
        throw res;
      })
    );
  }
}
