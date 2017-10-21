import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/src/release/notification/nz-notification.service';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.scss']
})
export class PwdComponent implements OnInit {

  validateForm: FormGroup;

  _isSpinning: boolean = false;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (this.validateForm.controls[i].status === 'INVALID') {
        return;
      }
    }
    const pwd = this.validateForm.getRawValue().password;
    this._userService.modifyPwd({pwd: pwd}).subscribe((res) => {
      this._isSpinning = false;
      if (res['code'] === 0) {
        this._notification.create('success', '修改成功', '密码修改成功');
      } else {
        this._notification.create('error', '登陆失败', res['msg']);
      }

    }, (err) => {
      this._isSpinning = false;
      this._notification.create('error', '登陆失败', err.toLocaleString());
    });
  }

  constructor(private fb: FormBuilder,
              private _notification: NzNotificationService,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
  }

  updateConfirmValidator() {
    setTimeout(_ => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
