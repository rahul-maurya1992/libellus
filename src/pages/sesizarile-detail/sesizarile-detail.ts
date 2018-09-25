import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SesizarilePage } from '../sesizarile/sesizarile';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ItemsProvider } from '../../providers/items/items';
import { PhotoLibrary } from '@ionic-native/photo-library';
/**
 * Generated class for the SesizarileDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-sesizarile-detail',
  templateUrl: 'sesizarile-detail.html',
})
export class SesizarileDetailPage {
  @ViewChild('map') mapElement: ElementRef;
  sesizarileDetail: any;
  map: any;
  status: any = "Procesare";

  constructor(public navCtrl: NavController,private photoLibrary: PhotoLibrary, public navParams: NavParams, private iab: InAppBrowser, public transfer: FileTransfer, public file: File,public itemPro:ItemsProvider) {
    console.log(this.navParams.get('data'));
    this.sesizarileDetail = this.navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SesizarileDetailPage');
    this.loadMap();
  }
  close() {
    this.navCtrl.setRoot(SesizarilePage);
  }
  loadMap() {
    var format;

    let latLng = new google.maps.LatLng(this.sesizarileDetail.lat, this.sesizarileDetail.lng);
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

  downloadfile(attachments) {
    console.log(attachments);
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(this.file.dataDirectory);
    attachments.forEach(value => {
      //const url = 'http://www.example.com/file.pdf';
      console.log(value.image_url);
      console.log(value.type);
      fileTransfer.download(value.image_url, this.file.dataDirectory + value.type).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.photoLibrary.requestAuthorization().then(() => {
          this.photoLibrary.saveImage(entry.toURL(),'libellus');
        })
        .catch(err => console.log('permissions weren\'t granted'));
        this.itemPro.presentToast('Download completed',4500,'bottom');
        //alert('download complete');
      }, (error) => {
        // handle error
        // alert('got error');
        // alert(error);
        this.itemPro.presentToast('Download error',4500,'bottom');
      });
    });
    return false;


  }
}
