import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Inject } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientContact } from '../../../models';

@Component({
  selector: 'app-client-contact-profile',
  standalone: false,
  templateUrl: './client-contact-profile.component.html',
  styleUrl: './client-contact-profile.component.scss',
  providers: [DataAccessService, RouterService]
})

export class ClientContactProfileComponent implements OnInit, OnDestroy {


  form_data: ClientContact;
  contact_data = null;

  constructor(private route: ActivatedRoute, private dataAccess: DataAccessService, private router: RouterService, public dialogRef: MatDialogRef<ClientContactProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: ClientContact) 
  { 
    this.form_data = data;
  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.form_data = this.data;
  }


  onClickEditProfile() {
    this.dialogRef.close(this.form_data);

  }
  deleteContact() {

  }

}
