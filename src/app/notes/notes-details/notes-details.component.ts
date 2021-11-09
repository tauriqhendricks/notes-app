import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Note } from 'src/app/shared/models/notes/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Utils } from 'src/app/shared/helper/utils.model';


@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss'],
})
export class NotesDetailsComponent implements OnInit, OnDestroy {

  note: Note | undefined;
  form: FormGroup;

  isLoading: boolean = false;
  sub: Subscription;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private uiService: UiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.uiService.isLoadingState.subscribe(
      isLoading => this.isLoading = isLoading
    );

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params) {
        const idStr = params.get('id');

        this.getNote(idStr);
      }
    });
  }

  getNote(id: string): void {
    if (id === '0') {
      this.note = this.notesService.createNewNote();
      this.note.userId = this.authService.userIdState.getValue()

      this.createForm();
    }
    else {
      this.notesService.get(id)

      this.notesService.selectedNoteState
        .subscribe(note => {
          if (note) {
            this.note = note;
            this.createForm();
          }
        });
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [this.note.title, Validators.required],
      body: this.note.body
    })
  }

  onSubmit(): void {
    this.trimStrings();
    this.form.markAllAsTouched();

    this.note = this.mapNoteFromForm();

    if (this.note.id === '0') {
      // create
      this.notesService.add(this.note);
    } else {
      // update
      this.notesService.update(this.note);
    }
  }

  trimStrings(): void {
    const titleControl = this.form.get('title');
    const bodyControl = this.form.get('body');

    titleControl?.setValue(titleControl?.value.toString().trim());
    bodyControl?.setValue(bodyControl?.value.toString().trim());
  }

  mapNoteFromForm(): Note {
    let note: Note = new Note();

    note.id = this.note.id;
    note.title = this.form.get('title').value.toString();
    note.body = this.form.get('body').value.toString();
    note.userId = this.note.userId;

    return note;
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe;
  }

  isInvalid(controlName: string): boolean {
    return Utils.isFormControlInvalid(controlName, this.form);
  }

}
