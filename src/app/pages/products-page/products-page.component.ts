import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

import { Product } from  './../../models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy {

  private subscriptionAdmin: Subscription;
  public currentAdmin: string = '';

  public allProducts: Product[] = [];

  constructor(private authService: AuthService, public apiService: ApiService, private router: Router) {
    this.subscriptionAdmin = this.authService.currentAdmin.subscribe(currentAdmin => {
      this.currentAdmin = currentAdmin;
      if(!this.currentAdmin){
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe( (products: Product[]) => {
      this.allProducts = products;
      this.allProducts.sort( (a, b) => a.id - b.id);
    });
  }

  ngOnDestroy(){
    this.subscriptionAdmin.unsubscribe();
  }

  deleteProduct(productId: number){
    this.apiService.deleteProduct(productId).subscribe( (response: any) => {
      this.apiService.getAllProducts().subscribe( (products: Product[]) => {
        this.allProducts = products;
        this.allProducts.sort( (a, b) => a.id - b.id);
        console.log(this.allProducts);

      });
    });
  }

}
