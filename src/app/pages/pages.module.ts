import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.component';
import { LayoutsModule } from '@layouts/layouts.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, LayoutsModule],
  exports: [HomePage],
})
export class PagesModule {}
