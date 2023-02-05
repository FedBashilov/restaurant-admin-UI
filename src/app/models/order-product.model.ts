export class OrderProduct {
  public id: number = 0;
  public name: string = '';
  public amount: number = 0;

  constructor(id: number, name: any, amount: number){
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}
