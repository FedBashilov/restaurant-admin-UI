import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from "rxjs";

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Order } from  './../../models/order.model';
import { Product } from  './../../models/product.model';
import { OrderProduct } from  './../../models/order-product.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  private subscriptionAdmin: Subscription;
  public currentAdmin: string = '';

  public order: Order = new Order;

  public allProducts: Product[] = [];

  formProducts: any[] = [];

  orderForm: FormGroup;

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.subscriptionAdmin = this.authService.currentAdmin.subscribe(currentAdmin => {
      this.currentAdmin = currentAdmin;

      if(!this.currentAdmin){
        this.router.navigate(['/login']);
      }
    });
  }


    ngOnInit(): void {
      this.apiService.getOrder(this.route.snapshot.params['id']).subscribe( (order: Order) => {
        this.order = order;
        this.formProducts = order.products;
        this.initForm();
      });
      this.apiService.getAllProducts().subscribe( (products: Product[]) => {
        this.allProducts = products;
      });
      this.initForm();
    }

    ngOnDestroy(){
      this.subscriptionAdmin.unsubscribe();
      this.order.viewed = true;
      this.apiService.updateOrder(this.order).subscribe( (response: any) =>{
      });
    }

    initForm(){
      this.orderForm = this.fb.group({
        address: [this.order.address, [
          Validators.required
        ]
      ],
        bought: [this.order.bought, [
        ]
      ]
      });
    }


      isControlInvalid(controlName: string, form: FormGroup): boolean {
        const control = form.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
      }

      onSubmit() {
        const controls = this.orderForm.controls;
        if (this.orderForm.invalid) {
          Object.keys(controls)
           .forEach(controlName => controls[controlName].markAsTouched());
          return;
        }

        let newOrder: Order = new Order;
        newOrder = Object.assign(this.order);

        newOrder.address = this.orderForm.value.address;
        newOrder.bought = this.orderForm.value.bought;
        newOrder.viewed = true;
        newOrder.products = [];

        let formProductsAmounts: any = document.getElementsByClassName("form_product_amount");
        for (let i = 0; i < this.formProducts.length; i++) {
          if(+formProductsAmounts[i].value > 0){
            newOrder.products.push(new OrderProduct(this.formProducts[i].id, this.formProducts[i].name,  +formProductsAmounts[i].value));
          }
        }

        this.apiService.updateOrder(newOrder).subscribe( (response: any) =>{
          this.apiService.getOrder(this.route.snapshot.params['id']).subscribe( (order: Order) => {
            this.order = order;
            this.formProducts = order.products;
            this.initForm();
          });
        });
      }

    amount(formProduct: any){
      let elem = this.order.products.find( (elem) => elem.id == formProduct.id );
      if(elem){
        return elem.amount;
      }
      return null;
    }


    compareObjects(o1: any, o2: any): boolean {
      return o1.name === o2.name && o1.id === o2.id;
    }

}
