import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { VideoPage } from '../video/video';
import { MyPetPage} from '../my-pet/my-pet';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = VideoPage;
  tab3Root = MyPetPage;
 


  constructor() {

  }
}
