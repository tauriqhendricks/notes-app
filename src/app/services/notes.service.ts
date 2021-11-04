import { Injectable } from '@angular/core';
import { Utils } from '../shared/helper/utils.model';
import { Note } from '../shared/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = [
    { id: Utils.generateId(), title: 'one', body: '' },
    { id: Utils.generateId(), title: 'two', body: '' },
    { id: Utils.generateId(), title: 'three', body: '' },
    { id: Utils.generateId(), title: 'one two', body: '' },
    { id: Utils.generateId(), title: 'one two three', body: '' }
  ];

  constructor() { }

  getAll(): Note[] {
    return this.notes;
  }

  get(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  add(note: Note): number {
    note.id = Utils.generateId();
    this.notes.push(note);

    return note.id;
  }

  update(model: Note): number {
    const note = this.get(model.id);

    if (!note)
      return 0;

    note.title = model.title;
    note.body = model.body;

    return note.id;
  }

  delete(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
  }

  createNewNote(): Note {
    let note = new Note();

    note.id = 0;
    note.title = '';
    note.body = '';

    return note;
  }

}
