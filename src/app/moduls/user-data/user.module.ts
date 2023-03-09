import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { ComformationWindowComponent } from "src/app/components/confirmation-window/confirmation-window.component";
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
    ComformationWindowComponent,
    SettingComponent,
  ],
  exports: [UserDataComponent],

})
export class UserModule { }
