import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from "rxjs";

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Product } from  './../../models/product.model';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  private subscriptionAdmin: Subscription;
  public currentAdmin: string = '';

  public product: Product = new Product;

  productForm: FormGroup;

  constructor(private authService: AuthService, public apiService: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.subscriptionAdmin = this.authService.currentAdmin.subscribe(currentAdmin => {
      this.currentAdmin = currentAdmin;

      if(!this.currentAdmin){
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.apiService.getProductById(this.route.snapshot.params['id']).subscribe( (product: Product) => {
        this.product = product;
        this.initForm();
      });
    }
    this.initForm();
  }

  ngOnDestroy(){
    this.subscriptionAdmin.unsubscribe();
  }

  initForm(){
    this.productForm = this.fb.group({
      name: [this.product.name, [
        Validators.required
      ]
    ],
      description: [this.product.description, [
        Validators.required
      ]
    ],
      price: [this.product.price, [
        Validators.required
      ]
    ],
      photo: ['', [
      ]
    ],
    });
  }


    isControlInvalid(controlName: string, form: FormGroup): boolean {
      const control = form.controls[controlName];
      const result = control.invalid && control.touched;
      return result;
    }

    onSubmit() {
      const controls = this.productForm.controls;
      if (this.productForm.invalid) {
        Object.keys(controls)
         .forEach(controlName => controls[controlName].markAsTouched());
        return;
      }

      let newProduct: Product = new Product;

      newProduct.id = this.product.id;
      newProduct.name = this.productForm.value.name;
      newProduct.description = this.productForm.value.description;
      newProduct.price = this.productForm.value.price;
      newProduct.photo = this.productForm.value.photo;

      console.log(newProduct);

      if(this.route.snapshot.params['id']) {
        this.apiService.updateProduct(newProduct).subscribe( (response: any) =>{
          this.apiService.getProductById(this.route.snapshot.params['id']).subscribe( (product: Product) => {
            this.product = product;
            this.initForm();
          });
        });
      }
      else{
        this.apiService.postProduct(newProduct).subscribe( (response: any) =>{
          this.router.navigate(['/products/'+response]);
        });
      }

    }

    onFileChange(event: any) {
      let reader = new FileReader();

      if(event.target.files && event.target.files.length) {
        const [photo] = event.target.files;
        reader.readAsDataURL(photo);

        reader.onload = () => {
          this.productForm.patchValue({
            photo: reader.result
          });

        };
      }
    }

}
