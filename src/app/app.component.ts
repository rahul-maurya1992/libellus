import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { ContacteazaNePage } from '../pages/contacteaza-ne/contacteaza-ne';
import { DespreNoPage } from '../pages/despre-no/despre-no';
import { NoutatiPage } from '../pages/noutati/noutati';
import { SesizarePage } from '../pages/sesizare/sesizare';
import { ContulmeuPage } from '../pages/contulmeu/contulmeu';
import { PetitiiPublicePage } from '../pages/petitii-publice/petitii-publice';
import { AbonariInstitutiiPage } from '../pages/abonari-institutii/abonari-institutii';
import { SesizarilePage } from '../pages/sesizarile/sesizarile';
import { ItemsProvider } from '../providers/items/items';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;// = AuthenticationPage;
  activePage: any;
  pages: Array<{ title: string, component: any, icon: any, img: any }>;
  eventsubscriber: any;
  filterObject: any = {};
  daysOptions: { cssClass: string; };
  categorylist: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public event: Events, public itemPro: ItemsProvider,
    private openNativeSettings: OpenNativeSettings, public alertCtrl: AlertController, private oneSignal: OneSignal) {
    this.daysOptions = {
      cssClass: 'my-class',
    }
    
    this.initializeApp();
    this.GetCategorylist();
    this.handleNotification();
    // alert('component');



    this.event.subscribe('loggedin', (data) => {
      console.log('here');
      console.log(data);
      this.rootPage = NoutatiPage;
      this.eventsubscriber = true;
      // used for an example of ngFor and navigation
      this.pages = [
        { title: 'Sesizare Noua', component: SesizarePage, icon: 'paper-plane', img: null },
        { title: 'Petitii Publice', component: PetitiiPublicePage, icon: 'cloud', img: null },
        { title: 'Sesizarile Mele', component: SesizarilePage, icon: 'paper-plane', img: null },
        { title: 'Abonari Institutii', component: AbonariInstitutiiPage, icon: 'notifications', img: null },
        { title: 'Noutăţi', component: NoutatiPage, icon: 'megaphone', img: null },
        { title: 'Contul meu', component: ContulmeuPage, icon: 'settings', img: null },
        { title: 'Contacteaza-ne!', component: ContacteazaNePage, icon: 'mail', img: null },
        { title: 'Delogare', component: AuthenticationPage, icon: 'exit', img: null },
        { title: 'Despre Noi', component: DespreNoPage, icon: 'information-circle', img: null }
      ];
      this.activePage = this.pages[4];
    });

    this.event.subscribe('skip', (data) => {
      console.log('skip event');
      console.log(data);
      this.rootPage = SesizarePage;// AuthenticationPage;

      // used for an example of ngFor and navigation
      this.eventsubscriber = false;
      this.pages = [
        { title: 'Autentificare', component: AuthenticationPage, icon: 'key', img: 'assets/icon/key.png' },
        { title: 'Sesizare Noua', component: SesizarePage, icon: 'paper-plane', img: null },
        { title: 'Noutăţi', component: NoutatiPage, icon: 'megaphone', img: null },
        { title: 'Contacteaza-ne!', component: ContacteazaNePage, icon: 'mail', img: null },
        { title: 'Despre Noi', component: DespreNoPage, icon: 'information-circle', img: null }
      ];
      this.activePage = this.pages[1];
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('ios')) {
        if (localStorage.getItem('firstTime_launch')) {
          console.log('firsttime');
        } else {
          this.presentConfirm();
          localStorage.setItem('firstTime_launch', 'true');
        }
      }

      if (localStorage.getItem('currentUser')) {
        console.log(localStorage.getItem('currentUser'));
        this.event.publish('loggedin', 'loggedin');
      } else {
        console.log('skip');
        this.event.publish('skip', 'skip');
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  checkActive(page) {
    // console.log(page);
    return page == this.activePage;
  }
  authenticate() {
    this.nav.setRoot(AuthenticationPage);
  }
  applyFilters(data) {
    console.log(data);
    this.nav.setRoot(SesizarilePage, { statusObj: this.filterObject });
  }
  ResetFilter() {
    this.filterObject.status = '';
    this.nav.setRoot(SesizarilePage, { statusObj: '' });
  }

  GetCategorylist() {
    this.itemPro.getCategory().map(res => res.json()).subscribe(response => {
      console.log(response);
      this.categorylist = response.data;
    })
  }

  applyAbonariFilter() {
    console.log(this.filterObject);
    this.itemPro.getFilteredInstitutions(this.filterObject.structure_id).map(res => res.json()).subscribe(response => {
      console.log(response);
    })
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: 'Please enable the cookie to use this app by follow the given steps. To enable the cookie just disable the Cross-Site Tracking by following these steps Setting->Safari->Privacy & Security-> Prevent Cross-Site Tracking.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.platform.exitApp();
          }
        },
        {
          text: 'Enable',
          handler: () => {
            console.log('enable clicked');
            this.openNativeSettings.open('privacy');
          }
        }
      ]
    });
    alert.present();
  }

  handleNotification() {
    if(this.platform.is('cordova')){
      this.oneSignal.startInit('3dc6fead-280a-47f1-a6e0-7aec451774e1', '316505521695');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
    }
    
  }
}
