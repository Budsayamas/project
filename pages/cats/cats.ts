import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreServiceProvider} from '../../providers/firestore-service/firestore-service';
import { SelectTopicPage } from '../select-topic/select-topic';
import { ShowDetailsPage } from '../show-details/show-details';
/**
 * Generated class for the CatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cats',
  templateUrl: 'cats.html',
})
export class CatsPage {
  cats:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:FirestoreServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  selectLearning(){
    this.navCtrl.push(SelectTopicPage);
  }
  selectEmergency(){
    this.navCtrl.push(ShowDetailsPage);
  }
  selectInfo(){
    this.navCtrl.push(ShowDetailsPage);
  }

  // selectVDO(){
  //   this.cats = "VDO";
  //  // this.provider.getCat(this.cats);
  //   this.navCtrl.push();
  // }

}
