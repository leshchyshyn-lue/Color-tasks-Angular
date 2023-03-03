import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TASKS_URL } from 'src/app/environment/url';
import ValidateForm from 'src/app/helpers/validateForm';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public sessionId: any = "";

  public errorMessage!: string;

  public loginForm!: FormGroup;

  public isText: boolean = false;
  public type: string = "password";

  constructor(
    private readonly _userService: UserService,
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
      const http = this._userService.loginUser(
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
            window.location.replace("/" + TASKS_URL);
          } else {
            alert("Authentication failed");
          }
        },
        err => this.errorMessage = "Incorrect login or password"
      );
    } else {
      ValidateForm.validateAllFormFields(this.loginForm)
    }
  }

  public hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.type = "text" : this.type = "password";
  }


}










