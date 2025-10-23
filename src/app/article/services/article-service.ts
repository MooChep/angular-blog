import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class ArticleService {
  // Lien vers l'api permettant une maintenabilité optimale en cas de changement d'url d'accès
  private readonly apiEndPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

// Requêtes http suivant la documentation de l'api. Dans certains cas on injecte des parametres dans l'url comme les id. Certaines fois on injecte la donnée dans le body comme le contenu de l'article.
  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/articles`);
  }

  getArticle(id: string) {
    return this.http.get<any>(`${this.apiEndPoint}/articles/${id}`);
  }

  deleteArticle(id: string) {
    return this.http.delete<any>(`${this.apiEndPoint}/articles/${id}`);
  }

  modifyArticle(article: Article) {
    return this.http.post<any>(`${this.apiEndPoint}/articles/save`, article);
  }

  createArticle(article: Article) {
    return this.http.post<any>(`${this.apiEndPoint}/articles/save`, article);
  }
}

// Type Article qu'on retrouve dans différentes pages permettant de s'assurer de la conformité de l'input dans l'api afin de minimiser les erreurs.
export type Article = {
  id?: number;
  title: string;
  desc: string;
  author: string;
  imgPath: string;
}

