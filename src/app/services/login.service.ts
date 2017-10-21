import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class LoginService {


  constructor(private http: Http) {
  }

  public login(user): Observable<JSON> {
    return this.http.post(`/v1/login`, user)
      .map(res => {
        return res.json();
      });
  }
}


