import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  public loginForm = new FormGroup({
    login: new FormControl("",[Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
  }


  envioDoForm(){

  }

  esqueciSenha(){
    
  }
}
