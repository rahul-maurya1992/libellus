import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the PhotographyModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photography-modal',
  templateUrl: 'photography-modal.html',
})
export class PhotographyModalPage {
  filesPicked: any = [];
  displayImg: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    private camera: Camera, private imagePicker: ImagePicker, private file: File, private base64: Base64, private _DomSanitizationService: DomSanitizer, public viewCtrl: ViewController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotographyModalPage');
   // alert('photography jsk');
    //this.filesPicked = ['assets/imgs/home-banner.png','assets/imgs/icon.png']
    // console.log(this.navParams.get('displayImg'));
    // console.log(this.navParams.get('files'));

    if(this.navParams.get('files') && this.navParams.get('displayImg')){
      this.displayImg = this.navParams.get('displayImg');
      this.filesPicked = this.navParams.get('files');
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({ displayImg: this.displayImg, files: this.filesPicked });
  }

  /************ function for Capture image *************/
  TakePicture() {
    const options: CameraOptions = {
      quality: 45,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      //alert(imageData);
      var temp = imageData;
      this.filesPicked.push(temp);
      this.base64.encodeFile(imageData).then((base64File: string) => {
        // console.log(base64File);
        //alert('base64');
        var tmp = base64File.split(',');
        let base64Image = 'data:image/jpeg;base64,' + tmp[1];
        this.displayImg.push(base64Image);
      }, (err) => {
        // alert('error');
        console.log(err);
      });
    }, (err) => {
      // Handle error
    });
  }


  /********** Function for select multiple image ******************/
  MultipleImageSelection() {
    var options = {
      maximumImagesCount: 10,
      quality: 45,
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        //alert(results[i]);
        this.filesPicked.push(results[i]);
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          //  console.log(base64File);
          // alert('base64');
          var tmp = base64File.split(',');
          let base64Image = 'data:image/jpeg;base64,' + tmp[1];
          this.displayImg.push(base64Image);
        }, (err) => {
          // alert('error');
          console.log(err);
        });
      }
    }, (err) => { });
  }

  removeFile(fileIndex) {
    console.log(fileIndex);
    if (fileIndex > -1) {
      this.displayImg.splice(fileIndex, 1);
      this.filesPicked.splice(fileIndex, 1);
      console.log(this.filesPicked);
    }
  }
}
