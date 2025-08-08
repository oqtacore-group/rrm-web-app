import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures the service is available globally in the app
})
export class LocalStorageService {
  constructor() {}
  setItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
  
  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }
  
  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
  
  clear(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
  
}