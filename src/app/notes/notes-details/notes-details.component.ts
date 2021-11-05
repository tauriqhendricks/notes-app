import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/models/notes/note.model';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss'],
})
export class NotesDetailsComponent implements OnInit {

  note: Note | undefined;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id == 0) {
        this.note = this.notesService.createNewNote();
        return
      }

      this.note = this.notesService.get(+params.id)

      if (!this.note)
        this.router.navigateByUrl('notes');
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
    this.router.navigateByUrl('notes');
  }

  onSubmit(form: NgForm): void {
    this.note = this.mapNote(form);

    if (this.note.id === 0) {
      // create
      this.notesService.add(this.note);
    } else {
      // update
      this.notesService.update(this.note);
    }

    this.router.navigateByUrl('notes');
  }

  mapNote(form: NgForm): Note {
    let note: Note = new Note();

    note.id = this.note.id;
    note.title = form.value.title;
    note.body = form.value.body;

    return note;
  }
}
