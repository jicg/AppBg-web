import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {NgZorroAntdModule} from 'ng-zorro-antd/src/release/ng-zorro-antd.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    LoginRoutingModule,
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {
}
