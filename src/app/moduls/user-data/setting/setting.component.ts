import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComformationWindowComponent } from 'src/app/components/confirmation-window/confirmation-window.component';
import { LOGIN_URL, TASKS_URL } from 'src/app/environment/url';
import { PASSWORD_PATTERN } from 'src/app/helpers/patterns';
import ValidateForm from 'src/app/helpers/validateForm';
import { NewUserPasswordRequest } from 'src/app/model/newUserPasswordRequest';
import { UserService } from 'src/app/service/user.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public newUserPasswordRequest: NewUserPasswordRequest = new NewUserPasswordRequest;

  public errorMessage!: string;

  public newPasswordForm!: FormGroup;

  public isText: boolean = false;

  public type: string = "password";

  constructor
    (
      private readonly _userSerivce: UserService,
      private readonly _router: Router,
      private readonly _formBuilder: FormBuilder,
      private readonly _matDialog: MatDialog,
      private readonly _userService: UserService
    ) { }

  public ngOnInit(): void {
    this.newPasswordForm = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
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
      ValidateForm.validateAllFormFields(this.newPasswordForm);
    }
  }

  public hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.type = "text" : this.type = "password";
  }

  public toDeleteAccount(): void {
    this._userSerivce.deleteAccount().subscribe(() => {
      sessionStorage.clear();
      this._userService.logout().subscribe();
      window.location.replace("/" + LOGIN_URL);
    });
  }

  public onDeleteAccount(): void {
    const diologRef = this._matDialog.open(ComformationWindowComponent,
      {
        data: "Are you sure you want to delete your account?"
      });
    diologRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.toDeleteAccount();
      }
    });
  }

}
