import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: NotesDetailsComponent }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
