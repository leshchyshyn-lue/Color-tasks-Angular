import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { User } from 'src/app/entity/user';
import { CODE_LENGTH, EMAIL_PATTERN } from 'src/app/helpers/patterns';
import ValidateForm from 'src/app/helpers/validateForm';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  public errorMessage!: string;

  public user!: User;

  public forgotForm!: FormGroup;

  public codeForm!: FormGroup;
  public codeIsSent!: boolean;
  public code!: string;

  public timer: number = 60;
  public subscription!: Subscription
  public source = interval(1000);
  public linkIsAllowed!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _router: Router
  ) { }

  public ngOnInit(): void {
    this.forgotForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]]
    });
    this.codeForm = this._formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(CODE_LENGTH)]]
    });

  }

  public onSendEmail(): void {
    if (this.forgotForm.valid) {
      this._userService.sendUserPasswordToEmail(
        this.forgotForm.get('email')?.value
      ).subscribe(
        res => console.log('HTTP response', res),
        err => this.errorMessage = "*" + err.error.message,
        () => this.subscribeMethod()
      );
    } else {
      ValidateForm.validateAllFormFields(this.forgotForm);
    }
  }

  public resendEmail(): void {
    this.linkIsAllowed = false;
    this.timer = 60;
    this.subscribeMethod();
    this._userService.sendUserPasswordToEmail(this.forgotForm.get('email')?.value).subscribe();
  }

  public onSendCode(): void {
    this._userService.verifyCode(this.codeForm.get('code')?.value).subscribe(
      res => console.log('HTTP response', res),
      err => this.errorMessage = "*" + err.error.message,
      () => this._router.navigateByUrl("forgot/pass")
    );
  }
  public subscribeMethod(): void {
    this.codeIsSent = true;
    this.subscription = this.source.subscribe(() => {
      this.secondsPassed();
    });
  }

  public secondsPassed(): void {
    if (this.timer === 0) {
      this.linkIsAllowed = true;
      this.subscription.unsubscribe();
    } else {
      this.timer--;
    }
  }

}
