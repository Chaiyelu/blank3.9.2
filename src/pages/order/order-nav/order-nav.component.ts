import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderState } from '../../../shared/models/order.model'

@Component({
	selector: 'order-nav',
	templateUrl: 'order-nav.component.html'
})

export class OrderNavComponent implements OnInit {
	@Output() directTo = new EventEmitter<OrderState>();
	controls: any[];

	constructor() {
		this.controls = [
			{ type: OrderState.waitPay, label: '待付款', iconColor: 'primary', iconName: 'card', num: null },
			{ type: OrderState.waitUse, label: '待使用', iconColor: 'danger', iconName: 'youhuijuan1', num: null },
			{ type: OrderState.waitRate, label: '待评价', iconColor: 'secondary', iconName: 'comment-processing', num: null },
			{ type: OrderState.other, label: '退款/售后', iconColor: 'pink', iconName: 'refund', num: null }
		];
	}

	ngOnInit() { }

	direct(state: OrderState) {
		this.directTo.emit(state);
	}

}