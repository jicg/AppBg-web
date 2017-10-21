import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Injectable()
export class SettingService {

  constructor(private http: Http) {
  }

  public updateSetting(data): Observable<JSON> {
    return this.http.post(`/v1/offline/setting`, data).map(res => {
      return res.json();
    });
  }

  public getSetting(): Observable<JSON> {
    return this.http.get(`/v1/offline/setting`).map(res => {
      return res.json();
    });
  }
}
