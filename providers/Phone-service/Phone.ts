import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// *** [EDIT] add import here
 import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class PhoneServiceProvider {

  //** [EDIT] assign name of collection here ("Education")
  public COLLECTION: string = "Phone";
  private db: any;

  constructor(public http: HttpClient) {
    // *** [EDIT] assign firestore object to variable here ***
     this.db = firebase.firestore();
  }
  signInWithEmail(credentials){
    return firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password);

  }
  logout(){
    return firebase.auth().signOut();
  }
  
  //**  read document from google firestore
  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionObj)
        .get()
        .then((querySnapshot) => {
          let obj: any = [];

          querySnapshot
            .forEach((doc: any) => {
              obj.push(
               
                 {
                   docid: doc.id,
                   veterinarian: doc.data().veterinarian,
                   PhoneNum: doc.data().PhoneNum,
                   
                 }
              );
            });

          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  /** 
   * Add a new document to a selected database collection
   */
  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
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

  /**
   * Delete an existing document from a selected database collection
   */

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
}
