import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  article: Article
  constructor(private articleService: ArticlesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      this.articleService.getArticle(r.id).subscribe(a => this.article = a)
    })
  }

}
