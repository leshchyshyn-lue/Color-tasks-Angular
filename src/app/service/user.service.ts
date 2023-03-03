import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { LOGIN_URL, MAIN_URL } from '../environment/url';
import { NewPassAfterForgottenPass } from '../model/newPassAfterForgottenRequest';
import { NewUserPasswordRequest } from '../model/newUserPasswordRequest';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private readonly _http: HttpClient
  ) { }

  public loginUser(username: string, password: string): Observable<any> {
    return this._http.post<any>(MAIN_URL + "/" + LOGIN_URL, {
      username: username,
      password: password
    });
  }

  public findUser(): Observable<User> {
    return this._http.get<User>(MAIN_URL + "/user");
  }

  public addNewUser(user: User): Observable<User> {
    return this._http.post<User>(MAIN_URL + "/registration", user);
  }

  public changeUserPassword(request: NewUserPasswordRequest): Observable<User> {
    return this._http.put<User>(MAIN_URL + "/pass", request)
  }
  public logout(): Observable<Object> {
    return this._http.post(MAIN_URL + "/logout", {});
  }

  public deleteAccount(): Observable<User> {
    return this._http.delete<User>(MAIN_URL + "/delete");
  }

  public sendUserPasswordToEmail(email: string): Observable<User> {
    return this._http.post<User>(MAIN_URL + "/forgot", email);
  }

  public verifyCode(code: String): Observable<User> {
    return this._http.post<User>(MAIN_URL + "/verify", code);
  }

  public setNewUserPassAfterForgotten(request: NewPassAfterForgottenPass): Observable<any> {
    return this._http.put<any>(MAIN_URL + "/forgot/pass", request);
  }

}


