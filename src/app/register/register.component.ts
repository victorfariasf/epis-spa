import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    nome: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required)
  });

  constructor(private register: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  fazerRegistro(){
    const registerPayload = {
      "nome": this.registerForm.get('nome')?.value.toString(),
      "email": this.registerForm.get('email')?.value.toString(),
      "senha": this.registerForm.get('senha')?.value.toString()
    }

    console.log(registerPayload);

    this.register.register(registerPayload).subscribe({
      next: (rsp) => {
        console.log("Registro feito com sucesso");
        this.router.navigateByUrl("/auth/login");
      },
      error: (err) => {
        console.log("Erro ao concluir registro");
        console.log(err);
      }
    }
    )
  }


}
