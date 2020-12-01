import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit{

  enteredTitle = "";
  enteredContent = "";
  post: Post;
  form: FormGroup;
  private postId:string = "";

  constructor(public postsService: PostsService,
              private routes: ActivatedRoute
    ) {}

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });

    this.routes.paramMap.subscribe((paramMap: ParamMap) => {
        if(paramMap.has('postId')){
            this.postId = paramMap.get('postId');
            this.postsService.getPost(this.postId).subscribe((postData) => {
              debugger;
              this.post = {
                id: postData._id,
                title: postData.title,
                content: postData.content,
                // imagePath: postData.imagePath,
                // creator: postData.creator
              };
              this.form.setValue({
                  title: this.post.title,
                  content: this.post.content
              });
            })
        }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.postsService.addPost(this.form.value.title, this.form.value.content);
    this.form.reset();
  }
}
