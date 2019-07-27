import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';


import { Promptyn } from '../../../services/promptyn';
import { Promptorg } from '../promptorg';

// @inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
@inject(ApiService, ApplicationService, DialogService)

export class Museamloan {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  // adjusters: Adjuster[] = []
  newNoteWorkDate = '';
  newNote = '';
  typeList = [
    "Primary",
    "Assistant"
  ];

  // constructor(taskQueue, signaler, api, appService, dialogService) {
  constructor(api, appService, dialogService) {
    // this.taskQueue = taskQueue;
    // this.signaler = signaler;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';

    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }

  addDetail() {
    let museumloan = this.currentItem.museumloan
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (museumloan === undefined) {
      flag = true
      museumloan = []
    }
    item = { Notes: '', edit: true }
    museumloan.unshift(item)
    if (flag) this.currentItem.museumloan = museumloan
  }


  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    //InsuredBy
    if ((this.currentItem.LoanTo === undefined) || (this.currentItem.LoanTo === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.LoanTo)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.conservedbyname = orgobj.OrgName
    }
  }
  attached() {
    $(document).ready(function () {
      $('#dtVerticalScrollExample').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "ordering": false,
      });
      $('.dataTables_length').addClass('bs-select');
    });

  }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)

  this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
    
      if (!response.wasCancelled) {
        console.log('Delete')
        let museumloan = this.currentItem.museumloan
        museumloan.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });


  }
  // <input click.delegate="showModal('LoanTo',$index)" type="text" id="LoanTo" class="form-control input-sm"
  // value.bind="loantoname">

  // showModal(fieldname, index) {
  showModal(fieldname,index) {
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    this.currentItem.fieldname = fieldname
    this.currentItem.LoanTo = this.currentItem.museumloan[index].LoanTo
    this.currentItem.loantoname = this.currentItem.museumloan[index].loantoname

  this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

       this.currentItem.museumloan[index].LoanTo = this.currentItem.LoanTo
      this.currentItem.museumloan[index].loantoname = this.currentItem.loantoname
      if (!response.wasCancelled) {
        // console.log('Delete') currentItem.conservation
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  addAdjuster() {
    let flag = 0;
    let item;
    if (this.currentItem.adjusters === undefined) {
      flag = 1;
      this.currentItem.adjusters = [];
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Primary', edit: true };
    } else {
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Assistant', edit: true };
    }
    this.currentItem.adjusters = [item, ...this.currentItem.adjusters];



  }

  selectChanged(selectedadjuster, adjusterid) {
    // Find the selected adjuster object
    let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
    // Update the current adjuster with the new values
    selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    // We don't need to change the TYPE as it is bound correctly from the UI
    selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }

  cancel(item, index) {
  }
  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
}
