import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "../auth/quards/authentication.guard";
import { SettingComponent } from "./setting/setting.component";


const routes: Routes = [
    {
        path: '', canActivate: [AuthenticationGuard], children: [
            { path: "setting", component: SettingComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
