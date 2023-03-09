import {Component, OnInit} from '@angular/core'
import {HttpService} from "../services/http.service"
import {Event} from "../event"
import {MatSnackBar} from "@angular/material/snack-bar"

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [HttpService]
})
export class EventListComponent implements OnInit {
  title = 'ticketFront'
  events: Event[] = []

  constructor(private httpService: HttpService, private alert: MatSnackBar) {
  }

  ngOnInit() {
    this.httpService.getData().subscribe({
        next: (data: any) => {
          this.events = data
        },
        error: error => {
          console.log(error)
          this.alert.open('Server error occurred!','X', {duration: 5000, panelClass: ['error-alert']})
        }
      }
    )
  }
}
