import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {


  postsArray:any[]=[];
  constructor(private postService:PostsService) {
    
    
  }
  ngOnInit(): void {
    this.postService.loadData().subscribe(val=>{
      console.log(val);
      this.postsArray=val;
    });
  }
  onDelete(path:string,id:string){
    this.postService.deleteImage(path,id);
  }
  onFeatured(id:string,status:any){
    const featurdData={
      isFeatured:status
    }
    this.postService.markFeatured(id,featurdData );
  }
}
