import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import components
import { LandingComponent } from './landing/landing.component';
import { LandingComponent2 } from './landing02/landing.component';

/* AuthGuard */
import { AuthGuardService } from '../../infrastructure/auth-guard.service';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [AuthGuardService],
        component: LandingComponent,
      },
      {
        path: '2',
        canActivate: [AuthGuardService],
        component: LandingComponent2,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
