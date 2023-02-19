import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { TASKS_URL } from 'src/app/environment/url';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public sessionId: any = "";

  public errorMessage!: string;

  public loginForm!: FormGroup;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      const http = this._loginService.loginUser(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      );
      http.subscribe(
        res => {
          if (res) {
            this.sessionId = res.sessionId;
            sessionStorage.setItem(
              'token',
              this.sessionId
            );
            // this._router.navigateByUrl("/" + TASKS_URL);
            window.location.replace("/" + TASKS_URL);
          } else {
            alert("Authentication failed");
          }
        },
        err => this.errorMessage = "Incorrect login or password"
      );
    } else {
      this.validateAllFormFields(this.loginForm)
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}










