import {Routes} from '@angular/router';
import {Connexion} from './auth/connexion/connexion';
import {Inscription} from './auth/inscription/inscription';
import {ForgotPassword} from './auth/forgot-password/forgot-password';
import {ArticleDetailsPage} from './article/article-details-page/article-details-page';
import {DeleteArticlePage} from './article/delete-article-page/delete-article-page';
import {ModifyArticlePage} from './article/modify-article-page/modify-article-page';
import {MainPage} from './main-page/main-page';
import {CreateArticlePage} from './article/create-article-page/create-article-page';
import {Logout} from './auth/logout/logout';
import {ConfirmationPage} from './article/confirmation-page/confirmation-page';

export const routes: Routes = [
  {path: "connexion", component: Connexion},
  {path: "connexion/:message", component: Connexion}, // page de connexion avec affichage de message d'erreur
  {path: "inscription", component: Inscription},
  {path: "forgot-password", component: ForgotPassword},
  {path: "article/:id", component: ArticleDetailsPage},
  {path: "delete/:id", component: DeleteArticlePage},
  {path: "modify/:id", component: ModifyArticlePage},
  {path: "create", component: CreateArticlePage},
  {path: "list", component: MainPage},
  {path: "confirm/:reason", component: ConfirmationPage},
  {path: "logout", component: Logout},
  {path: '**', redirectTo: '/list'} // redirige toutes les routes inconnues
];
