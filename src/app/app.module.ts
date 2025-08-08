import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { MatCoreModule } from './mat-core/mat-core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ErrorInterceptor } from './helpers';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LayoutComponent, SearchBarComponent, CandidateEventComponent, VacancyStatisticComponent,
  RecruiterStatisticComponent, ClientAddFabComponent, VacancyAddFabComponent, ClientEditDialogComponent, VacancyEditDialogComponent, ConfirmDialogComponent, ClientContactProfileComponent, CandidateEditDialogComponent, ConfirmWithNoteDialogComponent, AddCandidateToVacancyDialogComponent, EditCandidateToVacancyDialogComponent
 } from './components';
import { LoginComponent, ClientListComponent, ClientStateListComponent, ClientProfileComponent, CandidateListComponent, VacancyCandidateListComponent, 
         CandidateProfileComponent, VacancyProfileComponent, VacancyCandidateProfileComponent, CalendarComponent, StatisticComponent, 
         TelegramChangeStatusComponent, ErrorComponent } from './pages';
import { ClientComponent } from './pages/client/client.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SearchBarComponent,
    CalendarComponent,
    CandidateEventComponent,
    StatisticComponent,
    VacancyStatisticComponent,
    RecruiterStatisticComponent,
    ClientEditDialogComponent,
    VacancyEditDialogComponent,
    ConfirmDialogComponent,
    ClientContactProfileComponent,
    CandidateEditDialogComponent,
    ConfirmWithNoteDialogComponent,
    AddCandidateToVacancyDialogComponent,
    EditCandidateToVacancyDialogComponent,
    ClientListComponent,
    ClientProfileComponent,
    ClientStateListComponent,
    CandidateListComponent,
    TelegramChangeStatusComponent,
    CandidateProfileComponent,
    VacancyCandidateListComponent,
    VacancyProfileComponent,
    VacancyCandidateProfileComponent,
    ErrorComponent,
    ClientComponent,
    VacancyComponent,
    ClientAddFabComponent,
    VacancyAddFabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCoreModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }