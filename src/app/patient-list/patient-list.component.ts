import { Component, OnInit } from '@angular/core';
import { IPatient } from '../interface/patient';
import { PatientService } from '../service/patient.service';
import { ListPatientsService } from './list-patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public patients: IPatient[];

  constructor(private listpatients: ListPatientsService) { 
    this.patients = [];
  }

  ngOnInit(): void {
    this.listpatients.getListPatient().subscribe(data => {
      this.patients = data;
    });
  }

}
