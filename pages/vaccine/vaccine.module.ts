import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaccinePage } from './vaccine';

@NgModule({
  declarations: [
    VaccinePage,
  ],
  imports: [
    IonicPageModule.forChild(VaccinePage),
  ],
})
export class VaccinePageModule {}
