import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkspaceComponent} from './workspace.component';
import {DefaultComponent} from './default/default.component';
import {PwdComponent} from './user/pwd/pwd.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: DefaultComponent
      },
      {
        path: 'offline',
        loadChildren: './offline/offline.module#OfflineModule'
      },
      {
        path: 'user/pwdchange',
        component: PwdComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule {

}
