import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginErrorMessage: string = "";

  private subscriptionAdmin: Subscription;
  public currentAdmin: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.subscriptionAdmin = this.authService.currentAdmin.subscribe(currentAdmin => {
      this.currentAdmin = currentAdmin;
      if(this.currentAdmin){
        this.router.navigate(['/orders']);
      }
    });

  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(){
    this.subscriptionAdmin.unsubscribe();
  }

  initForm(){
    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required
      ]
    ],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
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
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe( (response: any) =>{
      if(response.jwt){
        this.authService.setJWT(response.jwt);

        this.loginErrorMessage = "";
      } else {
        this.loginErrorMessage = response;
      }

    });
  }


}
