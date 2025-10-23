import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth-service';
import {ActivatedRoute, Router} from '@angular/router';

//Typage pour le message de connexion en cas d'erreurs
type MessageHeaderType = 'unauthorized' | 'credentials';
type MessageContentType = string;

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.sass'
})

export class Connexion {
  // initialisation d'un user vide
  public user: LoginForm = {
    email: "", password: "",
  }
  // création d'un user avec des identifiants correctes pour simplifier le développement
  // public user: LoginForm = {
  //   email: "isaac@gmail.com", password: "password",
  // }

  // Liste des messages d'erreur avec leur titre et contenu. Type Record permet de combiner plusieurs types différents.
  public messages: Record<MessageHeaderType, MessageContentType> = {
    unauthorized: "Contenu nécéssitant un compte.", credentials: "Email ou mot de passe incorect"
  };
// Initialise le message final qui sera affiché
  public outputErrorMessage: string = "";

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    // récupere le header du message dans l'url si il match avec un des header dans MessageHeaderType
    const message = this.activatedRoute.snapshot.paramMap.get('message') as MessageHeaderType | null;
    // Si le message existe dans l'url alors, on l'affecte au message de retour sinon on ressaie de se connecter, mais cette fois sans message.
    if (message) {
      this.outputErrorMessage = this.messages[message];
    } else {
      this.router.navigate(['/connexion']);
    }
  }

// fonction pour se connecter via l'api avec les identifiants du formulaire
  tryConnexion() {
    this.authService.login(this.user).subscribe({
      next: data => {
        this.user = data;
        if (data.code == 200) {
          // ici, on stocke le token généré lors de l'identification dans le stockage local du navigateur.
          localStorage.setItem('token_jwt', data.data);
          //Puis, on confirme la connexion
          this.router.navigate(['/confirm/connect']);
        } else if (data.code == 768) {
          // code 768 = mauvais couple mdp/email donc on renvoie l'utilisateur sur la page de connexion avec le message d'erreur correspondant.
          this.router.navigate(['/connexion/credentials']);
        }
      }
    })
  }
}

//Le type pour les données du formulaire pour eviter les erreurs.
export type LoginForm = {
  email: string; password: string;
}
