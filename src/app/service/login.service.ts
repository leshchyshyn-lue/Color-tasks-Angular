import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { LOGIN_URL, MAIN_URL } from '../environment/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly _http: HttpClient
  ) { }


  public loginUser(username: string, password: string): Observable<any> {
    return this._http.post<any>(MAIN_URL + "/" + LOGIN_URL, {
      username: username,
      password: password
    });
  }



}