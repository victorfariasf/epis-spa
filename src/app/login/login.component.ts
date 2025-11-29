import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  public loginForm = new FormGroup({
    login: new FormControl("",[Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {

  }

  entrar(){
    const login = {
      "login": this.loginForm.get('login')?.value,
      "password": this.loginForm.get('password')?.value
    };
    console.log(login);
    this.router.navigateByUrl("/main");
  }

  esqueciSenha(){
    //this.router.navigateByUrl("/auth/esqueci-senha");
  }

  registrarConta(){
    this.router.navigateByUrl("/auth/register");
  }
}
