import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuModule } from './moduls/menu/menu.module';
import { LoginModule } from './moduls/auth/login.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './moduls/user-data/user.module';
import { RegistrationModule } from './moduls/registration/registration.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    UserModule,
    LoginModule,
    RegistrationModule,
    HttpClientModule
  ]
})
export class AppModule { }
