import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

import { Order } from  './../../models/order.model';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  private subscriptionAdmin: Subscription;
  public currentAdmin: string = '';

  public allOrders: Order[];

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) {
    this.subscriptionAdmin = this.authService.currentAdmin.subscribe(currentAdmin => {
      this.currentAdmin = currentAdmin;

      if(!this.currentAdmin){
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    this.apiService.getOrders().subscribe( (orders: Order[]) => {
      this.allOrders = orders;
      this.allOrders.sort(function(a, b) {
        let dateA = new Date(a.created);
        let dateB = new Date(b.created);
        return +dateB - +dateA;
      });
    });
  }

  ngOnDestroy(){
    this.subscriptionAdmin.unsubscribe();
  }

  deleteOrder(orderId: number){
    this.apiService.deleteOrder(orderId).subscribe( (response: any) => {
      this.apiService.getOrders().subscribe( (orders: Order[]) => {
        this.allOrders = orders;
        this.allOrders.sort(function(a, b) {
          let dateA = new Date(a.created);
          let dateB = new Date(b.created);
          return +dateB - +dateA;
        });
      });
    });
  }


}
