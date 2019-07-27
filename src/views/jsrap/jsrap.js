

import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
// import { Prompt } from '../../../services/prompt';
import { Promptyn } from '../../../services/promptyn';

// import jsRapTable from 'jsRapTable';
import jsRapTable from '../../../jslib/jsRapTable';


@inject(ApiService, ApplicationService, DialogService)
export class Adjustermotes {

 
  
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
  // notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    //  this.currentItem = this.appService.testrec;
    this.currentItem = this.appService.currentItem
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
   

  }


  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }

  RandomString() {
    let s = '';
    l = Math.floor(Math.random() * 10 + 3)
    while (l--)
      s += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    return s;
  }
  attached() {

    // $(function() {
    //   $("#myTable").tablesorter();
    // });

    $(document).ready(function () {

      $('#demo1').jsRapTable({
        onSort: function (i, d) {
          $('tbody').find('td').filter(function () {
            return $(this).index() === i;
          }).sortElements(function (a, b) {
            if (i)
              return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
            else
              return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
          }, function () {
            return this.parentNode;
          });
        },
      });

    })
  }


  // $(document).ready(function () {

  //   for (let n = 1; n < 40; n++)
  //     // $('<tr onclick="alert(\'id ' + n + '\')">').html('<td>' + Math.floor(Math.random() * 100 + 1) + '</td><td>' + this.RandomStringRandomString() + '</td><td>' + this.RandomString() + '</td><td>' + this.RandomString() + '</td>').appendTo($('tbody'));




  // });



  activate(params, routeConfig) {

  }
  remove(item, index) {
    // alert('you are about to delete ' + item.Notes + ' ' + index)
    // this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    // this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.notes
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  saveitem(item, index) {
    item.edit = !item.edit

  }

  addNote() {

    let notes = this.currentItem.notes
    let flag = false
    let item
    let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (notes === undefined) {
      flag = true
      notes = []
    }
    item = { WorkDate: newNoteWorkDate, Notes: '', edit: true }
    notes.unshift(item)
    if (flag) this.currentItem.notes = notes

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }




  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let notes = this.currentItem.notes//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {

      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {

      this.currentItem.notes[index] = this.currentnote
      console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

    }
    this.mode = 0
    this.isDisableEdit = true


  }




}
