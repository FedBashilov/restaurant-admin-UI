import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { AuthService } from "./auth.service";

import { Product } from  './../models/product.model';
import { Order } from  './../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PHP_API_SERVER = "http://localhost";

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/API.php/products`);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/API.php/products/${id}`);
  }

  getProductsBoughtByClient(): Observable<number[]>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<number[]>(`${this.PHP_API_SERVER}/API.php/products/boughtByClient`, {headers: headers});
  }

  postProduct(product: Product): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API.php/products`, {data: product}, {headers: headers} );
  }

  updateProduct(product: Product): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.put<number>(`${this.PHP_API_SERVER}/API.php/products`, {data: product}, {headers: headers} );
  }

  deleteProduct(productId: number): Observable<any>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/API.php/products/${productId}`, {headers: headers});
  }

  getOrder(orderId: number): Observable<Order>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<Order>(`${this.PHP_API_SERVER}/API.php/orders/${orderId}`, {headers: headers});
  }

  getOrders(): Observable<Order[]>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.get<Order[]>(`${this.PHP_API_SERVER}/API.php/orders`, {headers: headers});
  }

  deleteOrder(orderId: number): Observable<any>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.delete<any>(`${this.PHP_API_SERVER}/API.php/orders/${orderId}`, {headers: headers});
  }

  updateOrder(order: Order): Observable<number>{
    let jwt = this.authService.getJWT();
    let headers = new HttpHeaders().set('JWT', `${jwt}`);
    return this.httpClient.put<number>(`${this.PHP_API_SERVER}/API.php/orders`, {data: order}, {headers: headers} );
  }

}
