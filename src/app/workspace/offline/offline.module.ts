import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OfflineRoutingModule} from './offline-routing.module';
import {OrderComponent} from './order/order.component';
import {NgZorroAntdModule} from 'ng-zorro-antd/src/release/ng-zorro-antd.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SettingComponent} from './setting/setting.component';
import {OfflineComponent} from './offline.component';
import {SettingService} from './services/setting.service';
import {PayComponent} from './order/pay/pay.component';
import {ModifyComponent} from './order/modify/modify.component';
import {OrderService} from './services/order.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    OfflineRoutingModule
  ],
  declarations: [
    OrderComponent,
    SettingComponent,
    OfflineComponent,
    PayComponent,
    ModifyComponent,
  ],
  providers: [SettingService, OrderService]
})
export class OfflineModule {
}
