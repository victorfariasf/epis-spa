import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarOptions, DatesSetArg, DayHeaderContentArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

interface AppEvent extends EventInput {
  // title?: string; start?: string | Date; end?: string | Date; color?: string; etc.
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
   @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

    showModal = false;

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

  highContrast = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
    // Lê o estado salvo no navegador
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      this.highContrast = true;
      this.renderer.addClass(document.body, 'high-contrast');
      this.renderer.addClass(this.el.nativeElement, 'high-contrast');
    }
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
   eventsArray: EventInput[] = [
    { title: 'Aula de APS', start: '2025-11-27T08:00:00', end: '2025-11-27T12:00:00' },
    { title: 'Evento rápido', start: '2025-12-05T09:30:00' }, // sem end = duração padrão (depende)
    { title: 'Dia inteiro', start: '2025-12-10', allDay: true } // all-day
  ];
  

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
    const diasMes = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb','Dom'];
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
      return { html: `
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

  closeModal() {
      this.showModal = false;
    }

   saveEvent() {
    if (!this.newEvent.title || !this.newEvent.startDate || !this.newEvent.startTime) {
      alert('Preencha ao menos título, data e hora de início.');
      return;
    }

    // Se não houver data final, assume apenas o dia de início
    const startDate = new Date(this.newEvent.startDate);
    const endDate = this.newEvent.endDate ? new Date(this.newEvent.endDate) : startDate;

    // Array para guardar os eventos
    const eventsToAdd: EventInput[] = [];

    // Loop de cada dia
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      // Formata o dia atual
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');

      console.log("yy"+yyyy+"mm"+ mm +"dd"+dd)

      // Combina com as horas fornecidas
      const start = `${yyyy}-${mm}-${dd}T${this.newEvent.startTime}`;
      const end = this.newEvent.endTime ? `${yyyy}-${mm}-${dd}T${this.newEvent.endTime}` : undefined;

      eventsToAdd.push({
        title: this.newEvent.title,
        start: start,
        end: end
      });
    }

    // Adiciona todos os eventos no array e no calendário
    this.eventsArray.push(...eventsToAdd);

    const api = this.fullcalendar.getApi();
    eventsToAdd.forEach(ev => api.addEvent(ev));

    this.closeModal();
  }
}

