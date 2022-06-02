import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IPatient } from '../interface/patient';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { IResponse } from '../interface/response';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private idPatientUrl = 'http://localhost:8081/patientById';
  private patientUrl = 'http://localhost:8081/patient';
  private patientUpdateUrl = 'http://localhost:8081/patientUpdated/';

  constructor(private http: HttpClient) {
    }

    // HttpClient API get() method => Fetch patient
  public get(patientId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('patientId', patientId);

    return this.http.get<IResponse>(this.idPatientUrl, {params: params})
    .pipe(
      tap(response  => console.log('Patient : ' + JSON.stringify(response ))),
      shareReplay(),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An erreur appears';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code : ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage)
  }

  // HttpClient API post() method => Create patient
  public save(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(this.patientUrl, patient)
    .pipe(
      tap(patientData => console.log('Patient : ' + JSON.stringify(patientData))),
      shareReplay(),
      catchError(this.handleError)
    );
  }
  
  // HttpClient API put() method => Update patient
  updatePatient(patient: IPatient): Observable<IPatient> {
    return this.http
      .put<IPatient>(this.patientUpdateUrl, patient)
        .pipe(
          tap(patientData => console.log('Patient : ' + JSON.stringify(patientData))),
          shareReplay(),
          catchError(this.handleError)
    );
  }
}
