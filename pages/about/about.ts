import { Component,ViewChild  } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ResultPage } from '../result/result';
// import { QuestionServiceProvider } from '../../providers/question-service/question-service';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  questionText: string;
  correctText: string;

  constructor(public navCtrl: NavController,
    // public questionService: QuestionServiceProvider,
    public alertCtcl: AlertController) {

      
  }


}
