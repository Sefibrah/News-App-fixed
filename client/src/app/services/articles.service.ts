import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  baseUrl: string = environment.apiUrl + 'article'
  baseUrlAdmin: string = environment.apiUrl + 'admin/article/'
  articles: Article[] = []

  constructor(private http: HttpClient) { }

  getArticles() {
    if (this.articles.length > 0) return of(this.articles)
    return this.http.get<Article[]>(this.baseUrl).pipe(map(a => {
      this.articles = a
      return a
    }))
  }

  getArticle(id: number) {
    if (this.articles.length > 0) return of(this.articles[this.articles.indexOf(this.articles.find(a => a.id == id))])
    return this.http.get<Article>(this.baseUrl + '/' + id)
  }

  searchArticle(query: string) {
    let params = new HttpParams();
    params = params.append('query', query.toLocaleLowerCase());
    // if (this.articles.length > 0) {
    //   return of(this.articles.filter(a => {
    //     return (a.title.toLowerCase().includes(query?.toLowerCase())
    //       || a.content.toLowerCase().includes(query?.toLowerCase()))
    //   }))
    // }
    return this.http.get<Article[]>(this.baseUrl + '/search', { params })
  }

  createArticle(a: any) {
    this.articles.push(a)
    return this.http.post(this.baseUrlAdmin + 'create', { ...a }, { responseType: 'text' })
  }

  updateArticle(ar: Article) {
    const indexToUpdate = this.articles.indexOf(this.articles.find(a => a.id = ar.id))
    this.articles[indexToUpdate] = ar
    return this.http.put(this.baseUrlAdmin + 'update', ar, { responseType: 'text' })
  }

  deleteArticle(id: number) {
    const indexToUpdate = this.articles.indexOf(this.articles.find(a => a.id == id))
    this.articles.splice(indexToUpdate, 1)
    return this.http.delete<Article>(this.baseUrlAdmin + 'delete/' + id)
  }
}
