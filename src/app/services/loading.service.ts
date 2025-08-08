import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSignal = signal(false);

  // Getter to access loading state
  isLoading() {
    return this.loadingSignal();
  }

  // Methods to control loading state
  showLoading() {
    this.loadingSignal.set(true);
  }

  hideLoading() {
    this.loadingSignal.set(false);
  }
}