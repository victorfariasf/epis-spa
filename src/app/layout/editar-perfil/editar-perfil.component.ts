import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  @Input() usuarioDados: any

  public usuarioFormulario = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
  });

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.usuarioDados){
      this.usuarioFormulario.get('nome')?.setValue(this.usuarioDados.nome);
      this.usuarioFormulario.get('email')?.setValue(this.usuarioDados.email);
    }
  }

  usuarioEditado(){
    return this.usuarioFormulario.get('nome')?.value === this.usuarioDados.nome && this.usuarioFormulario.get('email')?.value === this.usuarioDados.email
  }

  atualizarDados(){
    const payload = {
      "nome": this.usuarioFormulario.get('nome')?.value,
      "email": this.usuarioFormulario.get('email')?.value
    }
    this.modal.close(payload);
  }

}
