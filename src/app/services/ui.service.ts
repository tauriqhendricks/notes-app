import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  isLoadingState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  startLoading = (): void => this.isLoadingState.next(true);

  stopLoading = (): void => this.isLoadingState.next(false);

}
