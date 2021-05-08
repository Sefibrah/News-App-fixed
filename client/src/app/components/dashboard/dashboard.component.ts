import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { NotyfService } from 'src/app/services/notyf.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('searchForm') searchForm: NgForm
  articles: Article[] = []
  filteredArticles: Article[]
  searchQuery: string
  isArticleFormHidden: boolean = true

  constructor(private articleService: ArticlesService, private notyf: NotyfService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(a => this.articles = a)
    this.route.queryParams.subscribe(r => {
      if (r.isArticleFormHidden) this.isArticleFormHidden = r.isArticleFormHidden
    })
  }

  ngAfterViewInit() {
    this.search()
  }

  search() {
    this.searchForm.valueChanges.subscribe(r => {
      // console.log(r.search)
      if (r.search != undefined && r.search != '') {
        this.articleService.searchArticle(r.search).subscribe(a => {
          this.filteredArticles = a
        })
      } else this.filteredArticles = null
    })
  }

  create() {
    this.isArticleFormHidden = false
  }

  edit() {
    this.isArticleFormHidden = false
  }

  delete(a: Article) {
    this.articleService.deleteArticle(a.id).subscribe(
      r => this.notyf.success("Article deleted successfuly"),
      err => {
        if (err.status != 200) {
          this.notyf.error(err)
          console.log(err)
        } else this.notyf.success("Article deleted successfuly")
      })
  }
}
