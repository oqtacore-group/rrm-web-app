import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, ViewChild, Input, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import {  MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { ClientContactProfileComponent } from '../client-contact-profile/client-contact-profile.component';
import { ClientContactProfile, ClientContact, ConfirmDialogInput, Client } from '../../../models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-client-edit-dialog',
  standalone: false,
  templateUrl: './client-edit-dialog.component.html',
  styleUrl: './client-edit-dialog.component.scss',
  providers: [DataAccessService, RouterService]

})

export class ClientEditDialogComponent implements OnInit, OnDestroy {


  form_data: Client | undefined;

  columnToDisplay: string[] = ['Name', 'PhoneNumber', 'Email', 'Contacts'];
  contact_list: ClientContact[] = [];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialog: MatDialog, public dialogRef: MatDialogRef<ClientEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public client_id: number) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    if (this.dialogRef) {
      this.dialogRef.disableClose = true;
      this.refreshApiData();
    }

  }

  refreshApiData() {

    this.dataAccess.getClientProfile(this.client_id).subscribe((result) => {
      this.form_data = result.data;
      // this.client_id = result.data.id;
      this.refreshContactData();

      // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);
    });
  }

  refreshContactData() {
    this.dataAccess.getClientContactList(this.client_id).subscribe((dataContact) => {
      this.contact_list = dataContact.list;
    });
  }


  onClickEditProfile(id:number) {
    if(!this.form_data) return;
    if(this.client_id == 0) {
      this.dataAccess.addClientProfile(this.form_data).subscribe((data) => {

        if (data && data.Success) {
          let count = 0;
          this.client_id = data.Id;
          if(this.contact_list.length == 0){
            //Redirect to standart page
            this.router.goToProfilePage(this.client_id, 'Client');
            this.dialogRef.close();
          }
          for (let i = 0; i < this.contact_list.length; i++) {
            this.dataAccess.editClientContactProfile(this.client_id, this.contact_list[i].id, this.contact_list[i], this.contact_list[i].ContactData).subscribe(() => {
              count++;
              if (count == this.contact_list.length) {
                  //Redirect to standart page
                  this.router.goToProfilePage(data.Id, 'Client');
                  this.dialogRef.close();
              }
            });
          }

        }
        else {
          //Show failed to save with error message
        }
      });

    }
    else {

      this.dataAccess.editClientProfile(this.client_id, this.form_data).subscribe((data) => {

        if (data && data.Success) {
          let count = 0;
          if(this.contact_list.length==0){

            //this.router.goToProfilePage(this.client_id, 'Client');
            this.dialogRef.close();
          }
          for (let i = 0; i < this.contact_list.length; i++) {
            this.dataAccess.editClientContactProfile(this.client_id, this.contact_list[i].id, this.contact_list[i], this.contact_list[i].ContactData).subscribe(() => {
              count++;
              if (count == this.contact_list.length) {
                this.dialogRef.close();
              }
            });
          }

        }
        else {
          //Show failed to save with error message
        }
      });

    }


  }

  createNewClientContact() {
    this.dataAccess.GetClientContactProfile(0, this.client_id).subscribe((data) => {

      let dialogRef= this.dialog.open(ClientContactProfileComponent, {
        data: data.data, maxHeight: '700px', minWidth: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.contact_list.push(result);
        }
        //this.refreshContactData();
      });
    });
  }
  onClientContactEditClicked(row: any) {
    let dialog=this.dialog.open(ClientContactProfileComponent, {
      data: row, maxHeight: '700px', minWidth: '700px'

    });
    dialog.afterClosed().subscribe((data) => {
      this.contact_list.filter(t => t.id == data.id)[0] = data;


    });
  }


  closeDialog(passData: boolean) {
    if (passData) {
      let dialogData = new ConfirmDialogInput();
      dialogData.title = 'Are you sure?';
      dialogData.text = '';
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: dialogData, maxHeight: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.result == true) {

          this.dialogRef.close();
        }
      });
    }
    else {
      this.dialogRef.close();
    }
  }


  deleteContact(row: any) {
    if (this.form_data?.id != 0) {
      this.dataAccess.DeleteClientContact(row.id).subscribe((data) => {
        this.contact_list = this.contact_list.filter(t => t != row);
      });
    }
    else {
      this.contact_list = this.contact_list.filter(t => t != row);
    }
  }

}
