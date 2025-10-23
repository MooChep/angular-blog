# angular-blog

Blog simple développé avec Angular (TypeScript) faisant appel à une api externe. 

## 1. Contexte et objectif

Ce projet vise à proposer une application 
web de type blog, permettant la création, l’affichage et 
la gestion d’articles. Il est construit afin de respecter les 
attentes pédagogiques du module **« Framework JS »** du cursus **Administrateur des systèmes d'informations**.

## 2. Fonctionnalités principales
### A. Blog
* Affichage d’une liste d’articles.
* Consultation d’un article individuel.
* Création et modification d’un article (via formulaire).
* Système d'authentification : connexion, inscription, récupération de compte.
### B. Technologie
* Architecture modulaire utilisant Angular : composants, services, routing.
* Utilisation de TypeScript, typage, classes, liaison données (data-binding).
* Style et structure sobres, code conçu pour être facilement maintenable.

## 3. Architecture technique

* Le dossier `src/app/` contient les modules Angular, composants et services.
* Routing : configuration via `app-routes.ts`, gestion des chemins vers les articles et l'authentification. Gestion des paramètres dans les urls. Ex: /article:id
* Service de type `ArticleService` : contient les opérations CRUD (création, lecture, modification, suppression) sur les articles.
* Exemple de composants :
  * `ArticleDetailsPage` : Affichage d’un article à partir d’un identifiant.
  * `ArticleForm` : Formulaire pour création/édition.
  * Composants additionnels pour l'authentification ou encore des confirmations personnalisées.
* Utilisation de modules Angular standards : `FormsModule` pour le formulaire, `HttpClientModule` pour la redirection de pages.
* Architecture simple, mais respectueuse des bonnes pratiques Angular : séparation des composants et des services, usage de modules, typage TypeScript.

## 4. Installation et exécution

1. Cloner ce dépôt :

   ```bash
   git clone https://github.com/MooChep/angular-blog.git  
   ```
2. Se positionner dans le répertoire :

   ```bash
   cd angular-blog  
   ```
3. Installer les dépendances :

   ```bash
   npm install  
   ```
4. Cloner l'api :
   ```bash
   git clone https://github.com/Chocolaterie/ApiArticle
   ```
5. Se positionner dans le répertoire :

   ```bash
   cd ApiArticle  
   ```
   
6. Lancer le serveur :

   ```bash
   npm start
   ``` 
    Les requêtes sont à effectuer à `http://localhost:3000`


7. Lancer le serveur de développement :

   ```bash
   ng serve  
   ```
   puis ouvrir dans le navigateur l’URL `http://localhost:4200`.

## 6. Extension possible

* Ajouter des catégories/tags, pagination, recherche.
* Ajouter des tests unitaires (via `Karma`/`Jasmine`) et des tests de bout en bout (via `Protractor` ou moderne `Cypress`).
* Page “Mon profil” utilisateur et édition du compte
* Commentaires ou mini-forum sous un article
* Statistiques / Dashboard d’administration
* Favoris / Bookmarking des articles
* Pagination infinie ou “load more” pour la liste d’articles

## 7. Structure du dépôt

```
angular-blog/
│
├─ src/
│   ├─ app/
│   │   ├─ article/
│   │   ├─ auth/
│   │   ├─ services/
│   │   ├─ app.routes.ts
│   │   └─ app.ts
│   └─ index.html
│
├─ angular.json
├─ package.json
└─ README.md
```

## 8. Conventions et bonnes pratiques suivies

* Typage TypeScript explicite (interfaces, classes).
* Séparation logique entre composants (vue) et services (logique métier).
* Usage du système de routing d’Angular pour navigation fluide.
* Utilisation d'une structure Angular claire et modulaire.
* Code commenté et lisible pour faciliter la maintenance et l’extension.

