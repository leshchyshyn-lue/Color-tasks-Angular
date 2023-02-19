import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { LOGIN_URL } from "./environment/url";
import { LoginComponent } from "./moduls/auth/login.component";
import { AuthenticationGuard } from "./moduls/auth/quards/authentication.guard";
import { RegistrationComponent } from "./moduls/registration/registration.component";


const routes: Routes = [
    {
        path: '', canActivate: [AuthenticationGuard], children: [
            { path: 'registration', component: RegistrationComponent },
            { path: LOGIN_URL, component: LoginComponent },
            { path: '', component: AboutPageComponent },
        ]
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
