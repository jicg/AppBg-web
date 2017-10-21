import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';

@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  public getOrders(pageIndex = 1, pageSize = 10, condition: JSON): Observable<JSON> {
    condition['pageIndex'] = pageIndex;
    condition['pageSize'] = pageSize;
    return this.http.get('/v1/offline/order', {params: condition}).map(res => {
      return res.json();
    });
  }

  // public getLoadXlsOrders(condition: JSON): Observable<Response> {
  //   return this.http.get('/v1/offline/xls/order', {params: condition, responseType: 'xlsx'});
  // }

  public getOrder(id: number): Observable<JSON> {
    return this.http.get('/v1/offline/order/' + id).map(res => {
      return res.json();
    });
  }

  public addOrder(data: JSON): Observable<JSON> {
    return this.http.post('/v1/offline/order/', data).map(res => {
      return res.json();
    });
  }

  public putOrder(id, data: JSON): Observable<JSON> {
    return this.http.put('/v1/offline/order/' + id, data).map(res => {
      return res.json();
    });
  }

  public delOrder(id): Observable<JSON> {
    return this.http.delete('/v1/offline/order/' + id).map(res => {
      return res.json();
    });
  }

  public getPay(id): Observable<JSON> {
    return this.http.get(`/v1/offline/order/wxpay/` + id).map(res => {
      return res.json();
    });
  }

}
