import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.component';
import { LayoutsModule } from '@layouts/layouts.module';
import { DashboardPage } from './dashboard/dashboard.page';

@NgModule({
  declarations: [HomePage, DashboardPage],
  imports: [CommonModule, LayoutsModule],
  exports: [HomePage, DashboardPage],
})
export class PagesModule {}
