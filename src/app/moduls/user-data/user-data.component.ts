import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalWindowComponent } from 'src/app/components/confirmation-window/confirmation-window.component';
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

  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(
    private readonly _userService: UserService,
    private readonly _matDialog: MatDialog,
    private readonly _router: Router
  ) { }

  public ngOnInit(): void {
    this.findUser();
  }

  public findUser(): void {
    this._userService.findUser().subscribe(data => {
      this.user = data;
      this.isAuthenticated = true;
      this.newItemEvent.emit(true);
    });
  }


  public logout(): void {
    sessionStorage.clear();
    this._userService.logout().subscribe();
    this.isAuthenticated = false;
    window.location.replace("/" + LOGIN_URL);
    // this._router.navigateByUrl("/" + LOGIN_URL);
  }

  public modalWindow(): void {
    let dialogRef = this._matDialog.open(ModalWindowComponent,
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
