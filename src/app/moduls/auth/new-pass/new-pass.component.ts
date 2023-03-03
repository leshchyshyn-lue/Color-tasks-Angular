import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_URL, TASKS_URL } from 'src/app/environment/url';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'src/app/helpers/patterns';
import ValidateForm from 'src/app/helpers/validateForm';
import { NewPassAfterForgottenPass } from 'src/app/model/newPassAfterForgottenRequest';
import { ValidatorsError } from 'src/app/model/validators-error';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent implements OnInit {

  public sessionId: any = "";

  public dto: NewPassAfterForgottenPass = new NewPassAfterForgottenPass;

  public errorMessage!: string;

  public newPasswordForm!: FormGroup;

  public isText: boolean = false;

  public type: string = "password";

  constructor
    (
      private readonly _userSerivce: UserService,
      private readonly _router: Router,
      private readonly _formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.newPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      newPassword: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      reEnterPassword: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
  }

  public emailError: ValidatorsError[] = [
    { errorName: "required", message: "*Email is required" },
    { errorName: "pattern", message: "*Email must be in the form XXXXXX@gmail.com" }
  ]
  public passwordError: ValidatorsError[] = [
    { errorName: "required", message: "*This field is required" },
    { errorName: "pattern", message: "*Password must contain 1 capital letter and include 8 characters" }
  ]

  public hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.type = "text" : this.type = "password";
  }

  public onSubmit(): void {
    if (this.newPasswordForm.valid) {
      this.dto.email = this.newPasswordForm.get('email')?.value;
      this.dto.newPassword = this.newPasswordForm.get('newPassword')?.value;
      this.dto.reEnterPassword = this.newPasswordForm.get('reEnterPassword')?.value;
      this._userSerivce.setNewUserPassAfterForgotten(this.dto).subscribe(
        res => {
          if (res) {
            this.sessionId = res.sessionId;
            sessionStorage.setItem(
              'token',
              this.sessionId
            );
            window.location.replace("/" + TASKS_URL);
          } else {
            alert("Fail");
          }
        },
        err => this.errorMessage = "*" + err.error.message,
        () => this._router.navigateByUrl("/" + LOGIN_URL)
      );
    } else {
      ValidateForm.validateAllFormFields(this.newPasswordForm);
    }
  }

}
