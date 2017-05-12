import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductsResolver implements Resolve<IProduct[]> {

    constructor(private productService: ProductService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<IProduct[]> {

        return this.productService.getProducts()
            .map(products => {
                if (products) {
                    return products;
                }
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}
