import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebSocketService} from '../../../../services/web-socket.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  _id: number = -1;

  _sacnState = false;

  _haserror = false;

  _errmsg = '';

  _successMsg = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _webSocketService: WebSocketService) {
    const _id = this.route.snapshot.params['id'];
    this._id = parseInt(_id, 10) || -1;
    if (this._id < 0) {
      this._haserror = true;
      this._errmsg = '单据不存在！';
    }
  }

  bodyStyle = {padding: 0};

  ngOnInit() {
    this._webSocketService.connect('ws://' + window.location.host + '/v1/offline/ws',
      (res) => {
        this._webSocketService.send({action: 1, msg: '' + this._id});
      }, (res) => {
        const data = JSON.parse(res.data);
        if (data.code == 0) {
          const order = data.data;
          this._successMsg = `单据【${order.orderno}】付出成功,付款金额为：${order.amt}`;
          this._sacnState = true;
          setTimeout(() => {
            this.router.navigate(['../../'], {relativeTo: this.route});
          }, 3000);
        } else {
          this._haserror = true;
          this._errmsg = data.msg;
          setTimeout(() => {
            this.router.navigate(['../../'], {relativeTo: this.route});
          }, 3000);
        }
      }, (res) => {
        this._haserror = true;
        this._errmsg = '服务器已经断开链接！';
        setTimeout(() => {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }, 3000);
      }, (err) => {
        this._haserror = true;
        this._errmsg = '服务器连接错误！';
        setTimeout(() => {
          this.router.navigate(['../../'], {relativeTo: this.route});
        }, 3000);
      });
  }

}
