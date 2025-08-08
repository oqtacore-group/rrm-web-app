import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit, OnChanges, OnDestroy, Input, Inject, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { DataAccessService, RouterService } from '../../../services';
import { Candidate, ContactData, CandidateProfile, Vacancy, Vacancy_status, AddVacancyData, VacancyStatusType, HeadHunterData, HeadHunterJobExperienceData, LinkedinData, ConfirmDialogInput, file_resource, CandidateEvent } from '../../../models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCandidateToVacancyDialogComponent, EditCandidateToVacancyDialogComponent, CandidateEventComponent, ConfirmDialogComponent, ConfirmWithNoteDialogComponent } from '../../../components';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-candidate-profile',
  standalone: false,

  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.scss',
  providers: [DataAccessService, RouterService]

})

export class CandidateProfileComponent implements OnInit, OnDestroy {


  onDataLoaded = new EventEmitter();
  form_data!: Candidate;
  contact_data!: ContactData;
  currencyList: string[] = [];
  vacancy_status_state_list: Vacancy_status[] = [];
  vacancy_list: Vacancy[] = [];
  event_list: CandidateEvent[] = [];
  vacancy_data: AddVacancyData[] = [];
  status_types: VacancyStatusType[] = [];
  headHunterData: HeadHunterData | undefined;
  headHunterResumeData: HeadHunterJobExperienceData[] = [];
  linkedin_data: LinkedinData = new LinkedinData();
  imageurl = null;
  file_list: file_resource[]=[];
  headhunter_url: string = "";
  linkedin_url: string = "";
  new_file_name: string="";
  new_file: any = "";
  currentVacancy: number = 0;
  linkedin_plugin_url_link: boolean = false;
  hh_plugin_url_link: boolean = false;
  attentionTypeId: number = 0;
  @Input() url_id: number =0;
  @Input() readonly: boolean = false;


  constructor(private route: ActivatedRoute, public dialogRef: MatDialogRef<CandidateProfileComponent>, private dataAccess: DataAccessService, private router: RouterService, private dialog: MatDialog, private titleService: Title) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.dataAccess.getSettingValue("NeedAttentionStatusTypeId").subscribe((data) => {
      if (data.result) {
        this.attentionTypeId = Number(data.stringData);
      }
    });
    if (this.dialogRef) {
      this.dialogRef.disableClose = true;
    }
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..

