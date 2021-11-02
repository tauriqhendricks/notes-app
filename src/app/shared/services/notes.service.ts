import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = [];

  constructor() { }

  getAll(): Note[] {
    return this.notes;
  }

  get(id: number): Note {
    return this.notes[id];
  }

  getId(note: Note): number {
    return this.notes.indexOf(note);
  }

  add(note: Note): number {
    this.notes.push(note);
    return this.getId(note);
  }

  update(id: number, model: Note): number {
    let note = this.notes[id];

    note.title = model.title;
    note.body = model.body;

    return this.getId(note);
  }

  delete(id: number): void {
    this.notes.splice(id, 1);
  }

}
