import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreServiceProvider} from '../../providers/firestore-service/firestore-service';
import {ShowDetailsPage} from '../show-details/show-details';
/**
 * Generated class for the SelectTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-topic',
  templateUrl: 'select-topic.html',
})
export class SelectTopicPage {
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public provider:FirestoreServiceProvider) {
    this.getTopic();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTopicPage');
  }
  getTopic(){
    this.provider.getTopic().then(
      (topic)=>{
        console.log(JSON.stringify(topic));
        this.items = topic;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  selectTopic(item:any){
    this.provider.getTopics(item.topicID);
    console.log(item.topicID);
    this.navCtrl.push(ShowDetailsPage);
  }
}
