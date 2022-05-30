import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientNoteComponent } from './patient-note/patient-note.component';
import { PatientNoteEditComponent } from './patient-note-edit/patient-note-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientComponent,
    DetailPatientComponent,
    PatientEditComponent,
    PatientNoteComponent,
    PatientNoteEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
