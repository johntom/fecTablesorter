
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { ynPrompt } from '../../../services/prompt';
import { Prompt } from '../prompt';
import { bindable } from 'aurelia-framework';
@inject(ApiService, ApplicationService, DialogService)
export class Photo {
   @bindable searchdoc
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
   recordId = '';
 //   provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {
  
  }
 	// <input click.delegate="showModal('PhotographerID',$index)" type="text" id="PhotographerID" class="form-control input-sm" value.bind="photographername">
		
 modalDocs() {

    this.dialogService.open({ viewModel: Prompt, model: 'docs', lock: false }).whenClosed(response => {
    
      console.log(response.output);
    });
     }
 searchdocChanged(value) {
   //console.log('the value ', value)
   
    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }


showModal(fieldname,index) {
   this.currentItem.PhotographerID=   this.currentItem.photo[index].PhotographerID  
  this.currentItem.photographername=  this.currentItem.photo[index].photographername

    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      this.currentItem.photo[index].PhotographerID = this.currentItem.PhotographerID
      this.currentItem.photo[index].photographername = this.currentItem.photographername
      if (!response.wasCancelled) {
        
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
	
 addDetail() {
 let photo = this.currentItem.photo
    let flag = false
    let item
    if (photo === undefined) {
      flag = true
      photo = []
    }
    item = {  PhotoMemo: '', edit: true }
    photo.unshift(item)
    if (flag) this.currentItem.photo = photo
  }
 saveitem(item,index) {
    item.edit = !item.edit
   

  }


addDocs(images) {
  //images is file
  //check for dups 2/21/2018
  //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  let docs = this.currentItem.docs
  let formData = new FormData()
  let newDate = moment().format('YYYY-MM-DD')
  let flag = false
  let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
    let newform = values;
    console.log('after checkdata1 ', this.status, newform);
    // this.api.upload(formData, this.currentItem.CLAIM_NO)
    this.api.uploadinvphoto(newform, this.currentItem.InventoryCode)
      .then((jsonRes) => {
        this.upmess = jsonRes.message

        $("#file").val("");
      })
  })

  // this is not a good way to get value this.items = Promise.resolve(this.checkData(images));
  //  console.log('after checkdata1 just a promise cant pick off value ',  this.status,this.items);

  //  return Promise.all([  this.checkData(images)]).then(values => {
  //     this.items = values[0];
  //      console.log('after checkdata1 ',  this.status,this.items);
  //   }).catch(error => {
  //     console.error("Error encountered while trying to get data.", error);
  //   });

}


  remove(item, index) {
     this.mode = 0


    this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let provenance = this.currentItem.provenance
        provenance.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
}

