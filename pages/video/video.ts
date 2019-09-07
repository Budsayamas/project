import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Platform} from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  private categoryArray;
  private videos=[];
  private video;

  constructor(public navCtrl: NavController,
    private youtube:YoutubeVideoPlayer){

  }
  
  watch(watch){
    this.youtube.openVideo(watch);
  }
  
  }
