import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-client-list',
  standalone: false,
  
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  providers: [DataAccessService, RouterService]

})

export class ClientListComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['id', 'Name', 'SiteUrl', 'Email','Created'];
  material_source = new MatTableDataSource();
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService) { }
  
  ngOnDestroy() {
  }

  ngOnInit() {
    this.material_source.sort = this.sort;
    this.material_source.paginator = this.paginator;
    this.dataAccess.getClientList().subscribe((result) => {
      this.material_source.data = result.list;
    });
  }
  onRowClicked(row: any) {
    this.router.goToProfilePageFromList(row.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.material_source.filter = filterValue.trim().toLowerCase();
    if (this.material_source.paginator) {
      this.material_source.paginator.firstPage();
    }

  }

  goToCreateNew() {
    this.router.goToProfilePageFromList(0);
  }

  deleteClient() {

  }
}