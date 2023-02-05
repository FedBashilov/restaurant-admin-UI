import {OrderProduct} from "./order-product.model";

export class Order{
  public id: number = 0;
  public address: string = '';
  public email: string = '';
  public viewed: boolean = false;
  public bought: boolean = false;
  public created: Date = new Date;
  public client_first_name: string = '';
  public phone: string = '';
  public total_price: number = 0;
  public products: OrderProduct[] = [];
}
