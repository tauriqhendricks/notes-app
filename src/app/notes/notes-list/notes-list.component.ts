import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/models/notes/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // ENTRY ANIMATION
      // go from not existing to any state
      transition('void => *', [
        // initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          // we have to expand out the padding properties, due to other browsers
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        // we first want to animate the spacing (height and margin)
        animate(50, style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(100)
      ]),
      // go from any state to void state (removed)
      transition('* => void', [
        // first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // then scale down back to normal size while beginning to fada out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down and fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        // then animate the spacing (height, padding and margin)
        animate('150ms ease-out', style({
          height: 0,
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        })),
      ])
    ]),
    trigger('listAnim', [
      // any state
      transition('* => *', [
        // when element is entering in do these
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[] = [];
  filteredNotes: Note[] = [];

  isLoading: boolean = false;
  sub: Subscription;

  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.sub = this.uiService.isLoadingState.subscribe(
      isLoading => this.isLoading = isLoading
    );

    this.getNotes();
  }

  getNotes(): void {
    this.notesService.notesChanged
      .pipe(take(1))
      .subscribe((notes: Note[]) => {
        this.notes = notes;
        this.filteredNotes = this.notes;

        this.onFilter();
      });

    this.notesService.getAll(this.authService.userIdState.getValue());
  }

  onDelete(id: string): void {
    this.notesService.delete(id);
    this.getNotes();
  }

  onFilter(): void {
    let query = this.filterInputElRef?.nativeElement?.value ? this.filterInputElRef.nativeElement.value : '';
    query = query.toLowerCase().trim();

    // split up query into idividual words
    let terms: string[] = query.split(' ');

    // remove duplicate search terms
    terms = this.removeDuplicate<string>(terms);

    // compilem all relevent results
    let allResults: Note[] = []
    terms.forEach(term => {
      let results = this.releventNotes(term);
      // merge the 2 lists
      allResults = [...allResults, ...results];
    });

    // allResults can include duplicate notes
    // bc a particular note can be the result of many search terms
    // we don't want to display the same note multiple times
    const uniqueResults = this.removeDuplicate<Note>(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicate<T>(list: T[]): T[] {
    // sets don't have duplicate values
    let uniqueResults: Set<any> = new Set();

    // loop thru list, and items to set
    list.forEach(x => uniqueResults.add(x));

    return Array.from(uniqueResults);
  }

  releventNotes(query: string): Note[] {
    query = query.toLowerCase().trim();

    const releventNotes = this.notes.filter(note => {
      if (note.title.toLowerCase().includes(query) || note.body?.toLowerCase().includes(query))
        return true;
      else
        return false;
    });

    return releventNotes;
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe;
  }

}
