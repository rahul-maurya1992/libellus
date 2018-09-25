import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { CreeazaPage } from '../pages/creeaza/creeaza';
import { ContacteazaNePage } from '../pages/contacteaza-ne/contacteaza-ne';
import { DespreNoPage } from '../pages/despre-no/despre-no';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { NoutatiPage } from '../pages/noutati/noutati';
import { SesizarePage } from '../pages/sesizare/sesizare';
import { SesizarilePage } from '../pages/sesizarile/sesizarile';
import { ResetpassbycodePage } from '../pages/resetpassbycode/resetpassbycode';
import { AbonariInstitutiiPage } from '../pages/abonari-institutii/abonari-institutii';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContulmeuPage } from '../pages/contulmeu/contulmeu';
import { PetitiiPublicePage } from '../pages/petitii-publice/petitii-publice';
import { AlegedinlistaPage } from '../pages/alegedinlista/alegedinlista';
import { SetariprofilePage } from '../pages/setariprofile/setariprofile';
import { SesizarileDetailPage } from '../pages/sesizarile-detail/sesizarile-detail';
import { FilterSesizariPage } from '../pages/filter-sesizari/filter-sesizari';
import { TrimiteSesizarePage } from '../pages/trimite-sesizare/trimite-sesizare';
import { PhotographyModalPage } from '../pages/photography-modal/photography-modal';
import { NoutatidetailPage } from '../pages/noutatidetail/noutatidetail';
import { ItemsProvider } from '../providers/items/items';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';

import { HttpModule} from '@angular/http';
import { NewsProvider } from '../providers/news/news';
import { Geolocation } from '@ionic-native/geolocation';
import { CategorymodalPage } from '../pages/categorymodal/categorymodal';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SearchPipe } from '../pipes/search/search';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { OneSignal } from '@ionic-native/onesignal';
import { PetitionDetailPage } from '../pages/petition-detail/petition-detail';
import { AdaugaComentariuPage } from '../pages/adauga-comentariu/adauga-comentariu';
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthenticationPage,
    CreeazaPage,
    ContacteazaNePage,
    DespreNoPage,
    ForgotpasswordPage,
    NoutatiPage,
    SesizarePage,
    ResetpassbycodePage,
    SesizarilePage,
    AbonariInstitutiiPage,
    ContulmeuPage,
    PetitiiPublicePage,
    AlegedinlistaPage,
    SetariprofilePage,
    SesizarileDetailPage,
    FilterSesizariPage,
    TrimiteSesizarePage,
    PhotographyModalPage,
    NoutatidetailPage,
    CategorymodalPage,
    SearchPipe,
    PetitionDetailPage,
    AdaugaComentariuPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2SearchPipeModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthenticationPage,
    CreeazaPage,
    ContacteazaNePage,
    DespreNoPage,
    ForgotpasswordPage,
    NoutatiPage,
    SesizarePage,
    ResetpassbycodePage,
    SesizarilePage,
    AbonariInstitutiiPage,
    ContulmeuPage,
    PetitiiPublicePage,
    AlegedinlistaPage,
    SetariprofilePage,
    SesizarileDetailPage,
    FilterSesizariPage,
    TrimiteSesizarePage,
    PhotographyModalPage,
    NoutatidetailPage,
    CategorymodalPage,
    PetitionDetailPage,
    AdaugaComentariuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemsProvider,
    AuthenticateProvider,
    NewsProvider,
    Geolocation,
    Camera,
    ImagePicker,
    WebView,
    File,
    Base64,
    FileTransfer,
    InAppBrowser,
    OpenNativeSettings,
    PhotoLibrary,
    OneSignal,
    SocialSharing
    
    
  ]
})
export class AppModule {}
