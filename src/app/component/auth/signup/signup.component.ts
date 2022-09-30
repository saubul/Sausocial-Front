import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService) { 
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
        console.log(error);
        this.toastr.error('Ошибка регистрации! Попробуйте еще раз');
      });
  }


  ngOnInit(): void {
    this.signupForm  = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })
  }

}
