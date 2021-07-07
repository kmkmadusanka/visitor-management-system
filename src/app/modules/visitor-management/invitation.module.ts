import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { VisitorHomeRoutingModule } from './invitation.routing';
import {MatFormFieldModule} from '@angular/material/form-field';

/**
 * Services
 */
 import { InvitationService } from './invitation.service';

 /**
 * import component
 */
  import { InvitationComponent } from './invitation/invitation.component';
  import { DailyActivityComponent } from './daily-activity/daily-activity.component';
  import { HostComponent } from './hosts/hosts.component';
  import { StatisticsComponent } from './stastics/stastic.component';

@NgModule({
  declarations: [
    HostComponent,
    StatisticsComponent,
    InvitationComponent,
    DailyActivityComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    MatFormFieldModule,
    VisitorHomeRoutingModule
  ],
  providers: [InvitationService],
})
export class VisitorHomeModule { }
