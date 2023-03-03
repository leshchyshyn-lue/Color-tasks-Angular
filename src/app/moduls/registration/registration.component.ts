import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_URL } from 'src/app/environment/url';
import { EMAIL_PATTERN, PASSWORD_PATTERN, PHONE_NUMBER_PATTERN, USERNAME_PATTERN } from 'src/app/helpers/patterns';
import ValidateForm from 'src/app/helpers/validateForm';
import { ValidatorsError } from 'src/app/model/validators-error';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public user: User = new User;

  public errorMessage!: string;

  public registrationForm!: FormGroup;

  public isText: boolean = false;
  public type: string = "password";

  constructor
    (
      private readonly _userSerivce: UserService,
      private readonly _router: Router,
      private readonly _formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]]
    });
  }

  public passwordError: ValidatorsError[] = [
    { errorName: "required", message: "*Password is required" },
    { errorName: "pattern", message: "*Password must contain 1 capital letter and include 8 characters" }
  ]

  public usernameError: ValidatorsError[] = [
    { errorName: "required", message: "*Username is required" },
    { errorName: "pattern", message: "*Login must contain between 6 and 12 letters" }
  ]

  public phoneNumberError: ValidatorsError[] = [
    { errorName: "required", message: "*Phone number is required" },
    { errorName: "pattern", message: "*Phone number must be in the form XXX-XXXXXXX (10 numbers)" }
  ]

  public emailError: ValidatorsError[] = [
    { errorName: "required", message: "*Email is required" },
    { errorName: "pattern", message: "*Email must be in the form XXXXXX@gmail.com" }
  ]

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      this.user.username = this.registrationForm.get('username')?.value;
      this.user.password = this.registrationForm.get('password')?.value;
      this.user.phoneNumber = this.registrationForm.get('phoneNumber')?.value;
      this.user.email = this.registrationForm.get('email')?.value;
      this._userSerivce.addNewUser(this.user).subscribe(
        res => console.log('HTTP response', res),
        err => this.errorMessage = "*" + err.error.message,
        () => this.goToLogin()
      );
    } else {
      ValidateForm.validateAllFormFields(this.registrationForm);
    }
  }

  public goToLogin(): void {
    this._router.navigateByUrl("/" + LOGIN_URL)
  }

  public hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.type = "text" : this.type = "password";
  }

}
