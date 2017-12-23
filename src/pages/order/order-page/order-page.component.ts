import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { OrderService } from "../order.service";
import { OrderQueryParams, OrderState } from "../../../shared/models/order.model";

import { SellerOrderDtlComponent } from "../order-detail/seller-order-dtl/seller-order-dtl.component";

@Component({
	selector: 'order-page',
	templateUrl: 'order-page.component.html'
})

export class OrderPageComponent implements OnInit {
	state: OrderState;
	controls: any[];
	orders: any[];
	queryParams: OrderQueryParams = <OrderQueryParams>{};
	loading: boolean;
	constructor(
		public navParams: NavParams,
		public navCtrl: NavController,
		public orderService: OrderService
	) {
		this.controls = [
			{ type: OrderState.all, label: '全部' },
			{ type: OrderState.waitPay, label: '待付款' },
			{ type: OrderState.waitUse, label: '待使用' },
			{ type: OrderState.waitRate, label: '待评价' },
			{ type: OrderState.other, label: '退款/售后' }
		];
		this.state = this.navParams.get('state');
	}

	ngOnInit() {
		this.loadDataByState();
	}

	goToDtl(merchantType, merchantId) {
		console.log(merchantType);
		switch (merchantType) {
			case 'seller':
				this.navCtrl.push(SellerOrderDtlComponent, merchantId);
				break;
		}

	}

	doRefresh(refresher) {
		console.log('Begin async operation', refresher);

		setTimeout(() => {
			console.log('Async operation has ended');
			refresher.complete();
		}, 2000);
	}

	loadDataByState() {
		console.log(this.state);
		this.loading = true;
		this.queryParams.page = 1;
		this.queryParams.orderStatus = this.state == 0 ? null : this.state;
		this.orderService.getOrders(this.queryParams).subscribe(
			orders => {
				this.loading = false;
				this.orders = orders.data.rows;
				console.log(orders);
			}
		);
	}
}