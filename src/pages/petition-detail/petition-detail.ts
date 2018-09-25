import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PetitiiPublicePage } from '../petitii-publice/petitii-publice';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdaugaComentariuPage } from '../adauga-comentariu/adauga-comentariu';

/**
 * Generated class for the PetitionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-petition-detail',
  templateUrl: 'petition-detail.html',
})
export class PetitionDetailPage {
  @ViewChild('map') mapElement: ElementRef;
  petitionDetail: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser,public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetitionDetailPage');
    console.log(this.navParams.get('item'));
    this.petitionDetail = this.navParams.get('item');
    this.loadMap();
  }
  loadMap() {
    var format;

    let latLng = new google.maps.LatLng(this.petitionDetail.lat, this.petitionDetail.lng);
    var geocoder = new google.maps.Geocoder;
    console.log(latLng);
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log(this.map);
    let marker1 = new google.maps.Marker({
      map: this.map,
      draggable: true,
      //label: val,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }
  Inappbrowser(imgurl) {
    console.log(imgurl);
    const browser = this.iab.create(imgurl, '', 'location=no');

  }
  close() {
    this.navCtrl.setRoot(PetitiiPublicePage);
  }
  
  adaugaComment(){
    let profileModal = this.modalCtrl.create(AdaugaComentariuPage, { itemId:this.petitionDetail.id });
   profileModal.onDidDismiss(data => {
     console.log(data);
   });
   profileModal.present();
  }
}
