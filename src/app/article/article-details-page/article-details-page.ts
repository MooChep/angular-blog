import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Article, ArticleService} from '../../services/article-service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-article-details-page',
  imports: [HttpClientModule, RouterLink,],
  templateUrl: './article-details-page.html',
  styleUrl: './article-details-page.sass'
})
export class ArticleDetailsPage {
  // Initialisation d'un article vide
  public article: Article = {
    id: 0, title: '', desc: '', author: '', imgPath: ''
  };

// Importation des services et modules nécéssaires
  constructor(private router: Router, private articleService: ArticleService, private activatedRoute: ActivatedRoute, public authService: AuthService) {
  }

  ngOnInit() {
    // récupération de l'id de l'article présent dans l'url
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (articleId) {
      //récupération du contenu de l'article s'il existe.
      this.articleService.getArticle(articleId).subscribe({
        next: data => {
          if (data.code == 200) {
            this.article = data.data
          } else {
            // s'il n'existe pas alors, on redirige vers la page d'erreur
            this.router.navigate(['/confirm/error']);
          }
        }
      })
    }
  }

}
