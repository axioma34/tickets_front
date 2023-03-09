import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private countTickets = new Subject<number>()
  private countValidatedTickets = new Subject<number>()
  public countTickets$ = this.countTickets.asObservable()
  public countValidatedTickets$ = this.countValidatedTickets.asObservable()

  public addTicket(count: number) {
    this.countTickets.next(count)
  }

  public validateTicket(count: number) {
    this.countValidatedTickets.next(count)
  }
}
