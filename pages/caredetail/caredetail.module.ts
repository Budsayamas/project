import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaredetailPage } from './caredetail';

@NgModule({
  declarations: [
    CaredetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CaredetailPage),
  ],
})
export class CaredetailPageModule {}
