import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

// Création d'un type pour les clés du tableau de raison: cela permet de checker si le lien cherche a rediriger vers une page existante. Et de maintenir facilement les messages de confirmation.
type ReasonType =
  | 'modify'
  | 'delete'
  | 'connect'
  | 'resetPassword'
  | 'disconnect'
  | 'create'
  | 'inscription'
  | 'error'
  | 'errorArticle';
// contenu du message de confirmation avec header étant une des clés définies précédemment.
type ReasonContent = {
  header: string; paragraph: string;
};

@Component({
  selector: 'app-confirmation-page',
  imports: [RouterLink, HttpClientModule],
  templateUrl: './confirmation-page.html',
  styleUrl: './confirmation-page.sass'
})
export class ConfirmationPage {

// initialisation vide du message final qui sera affiché.
  public displayedText: ReasonContent = {
    header: '', paragraph: ''
  };
  // Liste des messages de confirmation avec le titre, le paragraphe, idéalement sur le serveur api mais ici en dur dans le front ce qui permet une marge de modification importante pour l'affichage.
  public paragraphsReason: Record<ReasonType, ReasonContent> = {
    // Paragraph rédigés avec ChatGpt pour ajouter une touche de légerté.
    modify: {
      header: 'Article mis à jour',
      paragraph: 'Ton article a été rafraîchi avec succès, il est maintenant tout propre dans la base de données.'
    }, delete: {
      header: 'Article supprimé',
      paragraph: 'Ton article a disparu du site. Un petit moment de silence pour lui... puis on passe à la suite.'
    }, connect: {
      header: 'Connexion réussie',
      paragraph: 'Bienvenue à bord ! Tes identifiants ont été validés sans accroc, tu peux explorer tranquille.'
    }, resetPassword: {
      header: 'Mot de passe réinitialisé',
      paragraph: 'Ton ancien mot de passe est parti à la retraite. Le nouveau est fin prêt à assurer la relève.'
    }, disconnect: {
      header: 'Déconnexion effectuée',
      paragraph: 'Tu es maintenant déconnecté. À bientôt, le site garde ta place au chaud.'
    }, create: {
      header: 'Nouvel article créé',
      paragraph: 'Bravo, ton article a rejoint la collection. Un de plus, et pas des moindres.'
    }, inscription: {
      header: 'Bienvenue parmi nous',
      paragraph: 'Ton inscription est validée. Installe-toi confortablement, tu es ici chez toi.'
    }, error: {
      header: 'Page introuvable',
      paragraph: "Oups... Ce que tu cherches n'existe pas (ou plus). Peut-être que le lien est cassé, ou qu'un article a pris la fuite."
    }, errorArticle: {
      header: 'Article introuvable',
      paragraph: "Impossible de retrouver cet article. Il a peut-être été supprimé, renommé, ou n’a jamais existé."
    }
  };

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    //récupération de la raison sur la route et affectation de celle-ci au type ReasonType ou null défini plus haut.
    const reason = this.activatedRoute.snapshot.paramMap.get('reason') as ReasonType | null;
    // si la raison et le paragraphe sont valides alors, on affiche les valeurs.
    if (reason && this.paragraphsReason[reason]) {
      this.displayedText = this.paragraphsReason[reason];
    } else {
      this.displayedText = this.paragraphsReason.error;
    }
  }
}
