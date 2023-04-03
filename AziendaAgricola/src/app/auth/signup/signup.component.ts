import { Component } from '@angular/core';
import { AuthService, SignupData } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const signupData = {
      nome: this.signupForm.value.nome,
      cognome: this.signupForm.value.cognome,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };
    this.authService.signup(signupData).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
