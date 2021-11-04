import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';



@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  exports: [MainLayoutComponent]
})
export class LayoutModule { }
