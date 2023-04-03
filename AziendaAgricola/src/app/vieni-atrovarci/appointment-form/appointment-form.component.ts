import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AppointmentResponse {
  status: string;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.appointmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.appointmentForm && this.appointmentForm.valid) {
      const appointmentData = {
        name: this.appointmentForm.get('name')?.value ?? '',
        surname: this.appointmentForm.get('surname')?.value ?? '',
        email: this.appointmentForm.get('email')?.value ?? '',
        date: this.appointmentForm.get('date')?.value ?? '',
      };
      this.http
        .post<{ status: string }>(
          'http://localhost:3000/prenotazione',
          appointmentData
        )
        .subscribe(
          (response) => {
            this.appointmentForm.reset();
            console.log('successo');
            console.log(response);
            this.snackBar.open(
              'Appuntamento prenotato con successo',
              'Chiudi',
              {
                duration: 3000,
              }
            );
            this.snackBar.open(
              "Ti invieremo una mail con l'orario e la conferma dell'appuntamento",
              'Chiudi',
              { duration: 3000 }
            );
          },
          (error) => {
            console.log('Insuccesso');
            console.log(error);
            this.snackBar.open("Errore nell'invio della mail", 'Chiudi', {
              duration: 3000,
            });
          }
        );
    }
  }
}
