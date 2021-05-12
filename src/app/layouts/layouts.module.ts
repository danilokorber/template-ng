import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { AdminLayout } from './admin/admin.layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminLayout],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [ComponentsModule, AdminLayout],
})
export class LayoutsModule {}
