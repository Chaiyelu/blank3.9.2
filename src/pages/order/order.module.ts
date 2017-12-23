import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from "../../shared/shared.module";

import { OrderDetailModule } from "./order-detail/order-detail.module";

import { OrderPageComponent } from "./order-page/order-page.component";
import { OrderNavComponent } from "./order-nav/order-nav.component";

import { OrderService } from "./order.service";

@NgModule({
  declarations: [
    OrderNavComponent,
    OrderPageComponent
  ],
  imports: [
    IonicModule,
    SharedModule,
    OrderDetailModule
  ],
  entryComponents: [
    OrderNavComponent,
    OrderPageComponent
  ],
  exports: [
    OrderNavComponent,
    OrderDetailModule
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
