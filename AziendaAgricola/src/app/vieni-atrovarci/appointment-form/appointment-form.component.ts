import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      const formData = new FormData();
      formData.append('name', this.appointmentForm.get('name')?.value ?? '');
      formData.append('surname', this.appointmentForm.get('surname')?.value ?? '');
      formData.append('email', this.appointmentForm.get('email')?.value ?? '');
      formData.append('date', this.appointmentForm.get('date')?.value ?? '');

      // Invia la richiesta HTTP POST al backend per inviare la mail con i dati del form
      this.http.post('http://localhost:3000/send-email', formData).subscribe(
        (response) => {
          this.appointmentForm.reset();
          this.snackBar.open('Appuntamento prenotato con successo', 'Chiudi', {
            duration: 3000,
          });
          this.snackBar.open('Ti invieremo una mail con l\'orario e la conferma dell\'appuntamento', 'Chiudi', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open(
            "Errore nell'invio della mail",
            'Chiudi',
            { duration: 3000 }
          );
        }
      );
    }
  }
}
