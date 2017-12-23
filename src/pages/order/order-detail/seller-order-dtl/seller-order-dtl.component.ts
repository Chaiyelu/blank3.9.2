import { Component, OnInit } from '@angular/core';
import { NavParams } from "ionic-angular";
import { OrderDetailService } from "../order-detail.service";

@Component({
	selector: 'seller-order-dtl',
	templateUrl: 'seller-order-dtl.component.html'
})

export class SellerOrderDtlComponent implements OnInit {

	orderDtl: any;
	constructor(
		public navParams: NavParams,
		public orderDetailService: OrderDetailService
	) { }

	ngOnInit() {
		this.orderDetailService.getSellerOrderDtl(1).subscribe(
			orderDtl => {
				this.orderDtl = orderDtl.data;
				console.log(orderDtl);
			}
		)
	}
}