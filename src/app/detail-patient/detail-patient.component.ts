import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from '../interface/patient';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit {

  patientForm!: FormGroup;
  public patient!: IPatient;
  
  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private patientService: PatientService) {

   }

  

  ngOnInit() {

    let id = this.route.snapshot.params['id'];
      this.patientService.get(id).subscribe(data => {
      this.patient = data.data;
      console.log(this.patient);
      this.patientForm = this.formBuilder.group({
        firstName: [this.patient.firstName],
        lastName: [this.patient.lastName],
        birthDate: [this.patient.birthDate],
        sex: [this.patient.sex],
        address: [this.patient.address],
        phone: [this.patient.phone]
      });
})
  
    console.log(id);

  }

}
