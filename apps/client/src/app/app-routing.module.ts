import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile',
    data: { title: 'Profile' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'projects',
    data: { title: 'Projects' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'error',
    data: { title: 'Error' },
    loadChildren: () =>
      import('./pages/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
