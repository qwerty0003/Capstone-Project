import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from './signup-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const data = {
        name: this.signupForm.value.name,
        surname: this.signupForm.value.surname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.signupService.signup(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
