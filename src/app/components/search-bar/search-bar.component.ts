import { ActivatedRoute, ParamMap, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject, Input } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService } from '../../services/data-access.service';
import { RouterService } from '../../services/router.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {  SearchResultList } from '../../models';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [DataAccessService, RouterService]
})

export class SearchBarComponent implements OnInit, OnDestroy {

  search?: SearchResultList;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: Router, public dialog: MatDialog) { }

  ngOnDestroy() {
  }

  ngOnInit() {

    this.dataAccess.Search("").subscribe((data) => {
      this.search = data;
    })

  }
  inputChanged(e: any) {
    const { value } = e.target;
    this.searchInDb(value);
  }
  searchInDb(text: string) {
    this.dataAccess.Search(text).subscribe((data) => {
      this.search = data;
    })
  }

  navigateTo(type: string, id: number) {
    switch (type) {
      case "client":
        this.router.navigate(['/Client', 'all', id.toString()]);
        break;
      case "candidate":
        this.router.navigate(['/Vacancy', 'profile', '0', 'Candidates', '0', id.toString()]);
        break;
      case "vacancy":
        this.router.navigate(['/Vacancy', 'profile', id.toString(),'Candidates']);
        break;
      default:
        break;
    }
  }
}