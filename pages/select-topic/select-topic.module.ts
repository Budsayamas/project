import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTopicPage } from './select-topic';

@NgModule({
  declarations: [
    SelectTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTopicPage),
  ],
})
export class SelectTopicPageModule {}
