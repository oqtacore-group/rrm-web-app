import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './helpers';
import { LayoutComponent } from './components';
import { CalendarComponent, CandidateListComponent, ClientComponent, ClientListComponent, ClientProfileComponent, 
  ClientStateListComponent, ErrorComponent, LoginComponent, StatisticComponent, TelegramChangeStatusComponent, 
  VacancyComponent, VacancyCandidateListComponent, VacancyCandidateProfileComponent, VacancyProfileComponent, CandidateProfileComponent } 
  from './pages';

const routes: Routes = [
  { path: 'Client', redirectTo: 'Client/all/0' },
  { path: '', redirectTo:"Vacancy", pathMatch: "full" },
  { path: "Vacancy/profile/:vacancy_id/Candidates", redirectTo: "Vacancy/profile/:vacancy_id/Candidates/0/0" },
  {
    path: '', component: LayoutComponent, canActivate: [authGuard], 
    children: [      
      { path: 'Calendar', component: CalendarComponent },
      { path: 'Statistic', component: StatisticComponent },
      { path: 'Candidate', component: CandidateListComponent },
      { path: "Candidate/Search", component: CandidateListComponent },
      { path: "Candidate/profile/:candidateid", component: CandidateProfileComponent },
      { path: "Settings", component: ErrorComponent },
      { path: "LinkedinInfo", component: ErrorComponent },
      {
        path: 'Client', component: ClientComponent, 
        children: [      
          { path: "Search", component: ClientListComponent },
          { path: "profile/:client_id", component: ClientProfileComponent },
          { path: ":status_id/:client_id", component: ClientStateListComponent },
        ]
      },
      {
        path: 'Vacancy', component: VacancyComponent, 
        children: [      
          { path: '', component: VacancyCandidateListComponent },
          { path: "profile/:vacancy_id", component: VacancyProfileComponent },
          { path: "profile/:vacancy_id/Candidates/:status_id/:candidateid", component: VacancyCandidateProfileComponent },
        ]
      },
    ]
  },
  { path: 'Login', component: LoginComponent },
  { path: "Telegram", component: TelegramChangeStatusComponent, canActivate: [authGuard] },
  { path: "Telegram/ChangeStatus/:hash", component: TelegramChangeStatusComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }