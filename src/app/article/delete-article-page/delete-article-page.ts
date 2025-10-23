import {Component} from '@angular/core';
import {ArticleService} from '../services/article-service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-delete-article-page',
  imports: [HttpClientModule,],
  templateUrl: './delete-article-page.html',
  styleUrl: './delete-article-page.sass'
})
export class DeleteArticlePage {
  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

// récupère l'id de l'article dans le lien et supprime l'article si il existe.
  ngOnInit() {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.deleteArticle(articleId).subscribe({
        next: data => {
          if (data.code == 200) {
            this.router.navigate(['/confirm/delete']);
          } else {
            this.router.navigate(['/confirm/errorArticle']);
          }
        }
      })
    }
  }
}
