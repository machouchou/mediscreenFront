import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../interface/response';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { IPatientNote } from '../interface/patient-note';

@Injectable({
  providedIn: 'root'
})
export class PatientNoteService {

  private noteUrl = 'http://localhost:8082/notes'
  private addNoteUrl = 'http://localhost:8082/note'

  constructor(private http: HttpClient) {

   }

   // HttpClient API get() method => Fetch patient
  public get(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('patientId', id);

    return this.http.get<IResponse>(this.noteUrl, {params: params})
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
  public save(note: IPatientNote): Observable<IPatientNote> {
    return this.http.post<IPatientNote>(this.addNoteUrl, note)
    .pipe(
      tap(noteData => console.log('Note : ' + JSON.stringify(      tap(noteData => console.log('Patient : ' + JSON.stringify(noteData))),
      ))),
      shareReplay(),
      catchError(this.handleError)
    );
  }
}
