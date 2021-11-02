import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/models/note.model';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {

  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
  }

  onDelete(id: number): void {
    this.notesService.delete(id);
  }

}
