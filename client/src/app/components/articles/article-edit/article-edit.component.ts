import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { NotyfService } from 'src/app/services/notyf.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.sass']
})
export class ArticleEditComponent implements OnInit {
  article: Article
  thumbnail: string
  @ViewChild('createForm') createForm: NgForm
  constructor(private articleService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute,
    private notyf: NotyfService) { }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      if(r.id)
        this.articleService.getArticle(r.id).subscribe(a => {
          this.article = a
          this.thumbnail = this.article.thumbnail
        })
    })
    // this.route.url.subscribe((r: any) => {
    //   if (r[0].path == "create")
    //   console.log(r[0].path)
    // })
  }

  create() {
    this.articleService.createArticle(this.createForm.form.value).subscribe(r => {
      this.notyf.success("Post created successfuly")
    }, err => this.notyf.error(err))
  }


  edit() {
    this.articleService.updateArticle(this.createForm.form.value).subscribe(r => {
      this.notyf.success("Post edited successfuly")
    }, err => {
      this.notyf.error(err)
      console.log(err)
    })
  }

  close() {
    this.router.navigate(['dashboard'], {
      queryParams: { isArticleFormHidden: true },
      queryParamsHandling: 'merge',
    })
  }
}
