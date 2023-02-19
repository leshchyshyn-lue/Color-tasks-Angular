import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { MAIN_URL } from '../environment/url';
import { NewUserPasswordRequest } from '../model/newUserPasswordRequest';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private readonly _http: HttpClient
  ) { }


  public findUser(): Observable<User> {
    return this._http.get<User>(MAIN_URL + "/user");
  }

  public addNewUser(user: User) {
    return this._http.post<User>(MAIN_URL + "/registration", user);
  }

  public changeUserPassword(request: NewUserPasswordRequest): Observable<User> {
    return this._http.put<User>(MAIN_URL + "/pass", request)
  }
  public logout(): Observable<Object> {
    return this._http.post(MAIN_URL + "/logout", {});
  }

}


