import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8;' })
};

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.BASE_USER_ENDPOINT;

    get(url, params): Observable<any> {
        return this.http.get(this.apiUrl + url, { params: params, headers: httpOptions.headers })
        .pipe(
          catchError(this.handleError)
        );
      }
    
      post(url, body) {
        return this.http.post(this.apiUrl + url, body, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }
    
      put(url, body) {
        return this.http.put(this.apiUrl + url, body, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }
    
      delete(url) {
        return this.http.delete(this.apiUrl + url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
    
    
      private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };
    }