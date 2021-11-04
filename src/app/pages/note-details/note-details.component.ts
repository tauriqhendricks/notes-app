import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/models/note.model';
import { NotesService } from 'src/app/shared/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {

  note: Note | undefined;
  noteId: number;
  isNew: boolean;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params.id) {
        this.isNew = true;
        this.note = new Note();

        return
      }

      this.note = this.notesService.get(+params.id)

      if (!this.note)
        this.router.navigateByUrl('/');

      this.noteId = params.id;
      this.isNew = false
    });

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   if (params) {
    //     const idStr = params.get('id');
    //     const id = idStr ? +idStr : 0;

    //     this.getNote(id);
    //   }
    // });
  }

  // getNote(id: number): void {
  //   if (id === 0) {
  //     this.note = new Note();
  //     return;
  //   }

  //   this.note = this.notesService.get(id);
  // }

  onCancel(): void {
    this.router.navigateByUrl('/');
  }

  onSubmit(form: NgForm): void {
    const note = this.mapNote(form);

    if (this.isNew) {
      // create
      this.notesService.add(note);
    } else {
      // update
      this.notesService.update(this.noteId, note);
    }

    this.router.navigateByUrl('/');
  }

  mapNote(form: NgForm): Note {
    let note: Note = new Note();

    note.title = form.value.title;
    note.body = form.value.body;

    return note;
  }
}
