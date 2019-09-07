import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase';
import { query } from '@angular/core/src/animation/dsl';
import { directive } from '@angular/core/src/render3/instructions';
import {Storage, IonicStorageModule} from '@ionic/storage';
import { Camera,CameraOptions } from '@ionic-native/camera';
@Injectable()
export class FirestoreServiceProvider {
  pet:any;
  topic: any;
  detail: any;
  dogs: any;
  cats: any;
  Register: any = 'Register';
  AddPet:any='AddPet'
  result: any;
  docRegister: any;
  private db: any;
  public cameraImage : String
  public COLLECTION: string = "AddPet";
  public COLLECTIONregister: string = "Register";

  
  constructor(public http: HttpClient,
  public storage:Storage,
  private _CAMERA : Camera) {

    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();

    console.log('Hello DBserviceProvider Provider');
  }



  
  signInWithEmail(credentials) {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(

      (resp) => {
        console.log(resp);
        this.result = resp;
      }

    )
    // alert("email or password invalide");

  }
  signUpwithEmail(credentials) {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(
      () => {
        console.log("signUp done!!!");
      }
    ).catch(error => {
      console.log(error);
    })
  }


  logOut() {
    return firebase.auth().signOut().then(
      () => {

      }
    );
  }

  getPet(pet:any){
    this.pet = pet;
  }
  getTopics(topic: any) {
    this.topic = topic;
  }
  // getDog(dogs: any) {
  //   this.dogs = dogs;
  // }

  // getCat(cats: any) {
  //   this.cats = cats;
  // }
  getDetail(): Promise<any> {
    console.log("collection" + this.dogs);
    console.log("document" + this.topic);
    return new Promise((resolve, reject) => {
      this.db.collection(this.pet).doc(this.topic).get().then(
        (detail) => {
          resolve(detail.data());
        }
      ).catch(error => {
        reject(error)
      });
    });
  }

  getTopic(): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.db.collection(this.pet).get().then(
        (topic)=>{
          let obj: any = [];
          topic.forEach(topic => {
            obj.push({
              topicID: topic.id,
              topicName: topic.data().name
            })
          });
          resolve(obj);
        }
      ).catch(
        (error)=>{
          reject(error);
        }
      )
    })
  }

  getDocuments(collectionObj: string,dataObj:any): Promise<any> {
    console.log("collection"+ this.AddPet);
    console.log("document"+this.AddPet);
    console.log(dataObj);
    return new Promise((resolve, reject) => {
      this.db.collection(collectionObj).where('email','==',dataObj).get().then(
        (data)=>{
          let obj: any =[];
          data.forEach(doc =>{
            obj.push(
              {
                docid: doc.id,
                email: doc.data().email,
                name: doc.data().name,
                birthday: doc.data().birthday,
                dogorcat: doc.data().dogorcat,
                breed: doc.data().breed,
                sex: doc.data().sex,
                imageName: doc.data().imageName,
                color: doc.data().color,
                care: doc.data().care,
                vaccine: doc.data().vaccine

            })
          });
          resolve(obj);
        }

      ).catch(error =>{
        console.log(error);
        reject(error);
      });
        
    });
  }


  
  dummyEmail:any;
  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
      this.dummyEmail = dataObj.email;
      console.log(this.dummyEmail)
    return new Promise((resolve, reject) => {
      this.db.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
 
  deleteDocument(collectionObj: string,
    docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  /**
    * Update an existing document within a selected database collection
    */

  updateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // addCare()

  addDocumentRegister(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionObj).doc(dataObj.email).set({
        Username: dataObj.Username,
        email: dataObj.email,
        // password: dataObj.password,
        phonenumber: dataObj.phonenumber,
      })
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getUserAccount(docRegister: any): Promise<any> {
    console.log("collection" + this.Register);
    console.log("document" + docRegister);
    return new Promise((resovle, reject) => {
      this.db.collection(this.Register).doc(docRegister).get().then(
        (data) => {
          let obj: any = [];

          obj.push(
            {
              docid: data.id,
              Username: data.data().Username,
              email: data.data().email,
             phonenumber: data.data().phonenumber,
            })
          resovle(obj);
        }
      ).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }


  
  uploadImg(img, name) {
    return firebase.storage().ref('Photos/' + name).putString(img, firebase.storage.StringFormat.DATA_URL)
  }

  getUrl(name){
    return firebase.storage().ref('Photos/' + name).getDownloadURL()
  }

  

}
