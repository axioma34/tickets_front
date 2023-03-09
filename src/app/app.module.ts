import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {AppComponent} from './app.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatGridListModule} from "@angular/material/grid-list"
import {MatCardModule} from "@angular/material/card"
import {HttpClientModule} from '@angular/common/http'
import {TopBarComponent} from "./top-bar/top-bar.component"
import {RouterModule} from '@angular/router'
import {EventListComponent} from './event-list/event-list.component'
import {AddTicketDialog, EventCardComponent} from "./event-card/event-card.component"
import { MatDialogModule }from '@angular/material/dialog'
import {MatButtonModule} from "@angular/material/button"
import {MatInputModule} from "@angular/material/input"
import {FormsModule} from "@angular/forms"
import {MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventListComponent,
    EventCardComponent,
    AddTicketDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {path: '', component: EventListComponent},
      {path: 'events/:eventId', component: EventCardComponent}
    ]),
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
