import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ForgotPassComponent } from "./forgot-pass/forgot-pass.component";
import { LoginComponent } from "./login.component";
import { NewPassComponent } from "./new-pass/new-pass.component";
import { RequestInterceptor } from "./request-interceptor/request.interceptor";

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
  ],
  declarations: [
    LoginComponent,
    ForgotPassComponent,
    NewPassComponent
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
      }
    ]
  ],
  exports: [LoginComponent],

})
export class LoginModule { }
