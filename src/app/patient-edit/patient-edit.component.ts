import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPatient } from '../interface/patient';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  patientForm!: FormGroup;
  public patient!: IPatient;
  public id!: number;
  patientModel!: IPatient;

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private patientService: PatientService,
    private router: Router, private toastr: ToastrService) { 
     }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.patientService.get(this.id).subscribe(data => {
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
  }
  onSubmit() {
    console.log('bonjour');
    this.patientModel={
      "patientId": this.id,
      "firstName":this.patientForm.get('firstName')!.value,
      "lastName":this.patientForm.get('lastName')!.value,
      "birthDate":this.patientForm.get('birthDate')!.value,
      "sex":this.patientForm.get('sex')!.value,
      "address":this.patientForm.get('address')!.value,
      "phone":this.patientForm.get('phone')!.value
    }
    this.patientService.updatePatient(this.patientModel)
      .subscribe(
        (res: any) => {
          if (res['errorCode'] === null) {
            this.toastr.success('Registration successful', ' Message');
            this.router.navigate(['/list-patients']);
          } else {
            console.log(res);
            this.toastr.error(res['errorDescription'], ' Message');
          }
        },
        error => {
          console.log(error);
          this.toastr.error('An error occurred please contact the administrator', ' Message' );
        }
      );
  }
}

