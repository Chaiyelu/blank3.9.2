import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SellerOrderDtlComponent } from "./seller-order-dtl/seller-order-dtl.component";

import { OrderDetailService } from "./order-detail.service";

@NgModule({
    declarations: [SellerOrderDtlComponent],
    imports: [ 
        IonicModule
    ],
    entryComponents: [
        SellerOrderDtlComponent
    ],
    exports: [SellerOrderDtlComponent],
    providers: [OrderDetailService],
})
export class OrderDetailModule {}