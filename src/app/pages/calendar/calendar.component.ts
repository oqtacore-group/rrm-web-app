import { ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy, ViewChild, Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataAccessService } from '../../services';
import { RouterService } from '../../services';
import { CandidateEvent } from '../../models';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { CandidateEventComponent } from '../../components';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil" style="color:white"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
      id: 'edit'
    },
    {
      label: '<i class="fa fa-fw fa-trash" style="color:white"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
      id: 'delete'
    }
  ];
  events: CalendarEvent[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date();
  active: boolean = false;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialog: MatDialog) { }
  onUpdateData() {
    this.dataAccess.getCalendarData().subscribe((result) => {
      for (let i = 0; i < result.eventList.length; i++) {
        let date: Date = new Date(result.eventList[i].Date+"Z");
        this.addEvent(result.eventList[i],true);
      }
    });

  }

  toggle() {
    this.active = !this.active;
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    let currentDate = new Date(new Date().toUTCString());

    this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    this.onUpdateData();
 
  }


  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if (action === "Deleted") {
      this.deleteEvent(event);
    }
    if (action === "Edited") {
      let dialogRef = this.dialog.open(CandidateEventComponent, {
        data: event.id, maxHeight: '700px', minWidth: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.events = this.events.filter(iEvent => iEvent !== event);
          let date: Date = new Date(result.Date);
          result.id = event.id;
          result.EventType = "rrm";
          this.addEvent(result,false);
        }
      });
    }

   // this.modal.open(this.modalContent, { size: 'lg' });
  }
  datesAreOnSameDay(first: Date, second: Date) {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  toUtcTime(date: Date): Date {
    var now_utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    //var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    //  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    return new Date(now_utc);
  }

  addEvent(new_event: CandidateEvent, isUtc: boolean): void {
    var color;
    let caption: string = "";
    caption = new Date(new_event.Date.toString() + (isUtc ? "Z" : '')).toString().substr(16, 5) + " " + new_event.CandidateName+" " + new_event.Caption;
    if (new_event.Completed) {
      color = colors.blue;
    }
    else {
      color = colors.red;
    }
 
    if (new_event.EventType == "rrm") {
      var action_list = [];
      action_list.push({
        label: '<a href="/Vacancy/profile/0/Candidates/0/' + new_event.CandidateId + '" target="_blank"><i class="fa fa-fw fa-user" style="color:white"></i></a>',
        a11yLabel: 'Info',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            //Navigate to profile info
        },
        id: 'info'
      });
      if (new_event.ZoomLink && new_event.ZoomLink!=="NA") {
        var action = {
          label: '<a href="' + new_event.ZoomLink + '" target="_blank"><i class="fa fa-fw  fa-video-camera" style="color:white"></i></a> ',
          a11yLabel: 'Zoom',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            //HandleZoomAction
          },
          id: 'zoom'
        };
        action_list.push(action);
      }
      //action_list= action_list.concat(this.actions);
      action_list = [...action_list, ...this.actions];
      this.events = [
        ...this.events,
        {
          id: new_event.id,
          title: caption,
          start: new Date(new_event.Date + "Z"),
          color: color,
          actions: action_list,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true,
          allDay: true
        }
      ];
      
    }
    else {

      let urlaction: CalendarEventAction[] = [
        {
          label: '<a href="' + new_event.Location + '" target="_blank">' + new_event.Location +'</a>',
          a11yLabel: 'Location Url',
          onClick: ({ event }: { event: CalendarEvent }): void => {
           
          }
        },

      ];


      this.events = [
        ...this.events,
        {
          id: new_event.EventType+ new_event.id,
          title: caption ,
          start: new Date(new_event.Date + "Z"),
          color: color,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },

          allDay: true
        }
      ];
    }

    this.events.sort((a, b) => { return a.start > b.start ? 1 : (a.start === b.start?0:-1) })
  }
  addCandidateEvent(id:number=0) {

    let dialogRef = this.dialog.open(CandidateEventComponent, {
      data: id, maxHeight: '700px', minWidth: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let date: Date = new Date(result.Date);
      this.addEvent(result,false);
    });

  }
  deleteEvent(eventToDelete: CalendarEvent) {
    if(!eventToDelete) return;
    this.dataAccess.DeleteCandidateEvent(eventToDelete.id).subscribe((data) => {
      if (data.result) {
        this.events = this.events.filter(event => event !== eventToDelete);
      }
    });
  
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}