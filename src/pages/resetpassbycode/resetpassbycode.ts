import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AuthenticationPage } from '../authentication/authentication';

/**
 * Generated class for the ResetpassbycodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassbycode',
  templateUrl: 'resetpassbycode.html',
})
export class ResetpassbycodePage {
  resetbycodeForm: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public authenticatePro:AuthenticateProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpassbycodePage');
  }

  ngOnInit(): any {
    console.log('ngOnInit');
    this.resetbycodeForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    }, { validator: this.matchingPasswords('password', 'password_confirmation') });
  }
  isValid(field: string) {
    let formField = this.resetbycodeForm.get(field);
    return formField.valid || formField.pristine;
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value != confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  recoverypassbycode(formdata){
    console.log(formdata.value);
    this.authenticatePro.Resetpassbycode(formdata.value).subscribe(response=>{
      console.log(response);
      this.authenticatePro.presentToast('Resetarea parolei efectuata cu succes. Va rugam sa va inregistrati cu noile detalii.',4500,'bottom');
      this.navCtrl.setRoot(AuthenticationPage);
    },error=>{
        console.log(error.json());
        let err = error.json();
        if(err.message){
          this.authenticatePro.presentToast(err.message,4500,'bottom');
        }else{
          this.authenticatePro.presentToast('Resetarea parolei efectuata cu succes. Va rugam sa va inregistrati cu noile detalii.',4500,'bottom');
        }
        
    })
  }
}