      this.refreshCandidateData();

    });
  }

  refreshCandidateData() {

      if (this.route.snapshot.params['candidateid']) {
        this.url_id = this.route.snapshot.params['candidateid'];
      }

      this.dataAccess.getCandidateProfile(this.url_id).subscribe((data) => {
        this.form_data = data.data;
        this.contact_data = data.contactData;
        this.url_id = data.data.id;
        this.currencyList = data.currencyList;
        this.vacancy_status_state_list = data.vacancy_status_state_list;
        this.vacancy_list = data.vacancy_list;
        this.event_list = data.event_list;
        this.titleService.setTitle(this.form_data.Name);
        this.status_types = data.status_list;
        this.headHunterData = data.headHunterData;
        this.headHunterResumeData = data.headHunterJobExperienceDatas;
        this.currentVacancy = this.route.snapshot.params['vacancy_id'];
        if (this.headHunterData && this.headHunterData.ProfileUrl) {
          this.headhunter_url = this.headHunterData.ProfileUrl;
        }
        else {
          this.headhunter_url = "";
        }
        //this.linkedin_data = new LinkedinData();
        this.linkedin_data.profile = data.linkedin_data;
        this.linkedin_data.edu_list = data.linkedin_edu_list;
        this.linkedin_data.resume_list = data.linkedin_resume_list;
        if (this.linkedin_data.profile && this.linkedin_data.profile.Profile_url) {
          this.linkedin_url = this.linkedin_data.profile.Profile_url;
        }
        this.file_list = data.file_list;
        this.onDataLoaded.emit();
        // this.router.goToRedirectPage(this.TestData.testid, this.TestData.redirect_to_page);



      });

  }

  completedEvent(vacancy: Vacancy) {
    let array = this.vacancy_status_state_list.filter(t => t.VacancyId == vacancy.id);

    let status_id = array.reduce((a, b) => array.find(t => t.id == Math.max(a.id, b.id)) || a).VacancyStatusId;
    let data = {
      vacancy_type_list: this.status_types,
      candidate: this.form_data,
      vacancy: vacancy,
      current_vacancy_status_id: status_id
    };
    let dialogRef = this.dialog.open(EditCandidateToVacancyDialogComponent, {
      data: data, maxHeight: '700px', minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {

      this.refreshCandidateData();
    });

  }

  addEvent() {

    let dialogRef = this.dialog.open(CandidateEventComponent, {
      data: 0, maxHeight: '700px', minWidth: '800px'
    });
    dialogRef.componentInstance.onDataLoaded.subscribe((data) => {
      if (dialogRef.componentInstance.event_data) {
        dialogRef.componentInstance.event_data.CandidateId = this.form_data.id;
      }
      // do something
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }



  ChangeConnectionStatus(vacancy: Vacancy) {
    let array = this.vacancy_status_state_list.filter(t => t.VacancyId == vacancy.id);
    let status_id = array.reduce((a, b) => array.find(t => t.id == Math.max(a.id, b.id)) || a).VacancyStatusId;
    let data = {
      vacancy_type_list: this.status_types,
      candidate: this.form_data,
      vacancy: vacancy,
      current_vacancy_status_id: status_id
    };
    let dialogRef = this.dialog.open(EditCandidateToVacancyDialogComponent, {
      data: data, maxHeight: '700px', minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshCandidateData();
    });

  }


  AddConnectionComment(vacancy: Vacancy) {
      let dialogData = new ConfirmDialogInput();

      dialogData.title = 'Add comment';
      dialogData.text = 'Comment text';

      let dialogRef = this.dialog.open(ConfirmWithNoteDialogComponent, {
        data: dialogData, maxHeight: '700px', minWidth: '700px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.result == true && vacancy && vacancy.id) {
          this.dataAccess.editCandidateCommentToVacancy(vacancy.id, this.form_data.id, result.note).subscribe((data) => {
              this.refreshCandidateData();
            });
        }

      });

  }







  filterVacancyStatusList(id: number) {
    return this.vacancy_status_state_list.filter(t => t.VacancyId == id)
  }
  getVacancyClientName(id: number) {

    const vacancyStatus = this.vacancy_status_state_list.find(t => t.ClientId == id);
    return vacancyStatus ? vacancyStatus.ClientName : '';
  }

  currentVacancyStatus(id: number) {
    let array = this.vacancy_status_state_list.filter(t => t.VacancyId == id);
    if (array && array.length>0) {
      return array.reduce((a, b) => array.find(t => t.id == Math.max(a.id, b.id)) || a).StatusName;
    }
    else {
      return '';
    }
  }


  currentVacancyStatusId(id: number) {
    let array = this.vacancy_status_state_list.filter(t => t.VacancyId == id);
    if (array && array.length > 0) {
      return array.reduce((a, b) => array.find(t => t.id == Math.max(a.id, b.id)) || a).id;
    }
    else {
      return '';
    }
  }


  fileInputChange(fileInputEvent: any) {
    this.new_file = fileInputEvent.target.files[0];
    this.new_file_name = this.new_file.name;
  }

  addFile() {
    if (this.new_file && this.new_file_name != null && this.new_file_name != "") {
      let file: file_resource = {
        file: this.new_file,
        fileName: this.new_file_name,
        DateAdded: new Date(),
        id: 0,
        candidateId:this.form_data.id,
        fileUrl:""
      };

      this.dataAccess.addFileToCandidate(this.form_data.id, file.file, file.fileName).subscribe((data) => {
        if (data.result) {

          file.id = data.id;
          file.fileUrl = data.stringData;
          this.file_list.push(file);
          this.new_file = null;
          this.new_file_name = "";
        }
      });
    }
  }

  removeFile(file_id: number) {
    let file = this.file_list.filter(t => t.id == file_id)[0];


    this.dataAccess.deleteFileToCandidate(this.form_data.id, file.id).subscribe((data) => {
      if (data.result) {
        this.file_list = this.file_list.filter(t => t.id != file_id);
      }
    });
  }


  onHeadHunterParsing() {
    window.postMessage(
      { source: "rrm-elisov-admin-page", data: this.form_data.id, url: this.headhunter_url,type:"hh" },
      "*");
    setTimeout(() => {

      this.hh_plugin_url_link = true;

    }, 3000);
    //this.dataAccess.parseHeadHunterProfile(this.form_data.id, this.headhunter_url).subscribe((data) => {
    //  this.refreshCandidateData();
    //});
  }

  onHeadHunterClear() {
    this.dataAccess.clearHeadHunter(this.url_id).subscribe((data) => {
      if (data && data.result) {
        this.refreshCandidateData();
      }
    });
  }

  onLinkedinParsing() {

    if (this.linkedin_url && this.linkedin_url.includes("linkedin")) {
      window.postMessage(
        { source: "rrm-elisov-admin-page", data: this.form_data.id, url: this.linkedin_url, type: "linkedin"},
        "*");
      setTimeout(() => {

        this.linkedin_plugin_url_link = true;

      }, 3000);
    }
  }

  onLinkedinClear() {
    this.dataAccess.clearLinkedin(this.url_id).subscribe((data) => {
      if (data && data.result) {
        this.refreshCandidateData();
      }
    });
  }


  onClickEditProfile() {
    let edited = new CandidateProfile();
    edited.data = this.form_data;
    edited.contactData = this.contact_data;
    edited.image = this.imageurl;
    let file = null;
    let fileName = '';
    if (this.new_file && this.new_file_name != null && this.new_file_name != "") {
      file = this.new_file;
      fileName = this.new_file_name;
    }
    this.dataAccess.editCandidateProfile(this.url_id, edited, this.vacancy_data, this.headhunter_url, file, fileName).subscribe((data) => {
      if (data && data.result) {

        if (this.url_id==null ||  this.url_id == 0) {
          //Show success saved
          if (data.candidateId) {
            this.form_data.id = data.candidateId;
            if (this.linkedin_url && this.linkedin_url != "") {
              this.onLinkedinParsing();
            }
            else {
              this.router.goToVacancyCandidateListFromStateList(0, 0, this.form_data.id);
              this.closeDialog(false);
            }
          }
        }
        else {
          //Then close modal
          this.closeDialog(false);
        }
      }
      else {
        //Show failed to save with error message
      }


    });
    //this.dataAccess.postQuestionAnswer(this.TestData).subscribe((data) => {
    //});
  }
  closeDialog(passData: boolean) {
    if (passData && ((this.vacancy_data && this.vacancy_data.length > 0) || (this.form_data.resume_text!=null && this.form_data.resume_text.length>0))) {
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
  openEditModal() {
    let dialogRef = this.dialog.open(CandidateProfileComponent, {
      data: {
        route: this.route
      }, maxHeight: '700px', minWidth: '800px'
    });
    dialogRef.componentInstance.url_id = this.url_id;
    dialogRef.componentInstance.refreshCandidateData();
    dialogRef.afterClosed().subscribe(result => {
      this.refreshCandidateData();
    });
  }

  addToVacancy() {
    var dialogData = {
      vacancy_list: this.vacancy_data,
      candidate_data:this.form_data
    }
    let dialogRef = this.dialog.open(AddCandidateToVacancyDialogComponent, {
      data: dialogData, maxHeight: '700px', minWidth: '600px'
    });
    dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (!this.vacancy_data.find(t => t.vacancyId == data)) {
        this.vacancy_data.push(data);
      }
      // do something
    });
    dialogRef.componentInstance.onDelete.subscribe((data) => {
      this.vacancy_data = this.vacancy_data.filter(t => t.vacancyId != data.vacancyId);
      // do something
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.readonly) {
        this.updateVacancyConnections();
      }
    });



  }





  updateVacancyConnections() {
    for (var i = 0; i < this.vacancy_data.length; i++) {
      this.dataAccess.addCandidateToVacancy(this.form_data, this.vacancy_data[i].vacancyId, this.vacancy_data[i].note).subscribe(data => {
        if (data && data.result) {
        }
        else {
          //Show failed to save with error message
        }

      });
    }
  }

  moveToVacancy(vacancy_id: any) {
    this.router.goToVacancyCandidateListFromStateList(vacancy_id, this.route.snapshot.params['status_id'], this.route.snapshot.params['candidateid']);


  }

  toLocalDate(date: any) {
    return new Date(date.toString() + "Z").toLocaleString();
  }


  deleteCandidate() {

    let dialogData = new ConfirmDialogInput();
    dialogData.title = 'Are you sure?';
    dialogData.text = 'You will DELETE this candidate and all connections with vacancies';
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData, maxHeight: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.result == true) {
        this.dataAccess.DeleteCandidate(this.form_data.id).subscribe((data) => {
          this.router.goToVacancyCandidateListFromStateList(0, 0, 0);
        });
      }
    });
  }
}
