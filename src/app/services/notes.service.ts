import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Note } from '../shared/models/notes/note.model';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { UiService } from './ui.service';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private subs: Subscription[] = [];

  notesChanged: Subject<Note[]> = new Subject();
  selectedNoteState: Subject<Note> = new Subject();

  constructor(
    private db: AngularFirestore,
    private alertify: AlertifyService,
    private router: Router,
    private uiService: UiService
  ) { }

  getAll(userId: string): void {
    this.uiService.startLoading();

    this.subs.push(
      this.db.collection('notes', ref => ref.where('userId', '==', userId))
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Note
            }
          })
        }))
        .subscribe((notes: Note[]) => {
          this.notesChanged.next(notes);
          this.uiService.stopLoading();
        }, err => {
          this.notesChanged.next(null);
          this.uiService.stopLoading();

          this.alertify.error('Error while retrieving notes!!');
        }));
  }

  get(id: string): void {
    this.uiService.startLoading();

    this.db.collection('notes')
      .doc(id)
      .snapshotChanges()
      .pipe(take(1),
        map(doc => {
          return {
            id: doc.payload.id,
            ...doc.payload.data() as Note
          }
        }))
      .subscribe(
        (note: Note) => {
          if (!note) {
            this.selectedNoteState.next(null);

            this.alertify.error('Note does not exist!!');
            this.router.navigateByUrl('notes');
          } else {
            // console.log(note);

            this.selectedNoteState.next(note);
          }
          this.uiService.stopLoading();
        });
  }

  add(note: Note): void {
    this.uiService.startLoading();

    const isSuccessful = this.addNoteToDatabase({

      title: note.title,
      body: note.body,
      userId: note.userId

    });

    if (isSuccessful) {
      this.selectedNoteState.next(null);
      this.uiService.stopLoading();

      this.alertify.success('Created note successfully!!');
      this.router.navigateByUrl('notes');
    }
  }

  private addNoteToDatabase(note: Note): boolean {
    let isSuccessful = true;

    this.db.collection('notes')
      .add(note)
      .catch(err => {
        isSuccessful = false;

        this.uiService.stopLoading();
        this.alertify.error('Failed to create note!!');
      });

    return isSuccessful;
  }

  update(note: Note): void {
    this.uiService.startLoading();

    const isSuccessful = this.updateNoteInDatabase(note.id, {

      title: note.title,
      body: note.body,
      userId: note.userId

    })

    if (isSuccessful) {
      this.selectedNoteState.next(null);
      this.uiService.stopLoading();

      this.alertify.success('Updated note successfully!!');
      this.router.navigateByUrl('notes');
    }
  }


  private updateNoteInDatabase(id: string, note: Note): boolean {
    let isSuccessful = true;

    this.db.collection('notes')
      .doc(id)
      .update(note)
      .catch(err => {
        isSuccessful = false;
        this.uiService.stopLoading();

        this.alertify.error('Failed to update note!!');
      });

    return isSuccessful;
  }

  delete(id: string): void {
    this.uiService.startLoading();

    this.db.collection('notes')
      .doc(id)
      .delete();

    // this does not catch if a document was not deleted
    // .then(() => {
    //   this.alertify.success('Note deleted successfully!!');
    // }, err => {
    //   this.alertify.error('Failed deletion of note!!');
    // })
    // .catch(err => {
    //   this.alertify.error('Failed to delete note!!');
    // }).finally(() => {
    //   this.alertify.success('dont lie!!');
    // });

    this.checkIfNoteIsDeletedFromDataBase(id);
  }

  private checkIfNoteIsDeletedFromDataBase(id: string): void {
    this.db.collection('notes')
      .doc(id)
      .valueChanges()
      .pipe(take(1))
      .subscribe(
        (note: Note) => {
          if (!note)
            this.alertify.success('Note deleted successfully!!');
          else
            this.alertify.error('Failed to delete note!!');

          this.uiService.stopLoading();
        });
  }

  createNewNote(): Note {
    let note = new Note();

    note.id = '0';
    note.title = '';
    note.body = '';
    note.userId = '';

    return note;
  }

  cancelSubs(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

}
