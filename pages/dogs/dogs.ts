import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreServiceProvider} from '../../providers/firestore-service/firestore-service';
import { SelectTopicPage } from '../select-topic/select-topic';
import {ShowDetailsPage} from '../show-details/show-details';
/**
 * Generated class for the DogsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dogs',
  templateUrl: 'dogs.html',
})
export class DogsPage {
dogs:any;
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
  //   this.dogs = "VDO";
  //  // this.provider.getDog(this.dogs);
  //   this.navCtrl.push();
  // }
}
