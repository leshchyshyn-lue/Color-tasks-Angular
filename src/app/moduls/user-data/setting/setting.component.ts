import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TASKS_URL } from 'src/app/environment/url';
import { NewUserPasswordRequest } from 'src/app/model/newUserPasswordRequest';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public newUserPasswordRequest: NewUserPasswordRequest = new NewUserPasswordRequest;

  public errorMessage!: string;

  public newPasswordForm!: FormGroup;

  private readonly _passwordPattern = /(?=.*[0-9])(?=.*[A-ZА-ЯЁ])[0-9а-яёА-ЯЁa-zA-Z!@#$%^&*]{8,}/;

  constructor
    (
      private readonly _userSerivce: UserService,
      private readonly _router: Router,
      private readonly _formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.newPasswordForm = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(this._passwordPattern)]],
      reEnterPassword: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.newPasswordForm.valid) {
      this.newUserPasswordRequest.newPassword = this.newPasswordForm.get('newPassword')?.value;
      this.newUserPasswordRequest.oldPassword = this.newPasswordForm.get('oldPassword')?.value;
      this.newUserPasswordRequest.reEnterPassword = this.newPasswordForm.get('reEnterPassword')?.value;
      this._userSerivce.changeUserPassword(this.newUserPasswordRequest).subscribe(
        res => console.log('HTTP response', res),
        err => this.errorMessage = "*" + err.error.message,
        () => this._router.navigateByUrl("/" + TASKS_URL)
      );
    } else {
      this.validateAllFormFields(this.newPasswordForm);
    }
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
