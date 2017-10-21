import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/src/release/notification/nz-notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  validateForm: FormGroup;
  _isSpinning: Boolean = false;
  _isQ = false;
  _id: number = -1;

  constructor(private fb: FormBuilder,
              private _notification: NzNotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private _orderService: OrderService) {
    const _id = this.route.snapshot.params['id'];
    this._id = parseInt(_id, 10) || -1;
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      orderno: [''],
      optname: [null, [Validators.required]],
      sttype: ['1', [Validators.required]],
      product: [null, [Validators.required]],
      amt: [null, [Validators.required, Validators.min(0)]],
      remark: [null],
    });

    if (this._id !== -1) {
      this._isSpinning = true;
      this._orderService.getOrder(this._id).subscribe((res) => {
        this._isSpinning = false;
        if (res['code'] === 0) {
          const data = res['data'];
          if (data.status == 2) {
            this._isQ = true;
          }
          this.validateForm.setValue({
            orderno: data.orderno,
            optname: data.optname,
            sttype: data.sttype,
            product: data.product,
            amt: data.amt,
            remark: data.remark,
          });
        } else {
          this._notification.create('error', '操作失败', res['msg']);
        }
      }, (err) => {
        this._isSpinning = false;
        this._notification.create('error', '网络错误', err.toString());
      });
    }

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  _vaildAmt() {
    const data = this.validateForm.getRawValue();
    data.amt = parseFloat(data.amt) || null;
    data.amt = data.amt < 0 ? null : data.amt;
    this.validateForm.setValue(data);
  }


  pay() {
    this.router.navigate(['../pay/', this._id], {relativeTo: this.route});
  }

  update() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (this.validateForm.controls[i].status === 'INVALID') {
        return;
      }
    }
    this._isSpinning = true;
    this._orderService.putOrder(this._id, this.validateForm.getRawValue()).subscribe((res) => {
      this._isSpinning = false;
      if (res['code'] === 0) {
        // this.router.navigate(['../pay/', this._id], {relativeTo: this.route});
        this._notification.create('success', '操作成功', '修改成功');
      } else {
        this._notification.create('error', '操作失败', res['msg']);
      }
    }, (err => {
      this._isSpinning = false;
      this._notification.create('error', '网络错误', err.toString());
    }));
  }

  add() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (this.validateForm.controls[i].status === 'INVALID') {
        return;
      }
    }
    this._isSpinning = true;
    this._orderService.addOrder(this.validateForm.getRawValue()).subscribe((res) => {
      this._isSpinning = false;
      if (res['code'] === 0) {
        this.router.navigate(['../pay/', res['data'].id], {relativeTo: this.route});
      } else {
        this._notification.create('error', '操作失败', res['msg']);
      }

    }, (err => {
      this._isSpinning = false;
      this._notification.create('error', '网络错误', err.toString());
    }));
  }

}
