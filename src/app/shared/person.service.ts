import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  // Base url
  baseurl = 'https://icasa-lb-tf-1326873094.af-south-1.elb.amazonaws.com:3000/api/dcockercomposetests';

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // POST
  CreatePerson(data): Observable<Person> {
    return this.http
      .post<Person>(
        this.baseurl + '/bugtracking/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // GET
  GetPerson(id): Observable<Person> {
    return this.http
      .get<Person>(this.baseurl + '/bugtracking/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // // GET
  // GetPeople(): Observable<Person> {
  //   return this.http
  //     .get<Person>(this.baseurl + '/bugtracking/')
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  

  // GET
  GetPeople(): Observable<Person> {
    return this.http
      .get<Person>(this.baseurl )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // PUT
  UpdatePerson(id, data): Observable<Person> {
    return this.http
      .put<Person>(
        this.baseurl + '/bugtracking/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  DeletePerson(id) {
    return this.http
      .delete<Person>(this.baseurl + '/bugtracking/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
