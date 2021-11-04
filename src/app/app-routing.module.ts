import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
// import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// import { NoteDetailsComponent } from './notes/notes-details/notes-details.component';
// import { NotesListComponent } from './notes/notes-list/notes-list.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       { path: '', component: NotesListComponent },
//       { path: 'new', component: NoteDetailsComponent },
//       { path: ':id', component: NoteDetailsComponent }
//     ],
//   },
//   { path: '**', component: MainLayoutComponent }
// ];

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule) }, // th:note add can load
  { path: '**', component: WelcomeComponent }
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
