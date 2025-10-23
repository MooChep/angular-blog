import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './inscription.html',
  styleUrl: './inscription.sass'
})
export class Inscription {
  // Initialisation d'un user prérempli pour faciliter le développement
  public user: SingUpForm = {
    email: "il@gmail.com",
    password: "1234",
    passwordConfirm: "1234",
    pseudo: "Ilan",
    cityCode: "44000",
    city: "Naoned",
    phone: "0696691342",
  }
  // User vide a utiliser en production
  // public user : SingUpForm = {
  //   email: "",
  //   password: "",
  //   passwordConfirm: "",
  //   pseudo: "",
  //   cityCode: "",
  //   city: "",
  //   phone: "",
  // }
  constructor(private authService: AuthService, private router: Router,) {
  };

  createUser() {
    // Utilise les données du formulaire pour ajouter un utilisateur grace à l'api
    this.authService.signUp(this.user).subscribe({
      next: data => {
        this.user = data;
        if (data.code == 200) {
          this.router.navigate(['/confirm/inscription']);
        } else {
          this.router.navigate(['/confirm/error']);
        }
      }
    })
  }
}

// type personnalisé pour éviter les erreur lors de l'envoi vers l'api.
export type SingUpForm = {
  email: string,
  password: string,
  passwordConfirm: string,
  pseudo: string,
  cityCode: string,
  city: string,
  phone: string,
}
