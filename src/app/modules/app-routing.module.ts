import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from '@pages/pages.module';
import { HomePage } from '@pages/home/home.component';
import { AdminLayout } from '@layouts/admin/admin.layout';
import { DashboardPage } from '@pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminLayout,
        children: [
          { path: '', redirectTo: 'Home', pathMatch: 'full' },
          { path: 'Dashboard', component: DashboardPage, pathMatch: 'full' },
        ],
      },
      { path: 'Home', component: HomePage },
    ],
  },
  { path: '**', redirectTo: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesModule],
  exports: [RouterModule, PagesModule],
})
export class AppRoutingModule {}
