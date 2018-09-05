import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PhotographyModalPage } from '../photography-modal/photography-modal';
import { Geolocation } from '@ionic-native/geolocation';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategorymodalPage } from '../categorymodal/categorymodal';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemsProvider } from '../../providers/items/items';
import { SesizarilePage } from '../sesizarile/sesizarile';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the TrimiteSesizarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-trimite-sesizare',
  templateUrl: 'trimite-sesizare.html',
})
export class TrimiteSesizarePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  data: any = {};
  trimitiForm: FormGroup;
  format_address: any;
  lattitude: any;
  longitude: any;
  catselect: any = [];
  addr: any;
  displayImg: any = [];
  filesPicked: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public geolocation: Geolocation, private transfer: FileTransfer, private file: File,
    public formBuilder: FormBuilder, public authenticatePro: AuthenticateProvider,
    private _DomSanitizationService: DomSanitizer, public itemPro: ItemsProvider) {
    this.loadMap();
  }


  ionViewDidLoad() {
    //alert('trimiti fsdf');
    console.log('ionViewDidLoad TrimiteSesizarePage');
    if (localStorage.getItem('categorylist')) {
      localStorage.removeItem('categorylist')
    }

  }
  ngOnInit(): any {
    console.log('ngOnInit');
    this.trimitiForm = this.formBuilder.group({
      category: [''],
      addressDescription: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  isValid(field: string) {
    let formField = this.trimitiForm.get(field);
    return formField.valid || formField.pristine;
  }

  modal() {
    const modal = this.modalCtrl.create(PhotographyModalPage, { displayImg: this.displayImg, files: this.filesPicked });
    modal.onDidDismiss(data => {
      console.log('************** dismiss ****************');
      console.log(data);
      this.displayImg = data.displayImg;
      this.filesPicked = data.files;
    });
    modal.present();
  }

  loadMap() {
    var format;
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.lattitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
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
      /**************** Get address by lat long **************************/
      geocoder.geocode({ 'location': latLng }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            console.log(results);
            let addr = results[0].formatted_address;
            this.addr = results[0].formatted_address;
            console.log(this.addr);
            document.getElementById("format_address").innerHTML = addr;
            //this.getaddress(city);
            //this.getValue(results[0].formatted_address);
            //this.autocomplete = results[0].formatted_address;
            //this.autocomplete.query = results[0].formatted_address
            // this.trimitiForm.patchValue({
            //   addresss:results[0].formatted_address
            // });
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
      /******************************************/
      google.maps.event.addListener(this.map, "click", function (clickedres) {
        console.log(clickedres.latLng.lat());
        console.log(clickedres.latLng.lng())
        console.log('clicked on marker');
        this.lattitude = clickedres.latLng.lat();
        this.longitude = clickedres.latLng.lng();
        marker1.setPosition(clickedres.latLng);

        /**************** Get address by lat long **************************/
        geocoder.geocode({ 'location': clickedres.latLng }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results);
              let addr = results[0].formatted_address;
              document.getElementById("format_address").innerHTML = addr;
              //this.getaddress(city);
              //this.getValue(results[0].formatted_address);
              //this.autocomplete = results[0].formatted_address;
              //this.autocomplete.query = results[0].formatted_address
              // this.trimitiForm.patchValue({
              //   addresss:results[0].formatted_address
              // });
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
        /******************************************/
      })

      google.maps.event.addListener(marker1, 'dragend', function (evt) {
        console.log(evt.latLng.lat(), evt.latLng.lng())
        //this.getaddress();
        this.lattitude = evt.latLng.lat();
        this.longitude = evt.latLng.lng();
        /**************** Get address by lat long **************************/
        geocoder.geocode({ 'location': evt.latLng }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results);
              let addr = results[0].formatted_address;
              document.getElementById("format_address").innerHTML = addr;
              //this.getaddress(city);
              //this.getValue(results[0].formatted_address);
              //this.autocomplete = results[0].formatted_address;
              //this.autocomplete.query = results[0].formatted_address
              // this.trimitiForm.patchValue({
              //   addresss:results[0].formatted_address
              // });
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
        /******************************************/
      });


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  categorymodal() {
    let categories = '';
    const catmodal = this.modalCtrl.create(CategorymodalPage);
    catmodal.onDidDismiss(data => {
      console.log(data);
      if (data.selected) {
        data.selected.forEach(value => {
          console.log(value);
          this.catselect.push(parseInt(value.id));
          categories += value.name + ', '
        });
        console.log(categories.replace(/,\s*$/, ""));
        // this.catselect = categories.replace(/,\s*$/, "");
        this.trimitiForm.patchValue({
          category: categories.replace(/,\s*$/, "") + ' (click pentru reselectie)'
        })
      }

    });
    catmodal.present();
  }

  /************** Function to submit the form info and filePicked *****************/
  Trimitiform(formdata) {
    console.log(this.addr);
    var inputValue = document.getElementById("format_address").textContent;
    console.log(inputValue);
    console.log(formdata.value);

    if (this.catselect.length == 0) {
      this.authenticatePro.presentToast('selectați categoria', 4500, 'bottom');
      console.log('selectați categoria');
      return;
    }

    if (!inputValue) {
      this.authenticatePro.presentToast('va rugam adaugati o descriere a locatiei', 4500, 'bottom');
      return;
    }
    if (!this.filesPicked.length) {
      this.authenticatePro.presentToast('Nu exista atasamente. Va rugam selectati un atasament care sa sustina petitia dumneavoastra.', 4500, 'bottom');
      return;
    }

    var dataObject = {
      addressDescription: formdata.value.addressDescription,
      body: formdata.value.body,
      lat: this.lattitude,
      lng: this.longitude,
      privacy: "0",
      structure: this.catselect,
      town: "1",
    }
    console.log(dataObject);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.itemPro.postComplaint(dataObject).subscribe((response) => {
        console.log(response.json());
        loading.dismiss();
        this.uploadFile(response.json().id);
      }, error => {
        console.info(error);
       // alert(JSON.stringify(error));
      })
    });

  }

  removeFile(fileIndex) {
    console.log(fileIndex);
    if (fileIndex > -1) {
      this.displayImg.splice(fileIndex, 1);
      this.filesPicked.splice(fileIndex, 1);
      console.log(this.filesPicked);
    }
  }

  /********* function to upload file ***************/
  uploadFile(petitionId) {
    console.log(petitionId);
    //alert('partition id==>' + petitionId);
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.filesPicked.forEach(imageURI => {
      let options: FileUploadOptions = {
        fileKey: 'attachments',
        mimeType: 'image/jpeg',
        fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
        chunkedMode: false
      }
      console.info("options", options);
      console.info("URL => ", imageURI, this.itemPro.apiUrl + "petition/uploadPetitionAttachment?petitionId=" + petitionId);
      fileTransfer.upload(imageURI, this.itemPro.apiUrl + "petition/uploadPetitionAttachment?petitionId=" + petitionId, options)
        .then((data) => {
          // success
          // alert('file transfered');
          // alert(JSON.stringify(data));
          this.navCtrl.setRoot(SesizarilePage);
        }, (err) => {
          console.info()
          // error
          // alert('error occured');
          // alert(JSON.stringify(err));
        })
    });
  }

}
