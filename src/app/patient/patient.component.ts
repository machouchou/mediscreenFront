import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPatient } from '../interface/patient';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  [x: string]: any;
  patientForm: FormGroup;
  patientModel!: IPatient;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService,
    private router: Router, private toastr: ToastrService) { 
      this.patientForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
        sex: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', [Validators.required]]
      });
    }

  ngOnInit() {
    
  }
 onSubmit() {
    console.log('bonjour');
    this.patientModel={
      "firstName":this.patientForm.get('firstName')!.value,
      "lastName":this.patientForm.get('lastName')!.value,
      "birthDate":this.patientForm.get('birthDate')!.value,
      "sex":this.patientForm.get('sex')!.value,
      "address":this.patientForm.get('address')!.value,
      "phone":this.patientForm.get('phone')!.value
    }

  this.patientService.save(this.patientModel)
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
