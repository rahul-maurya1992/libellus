import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetitionDetailPage } from './petition-detail';

@NgModule({
  declarations: [
    PetitionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PetitionDetailPage),
  ],
})
export class PetitionDetailPageModule {}
