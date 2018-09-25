import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { PetitionDetailPage } from '../petition-detail/petition-detail';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the PetitiiPublicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-petitii-publice',
  templateUrl: 'petitii-publice.html',
})
export class PetitiiPublicePage {
  complaints: any = [];
  attachmentsId: any = [];
  resp: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public itemPro:ItemsProvider,private socialSharing: SocialSharing) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetitiiPublicePage');
    this.getPublicPetition();
  }
  getPublicPetition(){
    this.itemPro.GetPublicPetitions(1,5).map(res=>res.json()).subscribe(response=>{
      console.log(response);
      response.data.forEach(value => {
          console.log(value);
          if(value.attachments){
            console.log(value.attachments.join(','));
            var ids = value.attachments.join(',');
            //this.attachmentsId.push(ids);
            this.attachmentsId = [];
            this.attachmentsId.push(ids);
            this.itemPro.GetAttachments(this.attachmentsId).map(ress=>ress.json()).subscribe(respo=>{
              console.log(respo);
              value.attachmentsNew = respo.data;
              this.complaints.push(value);
            },err=>{
              console.log(err);
            });
           // return false;
          }
      });
      //this.complaints = response.data;
      console.log(this.attachmentsId);
      console.log(this.complaints);
    },error=>{
      console.log(error);
    })
  }


detail(itemdetail){
  console.log(itemdetail);
  this.navCtrl.setRoot(PetitionDetailPage,{item:itemdetail});

}

socialShare(subject,id){
  console.log(subject,id);
  console.log(`https://libellus.ro/sesizari/${id}`);
  // Share with option
  let options = {
    message:'Petitie publica Libellus ,',
    subject:subject,
    url : `https://libellus.ro/sesizari/${id}` ,
    chooserTitle : 'Alege...'
  }
this.socialSharing.shareWithOptions(options).then(() => {
  // Success!
}).catch(() => {
  // Error!
});
}

}
