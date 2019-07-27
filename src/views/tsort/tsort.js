

import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
// import { Prompt } from '../../../services/prompt';
import { Promptyn } from '../../services/promptyn';

// with kendo version must load tablesorter here
import tablesorter from  '../../../jslib/jquery.tablesorter.min';
import tablesorterw from '../../../jslib/jquery.tablesorter.widgets';
import tablesorters from '../../../jslib/widget-scroller';


@inject(ApiService, ApplicationService, DialogService)
export class Inventory{
  //define some sample data
  //   tabledata = [
  //  	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
  //  	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
  //  	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
  //  	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
  //  	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  //  ];
  dataSet = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
    ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
    ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
    ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
    ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
    ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
    ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
    ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
    ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
    ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
    ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
    ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
    ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
  ];

  tabledata = [
    { name: 'Ted', surname: 'Smith', company: 'Electrical Systems', age: 30 },
    { name: 'Ed', surname: 'Johnson', company: 'Energy and Oil', age: 35 },
    { name: 'Sam', surname: 'Williams', company: 'Airbus', age: 38 },
    { name: 'Alexander', surname: 'Brown', company: 'Renault', age: 24 },
    { name: 'Nicholas', surname: 'Miller', company: 'Adobe', age: 33 },
    { name: 'Andrew', surname: 'Thompson', company: 'Google', age: 28 },
    { name: 'Ryan', surname: 'Walker', company: 'Siemens', age: 39 },
    { name: 'John', surname: 'Scott', company: 'Cargo', age: 45 },
    { name: 'James', surname: 'Phillips', company: 'Pro bugs', age: 30 },
    { name: 'Brian', surname: 'Edwards', company: 'IT Consultant', age: 23 },
    { name: 'Jack', surname: 'Richardson', company: 'Europe IT', age: 24 },
    { name: 'Alex', surname: 'Howard', company: 'Cisco', age: 27 },
    { name: 'Carlos', surname: 'Wood', company: 'HP', age: 36 },
    { name: 'Adrian', surname: 'Russell', company: 'Micro Systems', age: 31 },
    { name: 'Jeremy', surname: 'Hamilton', company: 'Big Machines', age: 30 },
    { name: 'Ivan', surname: 'Woods', company: '', age: 24 },
    { name: 'Peter', surname: 'West', company: 'Adobe', age: 26 },
    { name: 'Scott', surname: 'Simpson', company: 'IBM', age: 29 },
    { name: 'Lorenzo', surname: 'Tucker', company: 'Intel', age: 29 },
    { name: 'Randy', surname: 'Grant', company: 'Bridges', age: 30 },
    { name: 'Arthur', surname: 'Gardner', company: 'Google', age: 31 },
    { name: 'Orlando', surname: 'Ruiz', company: 'Apple', age: 32 }
  ];

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
    this.data = [
      { name: 'Ted', surname: 'Smith', company: 'Electrical Systems', age: 30 },
      { name: 'Ed', surname: 'Johnson', company: 'Energy and Oil', age: 35 },
      { name: 'Sam', surname: 'Williams', company: 'Airbus', age: 38 },
      { name: 'Alexander', surname: 'Brown', company: 'Renault', age: 24 },
      { name: 'Nicholas', surname: 'Miller', company: 'Adobe', age: 33 },
      { name: 'Andrew', surname: 'Thompson', company: 'Google', age: 28 },
      { name: 'Ryan', surname: 'Walker', company: 'Siemens', age: 39 },
      { name: 'John', surname: 'Scott', company: 'Cargo', age: 45 },
      { name: 'James', surname: 'Phillips', company: 'Pro bugs', age: 30 },
      { name: 'Brian', surname: 'Edwards', company: 'IT Consultant', age: 23 },
      { name: 'Jack', surname: 'Richardson', company: 'Europe IT', age: 24 },
      { name: 'Alex', surname: 'Howard', company: 'Cisco', age: 27 },
      { name: 'Carlos', surname: 'Wood', company: 'HP', age: 36 },
      { name: 'Adrian', surname: 'Russell', company: 'Micro Systems', age: 31 },
      { name: 'Jeremy', surname: 'Hamilton', company: 'Big Machines', age: 30 },
      { name: 'Ivan', surname: 'Woods', company: '', age: 24 },
      { name: 'Peter', surname: 'West', company: 'Adobe', age: 26 },
      { name: 'Scott', surname: 'Simpson', company: 'IBM', age: 29 },
      { name: 'Lorenzo', surname: 'Tucker', company: 'Intel', age: 29 },
      { name: 'Randy', surname: 'Grant', company: 'Bridges', age: 30 },
      { name: 'Arthur', surname: 'Gardner', company: 'Google', age: 31 },
      { name: 'Orlando', surname: 'Ruiz', company: 'Apple', age: 32 }
    ];
    this.tabledata = [
      { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
      { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
      { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
      { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
      { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ];
    //  let table = new Tabulator('#example-table', {
    //   // $('#example-table').Tabulator({
    //     height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    //     data: tabledata, //assign data to table
    //     layout: "fitColumns", //fit columns to width of table (optional)
    //     columns: [ //Define Table Columns
    //       { title: "Name", field: "name", width: 150 },
    //       { title: "Age", field: "age", align: "left", formatter: "progress" },
    //       { title: "Favourite Color", field: "col" },
    //       { title: "Date Of Birth", field: "dob", sorter: "date", align: "center" },
    //     ],
    //     rowClick: function (e, row) { //trigger an alert message when the row is clicked
    //       alert("Row " + row.getData().id + " Clicked!!!!");
    //     },
    //   });


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

  // $('button.applyid').click(function() {
  // This method adds the 'columns' widget & sorts the table to make it visible
  //    applyid(){
  //     $('table')
  //       .trigger('applyWidgetId', 'columns')
  //       .trigger('sorton', [ [[0,0]] ]);
  //     return false;

  // }
  attached() {
    $(document).ready(function () {
      // $('table').tablesorter({
      $('table').tablesorter({
        
        theme: 'default',
        //   headerTemplate : '{content} {icon}',
        widgets: ['filter', 'scroller'],

        widgetOptions: {
          // This allows setting the number of fixed columns to add to the
          // scroller
          scroller_fixedColumns: 1,
          // Set the height of the scroll window in pixels
          scroller_height: 400,
          // scroll tbody to top after sorting
          scroller_upAfterSort: true,
          // pop table header into view while scrolling up the page
          scroller_jumpToHeader: true,
          // Setting this to true will add a fixed overlay which can be used
          // for styling; A class name of "tablesorter-scroller-fixed-panel"
          // is added to the overlay.
          scroller_addFixedOverlay: false,
          // Set the width of the scroll bar in pixels; set to `null` to have
          // the width calculated internally as it is dependent on the browser
          scroll_barWidth: null,
          // Set this to a class name to use when hovering over a fixed column
          // row
          scroller_rowHighlight: "hover"
        
      },




        initialized: function (table) {
          // Not an ideal solution to fix column alignment,
          // but it works (for now)
          $(table).resize();
        }
      });


  });
  // })
}




activate(params, routeConfig) {
  // if (params.id) {
  //   this.recordId = params.id; 
  //   this.heading = `DataForm for record ${this.recordId}`;
  //   console.log('this.recordId ', this.recordId);
  //   return this.api.findInventoryOne(this.recordId)
  //     .then((jsonRes) => {
  //       console.log('jsonRes ', jsonRes);          
  //       let inv = jsonRes.data;
  //       this.currentItem = inv[0];
  //       console.log('data-form:activate - currentItem', this.currentItem);
  //       this.inv = inv[0]
  //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
  //       return inv
  //     });
  // }
}
remove(item, index) {
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



        // $("#myTable").tablesorter();
                // $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });

        //  $('.tablesorter').tablesorter({
        //     // theme: 'jui',
        //     showProcessing: true,
        //     headerTemplate : '{content} {icon}',
        //     widgets: [ 'uitheme', 'zebra', 'filter', 'scroller' ],
        //     widgetOptions : {
        //       scroller_height : 300,
        //       // scroll tbody to top after sorting
        //       scroller_upAfterSort: true,
        //       // pop table header into view while scrolling up the page
        //       scroller_jumpToHeader: true,
        //       // In tablesorter v2.19.0 the scroll bar width is auto-detected
        //       // add a value here to override the auto-detected setting
        //       scroller_barWidth : null
        //       // scroll_idPrefix was removed in v2.18.0
        //       // scroller_idPrefix : 's_'
        //     }
        //   });

        // var startFixedColumns = 2;
 // let table = new Tabulator(this.example-table, {
  // let table = new Tabulator(this.example-table, {
    //  let table = new Tabulator('#example-table', {

  //    $('#example-table').Tabulator({
  //     height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  //     data: this.tabledata, //assign data to table
  //     layout: "fitColumns", //fit columns to width of table (optional)
  //     columns: [ //Define Table Columns
  //       { title: "Name", field: "name", width: 150 },
  //       { title: "Age", field: "age", align: "left", formatter: "progress" },
  //       { title: "Favourite Color", field: "col" },
  //       { title: "Date Of Birth", field: "dob", sorter: "date", align: "center" },
  //     ],
  //     rowClick: function (e, row) { //trigger an alert message when the row is clicked
  //       alert("Row " + row.getData().id + " Clicked!!!!");
  //     },
  //   });
  //  });
    // $(document).ready(function () {
    //   $('#dtexample').DataTable({
    //     data: this.dataSet,
    //     columns: [
    //       { title: "Name" },
    //       { title: "Position" },
    //       { title: "Office" },
    //       { title: "Extn." },
    //       { title: "Start date" },
    //       { title: "Salary" }
    //     ]
    //   });
    // })

  //  let  data = [
  //   { name: 'Ted', surname: 'Smith', company: 'Electrical Systems', age: 30 },
  //   { name: 'Ed', surname: 'Johnson', company: 'Energy and Oil', age: 35 },
  //   { name: 'Sam', surname: 'Williams', company: 'Airbus', age: 38 },
  //   { name: 'Alexander', surname: 'Brown', company: 'Renault', age: 24 },
  //   { name: 'Nicholas', surname: 'Miller', company: 'Adobe', age: 33 },
  //   { name: 'Andrew', surname: 'Thompson', company: 'Google', age: 28 },
  //   { name: 'Ryan', surname: 'Walker', company: 'Siemens', age: 39 },
  //   { name: 'John', surname: 'Scott', company: 'Cargo', age: 45 },
  //   { name: 'James', surname: 'Phillips', company: 'Pro bugs', age: 30 },
  //   { name: 'Brian', surname: 'Edwards', company: 'IT Consultant', age: 23 },
  //   { name: 'Jack', surname: 'Richardson', company: 'Europe IT', age: 24 },
  //   { name: 'Alex', surname: 'Howard', company: 'Cisco', age: 27 },
  //   { name: 'Carlos', surname: 'Wood', company: 'HP', age: 36 },
  //   { name: 'Adrian', surname: 'Russell', company: 'Micro Systems', age: 31 },
  //   { name: 'Jeremy', surname: 'Hamilton', company: 'Big Machines', age: 30 },
  //   { name: 'Ivan', surname: 'Woods', company: '', age: 24 },
  //   { name: 'Peter', surname: 'West', company: 'Adobe', age: 26 },
  //   { name: 'Scott', surname: 'Simpson', company: 'IBM', age: 29 },
  //   { name: 'Lorenzo', surname: 'Tucker', company: 'Intel', age: 29 },
  //   { name: 'Randy', surname: 'Grant', company: 'Bridges', age: 30 },
  //   { name: 'Arthur', surname: 'Gardner', company: 'Google', age: 31 },
  //   { name: 'Orlando', surname: 'Ruiz', company: 'Apple', age: 32 }
  // ];
  // document.addEventListener("DOMContentLoaded", function() {

  //   new FancyGrid({
  //     renderTo: 'container',
  //     width: 500,
  //     height: 400,
  //     data: data,
  //     columns: [{
  //       index: 'company',      
  //       title: 'Company',
  //       type: 'string',
  //       width: 100
  //     },{
  //       index: 'name',
  //       title: 'Name',
  //       type: 'string',
  //       width: 100
  //     },{
  //       index: 'surname',
  //       title: 'Sur Name',
  //       type: 'string',
  //       width: 100
  //     },{
  //       index: 'age',
  //       title: 'Age',
  //       type: 'number',
  //       width: 100
  //     }]
  //   });
  // });
  // });


  //     $(this.example).dataTable({
  //     data: dataSet,
  //     columns: [
  //         { title: "Name" },
  //         { title: "Position" },
  //         { title: "Office" },
  //         { title: "Extn." },
  //         { title: "Start date" },
  //         { title: "Salary" }
  //     ]
  // } );




  //   //   $(document).ready( function () {


  // $(document).ready(function () {
  //   // let table = new Tabulator("#example-table", {



  //      })
  //   $('#dtVerticalScrollExample').DataTable({
  //     "scrollY": "200px",
  //     "scrollCollapse": true,
  //     "ordering": false,
  //   });
  //   // $('.dataTables_length').addClass('bs-select');
  // });

  // $(document).ready(function () {

  //   for (let n = 1; n < 40; n++)
  //     // $('<tr onclick="alert(\'id ' + n + '\')">').html('<td>' + Math.floor(Math.random() * 100 + 1) + '</td><td>' + this.RandomStringRandomString() + '</td><td>' + this.RandomString() + '</td><td>' + this.RandomString() + '</td>').appendTo($('tbody'));

  //   $('#demo1').jsRapTable({
  //     onSort: function (i, d) {
  //       $('tbody').find('td').filter(function () {
  //         return $(this).index() === i;
  //       }).sortElements(function (a, b) {
  //         if (i)
  //           return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
  //         else
  //           return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
  //       }, function () {
  //         return this.parentNode;
  //       });
  //     },
  //   });


  // });
 // add() {
  //   this.mode = 0//1// 'add';
  //   this.editrec = 0;
  //   let notes = this.currentItem.notes
  //   // notes.push({WorkDate:'2017-10-30',Notes:'test'})
  //   // var today = new Date()
  //   var item = { WorkDate: '', Notes: '' }
  //   notes.unshift(item)
  //   // var table = document.getElementById("myTable");
  //   // table.refresh();
  //   // //  window.location.reload()
  //   // document.getElementById('a' + 0).disabled = false;
  //   // document.getElementById('b' + 0).disabled = false;
  //   // this.edit(item,0) 

  // }


  // edit2(item, index){
  //    this.mode = 2// 'add';
  //     this.editrec= index;
  //     let notes = this.currentItem.notes
  //     this.isDisableEdit=false
  //  // console.log((index === this.editrec &&  this.mode >0  ))
  //   return !(index === this.editrec &&  this.mode >0  )

  // }