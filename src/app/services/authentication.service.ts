import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        const storedUser = localStorageService.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/api/auth/login`, { username, password })
            .pipe(map(user => {
                // Store user details and jwt token in local storage to keep user logged in between page refreshes
                this.localStorageService.setItem('currentUser', JSON.stringify(user));
                this.localStorageService.setItem('token', user.Token); // Assuming the token is returned as part of the user object
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // Remove user from local storage and set current user to null
        this.localStorageService.removeItem('currentUser');
        this.localStorageService.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return this.localStorageService.getItem('token');
    }
}