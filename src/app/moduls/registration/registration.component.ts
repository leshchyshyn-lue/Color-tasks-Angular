import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_URL } from 'src/app/environment/url';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';

interface RegistrationError {
  errorName: string;
  message: string;
}




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public user: User = new User;

  public errorMessage!: string;

  public registrationForm!: FormGroup;

  private readonly _usernamePattern = /[а-яёА-ЯЁa-zA-Z!@#$%^&*]{6,12}/;
  private readonly _passwordPattern = /(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9а-яёА-ЯЁa-zA-Z!@#$%^&*]{8,}/;

  constructor
    (
      private readonly _userSerivce: UserService,
      private readonly _router: Router,
      private readonly _formBuilder: FormBuilder
    ) { }

  public passwordError: RegistrationError[] = [
    { errorName: "required", message: "*Username is required" },
    { errorName: "pattern", message: "*Password must contain 1 capital letter and include 8 characters" },
  ]

  public usernameError: RegistrationError[] = [
    { errorName: "required", message: "*Username is required" },
    { errorName: "pattern", message: "*Login must contain between 6 and 12 letters" },
  ]

  public ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this._usernamePattern)]],
      password: ['', [Validators.required, Validators.pattern(this._passwordPattern)]]
    });

  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      this.user.username = this.registrationForm.get('username')?.value;
      this.user.password = this.registrationForm.get('password')?.value;
      this._userSerivce.addNewUser(this.user).subscribe(
        res => console.log('HTTP response', res),
        err => this.errorMessage = "*" + err.error.message,
        () => this.goToLogin()
      );
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }

  public goToLogin(): void {
    this._router.navigateByUrl("/" + LOGIN_URL)
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  }

}
