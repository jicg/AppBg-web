/**
 * Created by jicg on 2017/10/7.
 */
import {Injectable} from '@angular/core';
import {
  Http as NgHttp,
  XHRBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Headers
} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class MyHttp extends NgHttp {
  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }


  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.addAuth(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.addAuth(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.addAuth(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.addAuth(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.patch(url, body, this.addAuth(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.head(url, this.addAuth(options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.options(url, this.addAuth(options));
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, this.addAuth(options));
  }

  addAuth(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = new RequestOptions();
    }
    if (!options.headers) {
      options.headers = new Headers();
      options.headers.append('Authorization', localStorage.token);
    }
    return options;
  }
}
