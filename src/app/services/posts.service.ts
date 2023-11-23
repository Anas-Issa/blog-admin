import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private angularFireStorage :AngularFireStorage,
    private afs:AngularFirestore,
    private toastr: ToastrService,
    private router:Router
    
    ) { }

  uploadImage(selectedImage:any,postData:any,status:string,id:string,changed:boolean) {
    
    const filePath= `postImg/${Date.now()} ` ;
    console.log("Selscted Image",selectedImage);
    if(changed){
            this.angularFireStorage.upload(filePath,selectedImage)
    .then(()=>{
      console.log('image uploaded successfully');
      this.angularFireStorage.ref(filePath).getDownloadURL()
      .subscribe(url=>{
        postData.postImgPath=url;
        if(status=='Edit'){
          this.updateData(id,postData)
        }
        else{
        this.saveData(postData);
        }
        

      })


    });
    }
      else{
if(status=='Edit'){
  console.log("postData",postData);
          this.updateData(id,postData)
        }
        else{
        this.saveData(postData);
        }
      }
     
  }
  saveData(postData:any){
            this.afs.collection('posts').add(postData)
        .then(
          docRef=>{

            this.toastr.success('Data inserted Successfully');
             this.router.navigate(['/posts']);
          }
        );
  }


    loadData(){
    return this.afs.collection('posts').snapshotChanges()
    .pipe(
      map(actions=>{

      return  actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,data}
        })
      }
        
      )
    )
  }
  loadOnePost(id:string){
 return   this.afs.collection('posts').doc(id).valueChanges();

  }
  updateData(id:string,postData:any) { 
    this.afs.doc(`posts/${id}`).update(postData)
    .then(()=>{
      this.toastr.success('Data updated Successfully');
      this.router.navigate(['/posts']);
    })
  }
  deleteImage(url:string,id:string){
    this.angularFireStorage.storage.refFromURL(url).delete()
    .then(()=>{
      this.deleteData(id)
      
    })

  }
  deleteData (id:string) { 
     this.afs.doc(`posts/${id}`).delete()
     .then(()=>{
      console.log("deleted");
      this.toastr.success('Post deleted successfully.');
     })
  }

  markFeatured(id:string,featuredData:any) { 
      this.afs.doc(`posts/${id}`).update(featuredData)
      .then(()=>{''
        this.toastr.info('Feature status updated');
        
      })
  }
}
