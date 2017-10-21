import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OfflineComponent} from './offline.component';
import {OrderComponent} from './order/order.component';
import {SettingComponent} from './setting/setting.component';
import {ModifyComponent} from './order/modify/modify.component';
import {PayComponent} from './order/pay/pay.component';

const routes: Routes = [
  {
    path: '',
    component: OfflineComponent,
    children: [
      {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full',
      },
      {
        path: 'order',
        component: OrderComponent
      }, {
        path: 'order/:id',
        component: ModifyComponent
      }, {
        path: 'order/pay/:id',
        component: PayComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineRoutingModule {
}
