import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPatientNote } from '../interface/patient-note';
import { PatientNoteService } from '../service/patient-note.service';

@Component({
  selector: 'app-patient-note',
  templateUrl: './patient-note.component.html',
  styleUrls: ['./patient-note.component.scss']
})
export class PatientNoteComponent implements OnInit {

  [x: string]: any;
  noteForm: FormGroup;
  
  noteModel!: IPatientNote;

  constructor(private formBuilder: FormBuilder, private patientNoteService: PatientNoteService,
    private router: Router, private toastr: ToastrService) { 
      this.noteForm = this.formBuilder.group({
        id: ['', Validators.required],
        note: ['', Validators.required],
    });
  } 

ngOnInit() {
    
  }
  onSubmit() {
    console.log('bonjour');
    this.noteModel={
      "patientId":this.noteForm.get('id')!.value,
      "note":this.noteForm.get('note')!.value
    }

  this.patientNoteService.saveNote(this.noteModel)
      .subscribe(
        (res: any) => {
          if (res['errorCode'] === null) {
            this.toastr.success('Registration successful', ' Message');
            this.router.navigate(['/detail-patient/'+this.noteModel.patientId]);
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
