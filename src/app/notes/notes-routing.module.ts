import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: 'notes/:id', component: NotesDetailsComponent, canActivate: [AuthGuard] }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
