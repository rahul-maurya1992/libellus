import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetitiiPublicePage } from './petitii-publice';

@NgModule({
  declarations: [
    PetitiiPublicePage,
  ],
  imports: [
    IonicPageModule.forChild(PetitiiPublicePage),
  ],
})
export class PetitiiPublicePageModule {}
