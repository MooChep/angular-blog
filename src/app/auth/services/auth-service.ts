import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginForm} from '../connexion/connexion';
import {SingUpForm} from '../inscription/inscription';
import {ResetPasswordForm} from '../forgot-password/forgot-password';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  // ** Work in progress **
  // WritableSignal est utilisé pour permettre la mise à jour réactive des composants sans rechargement global de la page.
  // Contexte : certaines vues avec des conditions sur l’état de connexion ne se mettaient pas à jour après authentification.
  // Exemple : la connexion d’un utilisateur (ex. “Isaac@gmail.com”) n’entraînait pas la mise à jour immédiate de l’affichage.

  public email = signal<string | null>(null);
  // Url vers l'api pour une meilleur maintenabilité
  private readonly apiEndPoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.loadEmailFromToken()
  }

  loadEmailFromToken() {
// Cette méthode extrait l’adresse email contenue dans le token JWT stocké dans le localStorage.
// Elle décode la deuxième partie du token (le payload), puis lit la clé "email" dans les données décodées.
// Si un token valide est trouvé, la valeur de l’email est mise à jour via la variable `this.email`.
// Si aucun token n’est présent ou qu’il est invalide, la variable est réinitialisée à `null`.

    const authToken = localStorage.getItem('token_jwt');
    if (authToken) {
      // récupère la partie centrale du token, le payload mais pas encore décodé donc en base 64
      const base64 = authToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      // décode le payload avec la fonction atob pour en faire un texte ascii
      const payload = atob(base64);
      // récupère l'email présent dans le json derriere la clé email.
      const email = JSON.parse(payload).email;
      // la valeur est transmise au signal this.email
      this.email.set(email);
    } else {
      this.email.set(null);
    }
    return this.email;
  }

  // Méthode de déconnexion qui permet de supprimer le token du LocalStorage ce qui à pour résultat de déconnecter l'utilisateur.
  // Réinitialise this.email à null pour enlever toute trace de connexion.
  logout() {
    localStorage.removeItem('token_jwt');
    this.email.set(null);
  }

  // méthode de connexion qui utilise l'api pour se connecter avec les identifiants de l'utilisateur présent dans userData.
  login(userData: LoginForm) {
    return this.http.post<any>(`${this.apiEndPoint}/login`, userData);
  }

  // méthode d'inscription qui utilise l'api pour créer un compte avec les identifiants de l'utilisateur présent dans userData.
  signUp(userData: SingUpForm): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/signup`, userData);
  }

  // méthode de réinitialisation du mot de passse qui utilise l'api et l'email utilisateur.
  resetPassword(userData: ResetPasswordForm) {
    return this.http.post<any>(`${this.apiEndPoint}/reset-password`, userData);
  }

// Les paramètres passés à ces méthodes utilisent des **types personnalisés** (LoginForm, SignUpForm, ResetPasswordForm).
// Ces types définissent précisément la forme attendue des données (comme l’email ou le mot de passe)
// afin d’assurer que les requêtes envoyées à l’API respectent le bon format.
}

