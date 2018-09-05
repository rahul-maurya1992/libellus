import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { CreeazaPage } from '../creeaza/creeaza';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { ResetpassbycodePage } from '../resetpassbycode/resetpassbycode';
import { SesizarePage } from '../sesizare/sesizare';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the AuthenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events, public authenticatePro: AuthenticateProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    localStorage.clear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }
  ngOnInit(): any {
    console.log('ngOnInit');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      password: ['', [Validators.required]],
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }
  isValid(field: string) {
    let formField = this.loginForm.get(field);
    return formField.valid || formField.pristine;
  }
  creeaza() {
    this.navCtrl.setRoot(CreeazaPage);
  }
  forgot() {
    this.navCtrl.setRoot(ForgotpasswordPage);
  }
  resetbycode() {
    this.navCtrl.setRoot(ResetpassbycodePage);
  }

  authenticate(formdata) {
    console.log('authenticate');
    console.log(formdata.value);
    console.log(this.loginForm);

    this.authenticatePro.login(formdata.value.email, formdata.value.password).then((response) => {
      console.log(response);
      if (response.active) {
        console.log('login success');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.event.publish('loggedin', 'loggedin');
        this.navCtrl.setRoot(SesizarePage);
      } else {
        console.log(response.error);
        this.authenticatePro.presentToast('Asigurati-va ca informatiile de logare sunt corecte !', 2500, 'bottom');
        
      }
    },error=>{
      this.authenticatePro.presentToast('Asigurati-va ca informatiile de logare sunt corecte !', 2500, 'bottom');
    });
  }
}
