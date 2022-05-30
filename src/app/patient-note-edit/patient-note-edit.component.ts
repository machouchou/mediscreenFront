import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPatientNote } from '../interface/patient-note';
import { PatientNoteService } from '../service/patient-note.service';

@Component({
  selector: 'app-patient-note-edit',
  templateUrl: './patient-note-edit.component.html',
  styleUrls: ['./patient-note-edit.component.scss']
})
export class PatientNoteEditComponent implements OnInit {
  patientNoteForm!: FormGroup;
  public patientNote!: IPatientNote;
  public id!: string;
  public idPatient!: number;
  patientNoteModel!: IPatientNote;

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private patientNoteService: PatientNoteService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.patientNoteService.getByIdNote(this.id).subscribe(data => {
      console.log(data);
      this.patientNote = data;
      console.log(this.patientNote);
      this.patientNoteForm = this.formBuilder.group({
        id: [this.patientNote.id],
        note: [this.patientNote.note]
      });
    })
  }
  onSubmit() {
    console.log('bonjour');
    this.patientNoteModel={
      "id": this.id,
      "patientId": this.patientNote.patientId,
      "note":this.patientNoteForm.get('note')!.value
      
    }
    this.patientNoteService.updateNote(this.patientNoteModel)
      .subscribe(
        (res: any) => {
          if (res['errorCode'] === null) {
            this.toastr.success('Registration successful', ' Message');
            this.router.navigate(['/detail-patient/'+this.patientNote.patientId]);
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
