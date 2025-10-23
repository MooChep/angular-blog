import {Component} from '@angular/core';
import {Article, ArticleService} from '../services/article-service';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../auth/services/auth-service';

@Component({
  selector: 'app-create-article-page',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './create-article-page.html',
  styleUrl: './create-article-page.sass'
})
export class CreateArticlePage {
  // Initialise un article vide.
  public article: Article = {
    title: '', desc: '', author: '', imgPath: ''
  };
  public email: any;

  constructor(private articleService: ArticleService, private router: Router, private authService: AuthService,) {
  }

  ngOnInit() {
    // si l'utilisateur est déconnecté alors, il ne peut pas créer d'article et doit aller se connecter.
    if (this.email == null || this.email === '') {
      this.router.navigate(['/connexion/unauthorized']);
    } else {
    }
  }

  onClickCreateArticle(): void {
    // création de l'article avec les valeurs du formulaire.
    this.articleService.createArticle(this.article).subscribe({
      next: data => {
        this.article = data;
        this.router.navigate(['/confirm/create']);
      }
    })
  }


}

