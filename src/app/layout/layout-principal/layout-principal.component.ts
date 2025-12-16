import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { AuthService } from 'src/app/services/auth.service';
import { aU } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-layout-principal',
  templateUrl: './layout-principal.component.html',
  styleUrls: ['./layout-principal.component.css']
})
export class LayoutPrincipalComponent implements OnInit {

  public highContrast: boolean = false;
  public isMenuCollapsed = true;
  constructor(private renderer: Renderer2, private el: ElementRef, private modalService: NgbModal, private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleContrast(state: boolean) {
    this.highContrast = state;
    if (state) {
       document.body.classList.add('high-contrast');
      this.renderer.addClass(this.el.nativeElement, 'high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
      this.renderer.removeClass(this.el.nativeElement, 'high-contrast');
    }
    localStorage.setItem('highContrast', String(state));
  }

  ativarAltoContraste(event: any){
    if (event.target.checked) {
       document.body.classList.add('high-contrast');
      this.renderer.addClass(this.el.nativeElement, 'high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
      this.renderer.removeClass(this.el.nativeElement, 'high-contrast');
    }
    localStorage.setItem('highContrast', String(event.target.checked));
  }

  abrirEditarUsuario(){
    let usuarioTeste = {
      "nome": localStorage.getItem("usuario"),
      "email": localStorage.getItem("email"),
      "senha": localStorage.getItem("senha")
    }
    const modalRef = this.modalService.open(EditarPerfilComponent);
    modalRef.componentInstance.usuarioDados = usuarioTeste;
    modalRef.result.then((values) => {
      usuarioTeste = values;
    })
  }

  logout(){
    this.auth.logout();
  }
}
