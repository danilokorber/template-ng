import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { FirstLayout } from './first/first.layout';

@NgModule({
  declarations: [
    FirstLayout
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [ComponentsModule],
})
export class LayoutsModule {}
