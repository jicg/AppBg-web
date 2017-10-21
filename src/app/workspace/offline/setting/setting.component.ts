import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/src/release/message/nz-message.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingService} from '../services/setting.service';
import {NzNotificationService} from '_ng-zorro-antd@0.5.0-rc.2@ng-zorro-antd';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  validateForm: FormGroup;
   _isSpinning: Boolean = true;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (this.validateForm.controls[i].status === 'INVALID') {
        return;
      }
    }
    this._isSpinning = true;
    this.settingService.updateSetting(this.validateForm.getRawValue()).subscribe((res) => {
      this._isSpinning = false;
      this._notification.create('success', '操作成功', '更新成功！');
    }, (err) => {
      this._isSpinning = false;
      this._notification.create('error', '操作失败', err.toLocaleString());
    });
  }

  constructor(private fb: FormBuilder, private _notification: NzNotificationService,
              private settingService: SettingService) {
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      appid: [null, [Validators.required]],
      mchid: [null, [Validators.required]],
      paykey: [null, [Validators.required]],
    });
    this.settingService.getSetting().subscribe((res) => {
      this._isSpinning = false;
      if (res['code'] === 0) {
        this.validateForm.controls['appid'].setValue(res['data'].appid);
        this.validateForm.controls['mchid'].setValue(res['data'].mchid);
        this.validateForm.controls['paykey'].setValue(res['data'].paykey);
      } else {
        this._notification.create('error', '操作失败', res['msg']);
      }

    }, (err) => {
      this._isSpinning = false;
      this._notification.create('error', '操作失败', err.toLocaleString());
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
