import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  public getUser(): Observable<JSON> {

    return this.http.get(`/v1/user`).map(res => {
      return res.json();
    });
  }

  public modifyPwd(data): Observable<JSON> {
    return this.http.patch(`/v1/user/pwdchange`, data).map(res => {
      return res.json();
    });
  }

}
