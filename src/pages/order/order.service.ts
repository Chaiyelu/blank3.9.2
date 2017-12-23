import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SITE_HOST_URL } from "../../shared/config/env.config";
import { OrderQueryParams } from "../../shared/models/order.model";

@Injectable()
export class OrderService {
    constructor(private authHttp: AuthHttp) { }
    getOrders(queryParams:OrderQueryParams) {
        let params = new URLSearchParams();
        for (var key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                params.append(key, queryParams[key]);
            }
        }

        return this.authHttp.get(`${SITE_HOST_URL}orders`, { search: params })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}