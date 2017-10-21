import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkspaceComponent} from './workspace.component';
import {WorkspaceRoutingModule} from './workspace-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd/src/release/ng-zorro-antd.module';
import {UserService} from '../services/user.service';
import {DefaultComponent} from './default/default.component';
import {PwdComponent} from './user/pwd/pwd.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    ReactiveFormsModule,
    WorkspaceRoutingModule,
  ],
  declarations: [WorkspaceComponent, DefaultComponent, PwdComponent],
  providers: [UserService]
})
export class WorkspaceModule {
}
