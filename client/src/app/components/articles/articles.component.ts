import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = []
  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe(ar => this.articles = ar,
      err => console.log(err))
  }

}
