import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientNoteComponent } from './patient-note/patient-note.component';
import { PatientNoteEditComponent } from './patient-note-edit/patient-note-edit.component';

const routes: Routes = [
  {
    path: 'patient',
    component: PatientComponent
},
  {
    path : 'list-patients',
    component : PatientListComponent,
    pathMatch: 'prefix'
},
{
  path : 'detail-patient/:id',
  component : DetailPatientComponent,
  pathMatch: 'prefix'
},
{
  path : 'patient-note-edit/:id',
  component : PatientNoteEditComponent,
  pathMatch: 'prefix'
},
{
  path : 'edit-patient/:id',
  component : PatientEditComponent,
  pathMatch: 'prefix'
},
{
  path : 'patient-note/:id',
  component : PatientNoteComponent,
  pathMatch: 'prefix'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
