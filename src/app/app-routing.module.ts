import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotesListComponent } from './notes/notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotesListComponent, canActivate: [AuthGuard] }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
