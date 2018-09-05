import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotographyModalPage } from './photography-modal';

@NgModule({
  declarations: [
    PhotographyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotographyModalPage),
  ],
})
export class PhotographyModalPageModule {}
