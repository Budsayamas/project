import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import   'rxjs/add/operator/map';
 
@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyB0QbjixGRydcLSMHgetAqmbPH7oj3tyDg';//place your youtube api key here
 
  constructor(public http: Http) { }
 
 //this function gets the categories from the youTube rest api.
  getCategories(){
    return this.http.get('https:www.googleapis.com/youtube/v3/videoCategories?order=viewCount&part=snippet&regionCode=US&key='+this.apiKey)
    .map((res) => {
      return res.json()['items'];
    })
  }
//this function gets videos from the specified category from the youtube rest api
  getVideos(category){
    return this.http.get('https:www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId='+category+'&key='+this.apiKey)
    .map((res) => {
      return res.json()['items'];
    })
  }
}
