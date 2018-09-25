import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlegedinlistaPage } from '../alegedinlista/alegedinlista';
import { ItemsProvider } from '../../providers/items/items';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

/**
 * Generated class for the AbonariInstitutiiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abonari-institutii',
  templateUrl: 'abonari-institutii.html',
})

export class AbonariInstitutiiPage {
  listItems: any = [];
  currentPage:any;
  totalPage:any;
  lastPage: any;
  abonariform: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public itemPro:ItemsProvider,public formBuilder:FormBuilder,private openNativeSettings: OpenNativeSettings) {
    console.log(navigator.cookieEnabled);
    // if(navigator.cookieEnabled){
    //   alert('')
    // }else{
    //   this.openNativeSettings.open('privacy');
    // }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbonariInstitutiiPage');
    // this.listItems = [{id:1,'name': 'Primaria Mun Galati' },
    // {id:2, 'name': 'SC TRANSURB SA' }, {id:3, 'name': 'BIBLIOTECA JUDETEANA V.A URECHIA GALATI' }, { id:4,'name': 'CENTRUL CULTURAL DUNAREA DE JOS GALATI' },
    // { id:5,'name': 'COMPLEXUL MUZEAL DE STIINTELE NATURII "RASVAN ANGHELUTA"' }, {id:6, 'name': 'S.C. DRUMURI SI PODURI S.A. GALATI' }, {id:7, 'name': 'SC APA CANAL SA' },
    // {id:8, 'name': 'SC CALORGAL SA' }];
    this.GetSUbscribedList();
  }

  ngOnInit() {
    this.abonariform = this.formBuilder.group({
      alege: [true]
    })
  }

  GetSUbscribedList() {
    this.itemPro.getSubscribedInstitutions(1,15).map(res=>res.json()).subscribe(response=>{

      console.log(response);
      this.currentPage = 1;
      
      this.totalPage = response.total;
      this.lastPage = response.last_page;
      this.listItems = [];
      response.data.forEach(value => {
        this.listItems.push(value);
      });
    },error=>{
      console.error(error);
    })
  }

  LoadMoreData(pageno){
    this.itemPro.getSubscribedInstitutions(pageno,15).map(res=>res.json()).subscribe(response=>{
      console.log(response);
      
      response.data.forEach(value => {
        this.listItems.push(value);
      });
      this.lastPage = response.last_page;
    },error=>{
      console.error(error);
    })
  }


  /******** Run function on unchecked ********/
  unSubscribeFromInstitution(institutionId,index,formdata){
    console.log(institutionId);
    console.log(index);
    console.log(formdata.value);
    if(formdata.value.alege == false){
      if ( !institutionId ) return;
      this.itemPro.unsubscribeFromInstitution(institutionId).map(res=>res.json()).subscribe(response=>{
        console.log(response);
        this.abonariform.patchValue({alege:true})
        this.GetSUbscribedList();
      },error=>{
        console.error(error);
        this.itemPro.presentToast('Nu am putut sa te inscriu la institutia aleasa. Te rog incearca mai tarziu !',4500,'bottom');
      })
    }
  
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    // console.log(this.currentPage);
    // console.log(this.totalPage);
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.LoadMoreData(this.currentPage)
    }
    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  alegedinlista() {
    this.navCtrl.setRoot(AlegedinlistaPage);
  }
}
