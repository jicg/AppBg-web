import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {OrderService} from '../services/order.service';
import {NzNotificationService} from 'ng-zorro-antd/src/release/notification/nz-notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/src/release/modal/nz-modal.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  validateForm: FormGroup;
  controlArray = [];


  _loading = false;
  _dataSet = [];
  _current = 1;
  _total = 20;
  _pageSize = 5;


  resetForm() {
    this.validateForm.reset({
      orderno: '',
      optname: '',
      datebeg: '',
      dateend: '',
      sttype: '0',
      product: '',
      status: '0'
    });
  }

  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              private _notification: NzNotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmServ: NzModalService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      orderno: [''],
      optname: [''],
      datebeg: [''],
      dateend: [''],
      sttype: ['0'],
      product: [''],
      status: ['0']
    });
    this.controlArray.push({id: 'orderno', type: 'text', name: '单据编号', show: true});
    this.controlArray.push({id: 'optname', type: 'text', name: '员工', show: true});
    this.controlArray.push({
      id: 'sttype', type: 'select', name: '出货点', show: true, items: [
        {name: '门店', value: '2'}, {name: '公司', value: '1'}, {name: '全部', value: '0'}
      ]
    });
    this.controlArray.push({id: 'datebeg', type: 'date', name: '开始日期', show: true});
    this.controlArray.push({id: 'dateend', type: 'date', name: '结束日期', show: true});
    this.controlArray.push({id: 'product', type: 'text', name: '商品描述', show: true});
    this.controlArray.push({
      id: 'status', type: 'select', name: '订单状态', show: true, items: [
        {name: '未付款', value: '1'}, {name: '已付款', value: '2'}, {name: '全部', value: '0'}
      ]
    });

    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    const data = this.validateForm.getRawValue();
    if (data['dateend']) {
      data['dateend'] = data['dateend'].pattern('yyyyMMdd');
    }
    if (data['datebeg']) {
      data['datebeg'] = data['datebeg'].pattern('yyyyMMdd');
    }
    this.orderService.getOrders(this._current, this._pageSize, data).subscribe((res) => {
      this._loading = false;
      if (res['code'] === 0) {
        this._dataSet = res['data'].data;
        this._total = res['data'].total;
      } else {
        this._notification.create('error', '操作失败', res['msg']);
      }
    }, (err) => {
      this._loading = false;
      this._notification.create('error', '系统异常', err.toLocaleString());
    });

  }

  loadXls() {
    const data = this.validateForm.getRawValue();
    if (data['dateend']) {
      data['dateend'] = data['dateend'].pattern('yyyyMMdd');
    }
    if (data['datebeg']) {
      data['datebeg'] = data['datebeg'].pattern('yyyyMMdd');
    }
    let param = '?';
    for (const key in data) {
      param += key + '=' + data[key] + '&';
    }
    window.open('/v1/offline/xls/order' + param);
  }

  add() {
    this.router.navigate(['../order', -1], {relativeTo: this.route});
  }

  del(data) {
    const self = this;
    this.confirmServ.confirm({
      title: '是否删除？',
      content: `<b>单据【${data.orderno}】删除后，将无法修复，是否确认删除？</b>`,
      onOk() {
        self.del_doit(data);
      },
      onCancel() {
      }
    });
  }

  private del_doit(data) {
    this._loading = true;
    this.orderService.delOrder(data.id).subscribe((res) => {
      this._loading = false;
      if (res['code'] === 0) {
        this.refreshData();
      } else {
        this._notification.create('error', '操作失败', res['msg']);
      }
    }, (err) => {
      this._loading = false;
      this._notification.create('error', '系统异常', err.toLocaleString());
    });
  }
}
