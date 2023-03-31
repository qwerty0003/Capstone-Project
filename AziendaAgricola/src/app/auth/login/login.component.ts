import { Component, OnInit } from '@angular/core';
import { AuthService, LoginData } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

constructor(private fb: FormBuilder, private authService: AuthService) { }

ngOnInit(): void {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', Validators.required]
});
}

onSubmit() {
const { email, password } = this.loginForm.value;
this.authService.login({ email, password }).subscribe(
() => {
console.log('Login effettuato con successo');
},
(error) => {
console.error('Errore durante il login:', error);
}
);
}

}
