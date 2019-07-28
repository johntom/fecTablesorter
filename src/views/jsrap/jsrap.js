

import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import moment from 'moment';

import jsRapTable from '../../../jslib/jsRapTable';


@inject(ApiService, ApplicationService)
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

  constructor(api, appService) {
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
    // this.dialogService = dialogService
   

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
           console.log(i,'i-d',d)
          $('tbody').find('td').filter(function () {
            return $(this).index() === i;
               console.log('$(this)',$(this))
          }).sortElements(function (a, b) {
              console.log(a,$.text([a]),'=a-b=',b,$.text([b]) ) 
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
