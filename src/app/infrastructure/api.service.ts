import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * import services
 * */
import { JwtService } from './jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

@Injectable({
  providedIn: 'root',
})
export class MainService extends OnDestroyMixin implements OnDestroy {
  constructor(private http: HttpClient, private jwtService: JwtService) {
    super();
  }

  // Setting Headers for API Request
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private setFormDataHeader(): HttpHeaders {
    const headersConfig = {};
    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  // Perform a GET Request
  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Perform a PUT Request
  put(path: string, body): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Perform POST Request
  post(path, body): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Perform a PUT Request
  putFormData(path: string, body): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, body, {
        headers: this.setFormDataHeader(),
      })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  postFormData(path, body): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, {
        headers: this.setFormDataHeader(),
      })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  // Perform Delete Request
  delete(path): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(untilComponentDestroyed(this))
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  ngOnDestroy(): void {}
}
