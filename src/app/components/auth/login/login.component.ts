import { Component, OnInit } from '@angular/core';

import  { FormGroup,FormBuilder,Validators} from "@angular/forms";

import { AuthenticationService } from '@services/authentication/authentication.service';

import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
              './responsive.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitedForm = false;

  public error = false;
  public msgError = '';
  

  constructor(private _builderForm:FormBuilder,private _auth:AuthenticationService,private _router:Router) { 
    this.loginForm = this._builderForm.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {  }


  onSubmitLogin(){

    this.submitedForm = true;
    if(this.loginForm.invalid){
      return;
    }
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this._auth.auth(email,password).subscribe(() =>{ 

     },

    error =>{
      this.error = true;
      this.msgError = error;
    })


  }

}
