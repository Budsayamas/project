import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  result: {
    CorrectAnswer:string,
    AnswerText: string
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  ionViewWillEnter() {
    this.result =this.navParams.get('result');
  }
  isCorrectAnswer() {
    var a = this.result.CorrectAnswer.toLowerCase();
    var b = this.result.AnswerText.toLowerCase();
    return a == b
  }
}
