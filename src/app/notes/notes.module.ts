import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NotesCardComponent } from './notes-card/notes-card.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';



@NgModule({
  declarations: [
    NotesListComponent,
    NotesCardComponent,
    NotesDetailsComponent,
  ],
  imports: [
    SharedModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
