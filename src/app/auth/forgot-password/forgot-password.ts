import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.sass'
})
export class ForgotPassword {
  // Initialisation d'un user vide
  public user: ResetPasswordForm = {
    email: ""
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  resetPassword() {
    // Utilisation du service d'authentification pour réinitialiser le mot de passe du compte user.
    this.authService.resetPassword(this.user).subscribe({
      next: data => {
        this.user = data;
        if (data.code == 200) {
          this.router.navigate(['/confirm/resetPassword']);
        }

      }
    })
  }

}

// création d'un type personnalisé pour limiter les erreurs d'api.
export type ResetPasswordForm = {
  email: string;
}
