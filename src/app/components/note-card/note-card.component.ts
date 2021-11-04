import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Note } from 'src/app/shared/models/note.model';
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit, AfterViewInit {

  @Input() note: Note;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // do this in after view init, other wise the viewchilds will be undefined
    // work out if there is a text overflow and if not, then hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      // else there is no textoverflow, hide fad eout truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onDelete(): void {
    this.deleteEvent.emit();
  }
}
