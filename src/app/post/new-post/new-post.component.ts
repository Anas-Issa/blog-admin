import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
permalink:string='';
imgSrc:any= './assets/placeholder-image.png';
selectdImage:any;
categories:any[]=[];
  postForm!: FormGroup;
  post:any;
  formStatus:string='Add new';
  docId:string='';
  imgChanged:boolean=false;
;/**
 *
 */
constructor(private caategoryService:CategoriesService,
  private fb:FormBuilder,
  private postService:PostsService,
  private route:ActivatedRoute
  )
 {

  this.route.queryParams.subscribe(val=>{
     this.docId=val.id;
       if(this.docId){
      this.postService.loadOnePost(val.id).subscribe(post=>{
        this.post=post;
       

      
    this.postForm=this.fb.group({
    title:[this.post.title,[Validators.minLength(5),Validators.required]],
    permalink:[this.post.permalink,[Validators.required]],
    excerpt:[this.post.excerpt,[Validators.required,Validators.minLength(10)]],
    category:[`${this.post.category.categoryId}-${this.post.category.category}`,[Validators.required]],
    postImg:[''],
    content:[this.post.content,[Validators.required]]
  }) ;
  this.imgSrc=this.post.postImgPath;
  this.formStatus='Edit';
  console.log("this.post.permalink",this.post.permalink)
;

      });
        }
        else { 
    this.postForm=this.fb.group({
    title:['',[Validators.minLength(5),Validators.required]],
    permalink:['',[Validators.required]],
    excerpt:['',[Validators.required,Validators.minLength(10)]],
    category:['',[Validators.required]],
    postImg:['',[Validators.required]],
    content:['',[Validators.required]]
  }) ;
        }


  });

  
}
  ngOnInit(): void {
    this.caategoryService.loadData()
    .subscribe(data=>{
      this.categories=data;
        this.postForm.controls['permalink'].setValue(this.post.permalink);



    })
    ;
  }

  get fc(){
    return this.postForm.controls;
  }
  onTitleChanged($event:any){
    const title=$event.target.value;
   this.permalink= title.replace(/\s/g,'-');

  }
  showPreview($event:any){
    this.imgChanged=true;
    const reader=new FileReader();
    reader.onload=(e)=>{
      this.imgSrc=e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectdImage=$event.target.files[0];
  }
  onSubmit(){
    let splitted=this.postForm.value.category.split('-');

   const postData:Post={
    title:this.postForm.value.title,
    permalink:this.postForm.value.permalink,
    category:{
      categoryId:splitted[0],
      category:splitted[1]
    },
    postImgPath:this.imgSrc,
    excerpt:this.postForm.value.excerpt,
    content:this.postForm.value.content,
    isFeatured:false,
    views:0,
    status:'new',
    createdAt:new Date()

   }

   this.postService.uploadImage(this.selectdImage,postData,this.formStatus,this.docId,this.imgChanged);
   this.imgSrc='./assets/placeholder-image.png';
   this.postForm.reset();
   
  }
}
