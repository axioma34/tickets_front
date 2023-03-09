import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Ticket} from "../ticket"

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){ }

  getData(){
    return this.http.get('http://localhost:3000/')
  }

  createTicket(ticket: Ticket){
    const body = {validationCode: ticket.validationCode, eventId: ticket.eventId}
    return this.http.post('http://localhost:3000/ticket', body)
  }

  validateTicket(ticket: Ticket){
    const body = {validationCode: ticket.validationCode, eventId: ticket.eventId}
    return this.http.put('http://localhost:3000/ticket', body)
  }
}
