import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';

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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
