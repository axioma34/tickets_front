import {Component, OnInit} from '@angular/core'
import {HttpService} from "../services/http.service"
import {Event} from "../event"
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [HttpService]
})
export class EventListComponent implements OnInit {
  title = 'ticketFront'
  events: Event[] = []

  constructor(private httpService: HttpService){}

  ngOnInit(){
    this.httpService.getData().subscribe({next:(data:any) => this.events = data})
  }
}
