import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  fieldsError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
    this.signupRequestPayload = {
      username: '',
      password: '',
      email: ''
    };
  }

  signUp() {
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signUp(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      }, error => {
        this.fieldsError = true
        console.log(error);
      });
  }


  ngOnInit(): void {
    this.signupForm  = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl(null, Validators.required)
    })
  }

}
