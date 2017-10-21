import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {INVALID} from '@angular/forms/src/model';
import {LoginService} from '../services/login.service';
import {NzNotificationService} from 'ng-zorro-antd/src/release/notification/nz-notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  _isSpinning: Boolean = false;
  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (this.validateForm.controls[i].status === 'INVALID') {
        return;
      }
    }
    this._isSpinning = true;
    // this.validateForm.getRawValue()
    console.log(this.validateForm.getRawValue());
    this.loginService.login(this.validateForm.getRawValue()).subscribe((res) => {
      this._isSpinning = false;
      if (res['code'] === 0) {
        localStorage.token = res['data'].token;
        this.router.navigate(['workspace']);
      } else {
        this._notification.create('error', '登陆失败', res['msg']);
      }

    }, (err) => {
      this._isSpinning = false;
      this._notification.create('error', '登陆失败', err.toLocaleString());
    });

    // this.router.navigate(['workspace']);
  }

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notification: NzNotificationService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
