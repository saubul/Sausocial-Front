import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.registerSuccessMessage = 'Успешная регистрация. Пожалуйста, проверьте вашу электронную почту '
            + ', чтобы активировать аккаунт, прежде чем войти!';
        }
      });

  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(
      data =>{
        if(data) {
          this.isError = false;
          this.router.navigateByUrl('/');
        } else {
          this.isError = true;
        }
      },
      error => {
        this.isError = true;
      });
  }

}
