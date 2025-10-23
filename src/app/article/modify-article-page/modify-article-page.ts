import {Component} from '@angular/core';
import {Article, ArticleService} from '../services/article-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-modify-article-page',
  imports: [CommonModule, FormsModule, HttpClientModule,],
  templateUrl: './modify-article-page.html',
  styleUrl: './modify-article-page.sass'
})
export class ModifyArticlePage {
// initialisation d'un article vide
  public article: Article = {
    title: '', desc: '', author: '', imgPath: ''
  };

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router,) {
  }

  ngOnInit(): void {
    // récupération de l'id dans l'url et du contenu de l'article existant sinon redirection vers page d'erreur si l'article n'existe pas
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticle(articleId).subscribe({
        next: (data) => {
          console.log(data);
          if (data.code == 200) {
            this.article = data.data;
          } else {
            this.router.navigate(['/confirm/errorArticle']);
          }
        }
      });
    }
  }

// Modifie l'article selon le formulaire.
  onClickModifyArticle(): void {
    this.articleService.modifyArticle(this.article).subscribe({
      next: data => {
        if (data.code == 200) {
          this.article = data.data
          this.router.navigate(['/confirm/modify']);
        } else {
          this.router.navigate(['/confirm/error']);
        }
      }
    })
  }


}

