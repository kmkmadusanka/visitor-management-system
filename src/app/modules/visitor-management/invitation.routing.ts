import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 /**
 * import component
 */
  import { HostComponent } from './hosts/hosts.component';
  import { StatisticsComponent } from './stastics/stastic.component';
  import { InvitationComponent } from './invitation/invitation.component';
  import { DailyActivityComponent } from './daily-activity/daily-activity.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InvitationComponent,
      },
      {
        path: 'daily-activity',
        component: DailyActivityComponent,
      },
      {
        path: 'hosts',
        component: HostComponent,
      },
      {
        path: 'statics',
        component: StatisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule],
})
export class VisitorHomeRoutingModule {}
