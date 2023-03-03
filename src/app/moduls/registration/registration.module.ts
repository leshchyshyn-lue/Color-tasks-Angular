import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration.component";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  declarations: [
    RegistrationComponent
  ],
  exports: [RegistrationComponent],

})
export class RegistrationModule { }
