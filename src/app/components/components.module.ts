import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlsModule } from '@controls/controls.module';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ControlsModule, DirectivesModule, PipesModule],
  exports: [ControlsModule, DirectivesModule, PipesModule],
})
export class ComponentsModule {}
