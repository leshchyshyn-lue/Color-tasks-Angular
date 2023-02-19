import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { ModalWindowComponent } from "src/app/components/confirmation-window/confirmation-window.component";
import { SettingComponent } from "./setting/setting.component";
import { UserDataComponent } from "./user-data.component";
import { UserRoutingModule } from "./user-routing.module";


@NgModule({
  imports: [
    UserRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    UserDataComponent,
    ModalWindowComponent,
    SettingComponent,
  ],
  exports: [UserDataComponent],

})
export class UserModule { }
