import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPatient } from '../interface/patient';
import { IPatientNote } from '../interface/patient-note';
import { RiskLevel } from '../interface/risk-level';
import { PatientNoteService } from '../service/patient-note.service';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit {

  patientForm!: FormGroup;
  patientNoteForm!: FormGroup;
  diabeteAssessForm!: FormGroup;
  public patient!: IPatient;
  public patientNotes!: IPatientNote[];
  public diabeteRiskLevel!: RiskLevel;

  
  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private patientService: PatientService,
    private patientNoteService: PatientNoteService) {
      
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
      this.patientNoteService.getDiabeteRiskLevel(id).subscribe(data => {
        console.log(data);
        this.diabeteRiskLevel = data;
        this.diabeteAssessForm = this.formBuilder.group({
          diabeteRiskLevel: [data.diabeteRiskLevel]    
      });
    })
})
  this.patientNoteService.get(id).subscribe(data => {
    console.log(data);
    this.patientNotes = data;
    
  })

      console.log(id);

  }

}
