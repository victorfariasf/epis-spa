import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarOptions, DatesSetArg, DayHeaderContentArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';


interface AppEvent extends EventInput {
  // title?: string; start?: string | Date; end?: string | Date; color?: string; etc.
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  showModal = false;
  showViewModal = false;
  editVisible = false;
  selectedEvent: any = null;

  // dados do novo evento
  newEvent: {
    title: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
  } = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    };

ngAfterViewInit() {
  setTimeout(() => this.loadUserEvents(), 0);
}

  compareDates(d1: Date | string | null, d2: Date | string | null): boolean {
    if (!d1 || !d2) return false;

    const date1 = new Date(d1);
    const date2 = new Date(d2);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  highContrast = false;

  constructor( 
  private el: ElementRef,
  private renderer: Renderer2,
  private http: HttpClient) { }

  ngOnInit() {
    // Lê o estado salvo no navegador
    console.log('CalendarComponent ngOnInit');
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      this.highContrast = true;
      this.renderer.addClass(document.body, 'high-contrast');
      this.renderer.addClass(this.el.nativeElement, 'high-contrast');
    }
  }

  ngOnChanges(){
    
  }
  loadUserEvents() {
  const usuarioRaw = localStorage.getItem('usuarioLogado');
  if (!usuarioRaw) return;

  const usuario = JSON.parse(usuarioRaw);
  const userId = usuario.id;
  if (!userId) return;

  this.http.get<any[]>(`http://localhost:3000/api/eventos/`).subscribe({
    next: (eventos) => {
      console.log('Eventos recebidos da API:', eventos);

      

      const formattedEvents: EventInput[] = eventos.map(e => ({
        id: String(e.id),
        title: e.titulo,
        start: this.formatDate(e.dataInicio),
        end: this.formatDate(e.dataFim),
        allDay: false
      }));

      // Atualiza o array usado pelo Angular
      this.eventsArray = formattedEvents;
    },
    error: (err) => console.error('Erro ao carregar eventos', err)
  });
}
  private formatDate(data: string | null): string | undefined {
    console.log(data)
  if (!data) return undefined;
  return new Date(data.replace(' ', 'T')).toISOString();
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
  eventsArray: EventInput[] = [];


  // Tipando como 'any' para evitar erro
  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    buttonText: {       // redefine os textos dos botões
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      prev: 'Anterior',
      next: 'Próximo'
    },
    locale: ptBrLocale,
    allDaySlot: false,
    // intervalo de horários exibidos
    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',
    // tamanho dos blocos de hora
    slotDuration: '01:00:00',
    // 👉 FORMATO DA HORA PERSONALIZADO
    slotLabelContent: (arg: any) => {
      const hora = arg.date.getHours();
      const minutos = arg.date.getMinutes().toString().padStart(2, '0');
      return `${hora}h:${minutos}`;
    },

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    views: {
      dayGridMonth: {
        firstDay: 0 // domingo
      },
      timeGridWeek: {
        firstDay: 1 // segunda-feira
      },
      timeGridDay: {
        firstDay: 1 // segunda-feira
      }
    },
    dayHeaderContent: (args: DayHeaderContentArg) => {
      const diasMes = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const diaSemana = dias[args.date.getDay()];
      const diaMes = diasMes[args.date.getDay()];
      const numeroDia = args.date.getDate();

      // args.view.type -> identifica a view atual: 'dayGridMonth', 'timeGridWeek', 'timeGridDay', etc
      if (args.view.type === 'dayGridMonth') {
        // modo mensal: apenas abreviado do dia
        return diaMes;
      } else {
        // modo semanal ou diário: dia + número
        return {
          html: `
        <div style="text-align:center; margin:0; line-height:1;">
          <span style="display:block; font-size:1rem; margin:0;">${diaSemana}</span>
          <span style="display:block; font-size:2rem; font-weight:bold; margin:0;">${numeroDia}</span>
        </div>
      `};
      }
    },
    titleFormat: {
      year: 'numeric',
      month: 'long'
    },
    datesSet: (arg: DatesSetArg) => {
      const header = document.querySelector('.fc-toolbar-title');
      if (header) {
        const monthNames = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const date = arg.view.currentStart; // agora pega corretamente o mês da view
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        header.textContent = `${month} de ${year}`; // sobrescreve corretamente
      }
    }, eventClick: (arg: any) => {
      this.selectedEvent = {
        title: arg.event.title,
         id: arg.event.id,
        start: arg.event.start,
        end: arg.event.end
      };
      this.showViewModal = true; // agora ele abre o EventViewComponent
    }



  };

  addEvent() {
    const api = this.fullcalendar.getApi();
    api.addEvent({ title: 'Novo', start: new Date(), end: new Date(Date.now() + 3600_000) });
    // ou também: this.eventsArray.push({...}); Angular atualizará o calendário automaticamente
  }
  openModal() {
    this.showModal = true;
    this.newEvent = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    };
  }
  openEditModal(event: any) {
    this.showViewModal = false;   // fecha modal de visualização
    this.editVisible = true;      // abre modal de edição

    // Preenche os campos do formulário com os dados do evento
    this.newEvent = {
      title: event.title,
      startDate: event.start ? event.start.toISOString().substring(0, 10) : '',
      endDate: event.end ? event.end.toISOString().substring(0, 10) : '',
      startTime: event.start ? event.start.toTimeString().substring(0, 5) : '',
      endTime: event.end ? event.end.toTimeString().substring(0, 5) : ''
    };
  }

  closeModal() {
    this.showModal = false;
  }

  saveEvent() {
  if (!this.newEvent.title || !this.newEvent.startDate || !this.newEvent.startTime) {
    alert('Preencha ao menos título, data e hora de início.');
    return;
  }

  // 🔐 pega usuário do localStorage
  const usuarioRaw = localStorage.getItem('usuarioLogado');
  if (!usuarioRaw) {
    alert('Usuário não logado');
    return;
  }

  const usuario = JSON.parse(usuarioRaw);
  const usuarioId = usuario.id;

  // 🕒 monta data/hora início
  const dataInicio = `${this.newEvent.startDate} ${this.newEvent.startTime}:00`;

  // 🕒 monta data/hora fim
  let dataFim: string | null = null;
  if (this.newEvent.endDate && this.newEvent.endTime) {
    dataFim = `${this.newEvent.endDate} ${this.newEvent.endTime}:00`;
  }

  // 📦 body da requisição
  const body = {
    titulo: this.newEvent.title,
    dataInicio,
    dataFim,
    usuarioId
  };

  console.log('Enviando evento:', body);

  // 🚀 POST para API
  this.http.post('http://localhost:3000/api/eventos', body).subscribe({
    next: () => {
      // 🔄 recarrega eventos do usuário
      this.loadUserEvents();

      // 🧹 fecha modal e limpa formulário
      this.closeModal();
    },
    error: (err) => {
      console.error('Erro ao salvar evento', err);
      alert('Erro ao salvar evento');
    }
  });
}
deleteEvent(eventId: number) {
  const usuarioRaw = localStorage.getItem('usuarioLogado');
  if (!usuarioRaw) {
    alert('Usuário não logado');
    return;
  }

  const usuario = JSON.parse(usuarioRaw);
  const usuarioId = usuario.id;

  this.http.delete(
    `http://localhost:3000/api/eventos/${eventId}`,
    {
      body: { usuarioId }   // 👈 IMPORTANTE
    }
  ).subscribe({
    next: () => {
      // remove do FullCalendar
      const api = this.fullcalendar.getApi();
      const event = api.getEventById(String(eventId));
      if (event) event.remove();

      // remove do array do Angular
      this.eventsArray = this.eventsArray.filter(
        e => e.id !== String(eventId)
      );

      this.showViewModal = false;
    },
    error: (err) => {
      console.error('Erro ao excluir evento', err);
      alert(err.error?.error || 'Erro ao excluir evento');
    }
  });
}

}

