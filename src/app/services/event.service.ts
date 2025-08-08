import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private actionChangedSource = new BehaviorSubject<string | null>(null);
  actionChanged$ = this.actionChangedSource.asObservable();

  notifyActionChange(action: string) {
    this.actionChangedSource.next(action);
  }
}
