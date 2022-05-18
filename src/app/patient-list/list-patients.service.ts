import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, shareReplay, catchError, throwError, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPatient } from '../interface/patient';

@Injectable({
  providedIn: 'root'
})
export class ListPatientsService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) { 
  }

  public getListPatient(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(this.apiUrl)
    .pipe(
      tap(patientData => console.log('Patients : ' + JSON.stringify(patientData))),
      shareReplay(),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code : ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage)
  }
}
