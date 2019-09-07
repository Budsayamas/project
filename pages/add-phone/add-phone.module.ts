import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhonePage } from './add-phone';

@NgModule({
  declarations: [
    AddPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPhonePage),
  ],
})
export class AddPhonePageModule {}
