import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { RequestInterceptor } from "./request-interceptor/request.interceptor";

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    BrowserModule
  ],
  declarations: [
    LoginComponent,
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
