import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarOptions, DatesSetArg, DayHeaderContentArg } from '@fullcalendar/core';




const ptBrCustom = {
  code: 'pt-br-custom',
  week: {
    dow: 1, // semana começa na segunda-feira
    doy: 4
  },
  buttonText: {
    prev: 'Anterior',
    next: 'Próximo',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia'
  },
  weekText: 'Sm',
  allDayText: 'Dia todo',
  moreLinkText: 'mais',
  noEventsText: 'Não há eventos',
  // Aqui você pode sobrescrever manualmente os nomes dos meses e dias
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
               'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // Tipando como 'any' para evitar erro
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
      buttonText: {       // redefine os textos dos botões
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    prev: 'Anterior',
    next: 'Próximo'
  },
    locale: ptBrLocale,  // ✅ aqui só passar a string
    events: [
      { title: 'aula de aps', date: '2025-11-11' },
      { title: 'aula de talf', date: '2025-11-11' },
      { title: 'Evento 1', date: '2025-12-05' },
      { title: 'Evento 2', date: '2025-12-10' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    dayHeaderContent: (args: DayHeaderContentArg) => {
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const diaSemana = dias[args.date.getDay()];
  const numeroDia = args.date.getDate();

  // args.view.type -> identifica a view atual: 'dayGridMonth', 'timeGridWeek', 'timeGridDay', etc
  if (args.view.type === 'dayGridMonth') {
    // modo mensal: apenas abreviado do dia
    return diaSemana;
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
}

