import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { LOGIN_URL } from "./environment/url";
import { ForgotPassComponent } from "./moduls/auth/forgot-pass/forgot-pass.component";
import { LoginComponent } from "./moduls/auth/login.component";
import { NewPassComponent } from "./moduls/auth/new-pass/new-pass.component";
import { AuthenticationGuard } from "./moduls/auth/quards/authentication.guard";
import { RegistrationComponent } from "./moduls/registration/registration.component";


const routes: Routes = [
    {
        path: '', canActivate: [AuthenticationGuard], children: [
            { path: 'registration', component: RegistrationComponent },
            { path: LOGIN_URL, component: LoginComponent },
            { path: 'forgot', component: ForgotPassComponent },
            { path: 'forgot/pass', component: NewPassComponent },
            { path: '', component: AboutPageComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
