import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComformationWindowComponent } from 'src/app/components/confirmation-window/confirmation-window.component';
import { User } from 'src/app/entity/user';
import { LOGIN_URL } from 'src/app/environment/url';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {


  public user!: User;
  public isAuthenticated!: boolean;

  @Output() authenticationEvent = new EventEmitter<boolean>();

  constructor(
    private readonly _userService: UserService,
    private readonly _matDialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.findUser();
  }

  public findUser(): void {
    this._userService.findUser().subscribe(data => {
      this.user = data;
      this.isAuthenticated = true;
      this.authenticationEvent.emit(true);
    });
  }

  public logout(): void {
    sessionStorage.clear();
    this._userService.logout().subscribe();
    this.isAuthenticated = false;
    window.location.replace("/" + LOGIN_URL);
  }

  public onExitButton(): void {
    const dialogRef = this._matDialog.open(ComformationWindowComponent,
      {
        data: "Sign out?"
      });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.logout();
      }
    });
  }

}
