import {Component, OnInit, Inject, OnDestroy} from '@angular/core'
import {HttpService} from "../services/http.service"
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog"
import {Ticket} from "../ticket"
import {MatSnackBar} from '@angular/material/snack-bar'
import {EventBusService} from "../services/event-bus.service"
import {Subscription} from 'rxjs'

export interface AddTicketData {
  validationCode: number
  eventId: number,
  action: string
}

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  providers: [HttpService]
})
export class EventCardComponent implements OnInit, OnDestroy {
  event: any
  private subs: Subscription = new Subscription()

  constructor(
    public dialog: MatDialog,
    private readonly eventBus: EventBusService,
  ) {
  }

  ngOnInit() {
    this.event = history.state
    this.subs.add(this.eventBus.countTickets$.subscribe((count) => this.onAdd(count)))
    this.subs.add(this.eventBus.countValidatedTickets$.subscribe((count) => this.onValidate(count)))

  }

  ticketDialog(action: string) {
    this.dialog.open(AddTicketDialog, {
      data: {
        eventId: this.event.id,
        action
      },
      panelClass: 'custom-modalbox'
    })
  }

  onAdd(count: number) {
    this.event.ticketsCount += count
  }

  onValidate(count: number) {
    this.event.validateTickets += count
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}

@Component({
  selector: 'add-ticket-dialog',
  templateUrl: 'add-ticket-dialog.html',
  providers: [HttpService, MatSnackBar]
})
export class AddTicketDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddTicketData,
    private httpService: HttpService,
    private alert: MatSnackBar,
    private readonly eventBus: EventBusService
  ) {
  }

  ticket: Ticket = new Ticket(null, this.data.eventId)
  done: boolean = false

  submit(ticket: Ticket) {
    if (this.data.action === 'create') {
      this.httpService.createTicket(ticket)
        .subscribe({
          next: (data: any) => {
            this.done = true
            this.alert.open('Ticket added!', '200', {duration: 3000, panelClass: ['success-alert']})
            this.eventBus.addTicket(1)
          },
          error: error => {
            console.log(error)
            const errorText = error.status === 500 ? 'Internal server error!' : error.error
            this.alert.open(errorText, error.status, {duration: 5000, panelClass: ['error-alert']})
          }
        })
    } else if (this.data.action === 'validate') {
      this.httpService.validateTicket(ticket)
        .subscribe({
          next: (data: any) => {
            this.done = true
            this.alert.open('Ticket validated!', '200', {duration: 3000, panelClass: ['success-alert']})
            this.eventBus.validateTicket(1)
          },
          error: error => {
            const errorText = error.status === 500 ? 'Internal server error!' : error.error
            console.log(error)
            this.alert.open(errorText, error.status, {duration: 5000, panelClass: ['error-alert']})
          }
        })
    }
  }
}
