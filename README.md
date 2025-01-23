# Assistant personnel pour la création de projets web

## Introduction

Ce projet, nommé **Assistant personnel pour la création de projets web**, a pour objectif principal d'automatiser la génération de cahiers des charges et de règles d'IA spécifiques aux projets. Il est destiné à un usage exclusif par l'utilisateur pour structurer efficacement les projets avec rapidité et précision.

## Technologies utilisées

- **React** pour le front-end
- **Vite** pour le bundling

## Création d'un projet React avec TypeScript et Vite

1. **Créer un nouveau projet Vite** :
   Ouvrez votre terminal et exécutez la commande suivante :
   ```bash
   npm create vite@latest my-react-app --template react-ts
   ```
   Remplacez `my-react-app` par le nom que vous souhaitez donner à votre projet.

2. **Naviguer dans le dossier du projet** :
   ```bash
   cd my-react-app
   ```

3. **Installer les dépendances** :
   ```bash
   npm install
   ```

4. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```

## Fonctionnalités principales

1. **Sélection du type de projet** :
   - Choix parmi : Site vitrine, Web app, Site e-commerce
   - Activation d'un prompt spécifique pour chaque type de projet

2. **Questionnaires interactifs et dynamiques** :
   - Questions posées une par une avec options de navigation et sauvegarde automatique

## Architecture technique

### Front-end
- Framework : React
- Bundler : Vite

## UX/UI

- Design épuré et moderne
- Tableau de bord simple
- Navigation fluide

## Fonctionnalités spécifiques par type de projet

### Site vitrine
- Collecte d'informations sur l'identité visuelle, la structure des pages, et les fonctionnalités

### Web app
- Collecte d'informations sur les rôles, l'authentification, et les fonctionnalités principales

### E-commerce
- Collecte d'informations sur la structure des produits, l'expérience utilisateur, et le paiement

## Livrables

- Cahiers des charges : Affichage web interactif avec sections navigables
- Règles IA spécifiques : Format JSON/YAML avec interface d'édition

## Sécurité et performance

- Interface responsive
- Temps de chargement rapide
- Compatible avec les navigateurs modernes

## Déploiement et maintenance

- Déploiement continu sur Netlify
- Maintenance régulière pour intégrer de nouvelles fonctionnalités

## Guide étape par étape

### Étape 1 : Création de la page d'accueil

- Concevez une interface avec trois boutons pour sélectionner le type de projet :
  - **Site vitrine**
  - **Web app**
  - **Site e-commerce**
- Chaque bouton doit déclencher un prompt spécifique envoyé à l'API pour adapter les questions au projet sélectionné.

### Étape 2 : Questionnaires interactifs et dynamiques

- Affichez les questions une par une, adaptées au type de projet choisi.
- Fournissez des options pour :
  - Répondre directement dans l'interface
  - Passer à la question suivante en cliquant sur **Suivant**
  - Revenir à une question précédente pour modifier une réponse
- Assurez-vous que les réponses sont stockées temporairement en mémoire.

### Étape 3 : Génération de livrables

- Générez des cahiers des charges structurés et des règles IA spécifiques (`workspace_ai_rules`).
- Affichez les livrables sur le site avec des sections navigables et des options de copie.

### Étape 4 : Optimisation via prompt initial

- Utilisez un prompt initial pour guider l'IA avec des directives spécifiques :
  > Tu es une IA spécialisée dans la création de cahiers des charges et de règles IA spécifiques pour des projets web (sites vitrines, web apps, e-commerces). Pose des questions précises adaptées à chaque projet, puis génère des livrables complets et détaillés en respectant les meilleures pratiques.
- Ajustez le prompt pour affiner les comportements en fonction des retours ou des besoins.

### Étape 5 : Gestion des projets et modèles réutilisables

- Sauvegardez automatiquement les projets localement.
- Créez des modèles préremplis pour les projets récurrents.
- Accédez à un tableau de bord pour :
  - Visualiser la liste des projets récents
  - Utiliser la fonction de recherche pour retrouver rapidement des projets.

## Guide d'implémentation étape par étape

### Étape 1 : Configuration initiale
1. Créer un nouveau projet React
2. Installer les dépendances :
   ```bash
   npm install @types/node @types/react @types/react-dom
   ```
3. Configurer Vite pour utiliser TypeScript

### Étape 2 : Création de la page d'accueil
1. Créer le composant de sélection de projet :
   - Trois boutons : Site vitrine, Web app, Site e-commerce
   - Style moderne avec dégradés et effets de survol
   - Gestion des événements de clic pour chaque bouton

2. Implémenter la logique de sélection :
   ```typescript
   const handleProjectSelection = (type: 'vitrine' | 'webapp' | 'ecommerce') => {
     // Déclencher le prompt approprié
     // Passer à l'étape des questions
   }
   ```

### Étape 3 : Système de questions
1. Créer le composant de questionnaire :
   - Affichage d'une question à la fois
   - Navigation entre les questions
   - Stockage temporaire des réponses

2. Implémenter la logique de navigation :
   ```typescript
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [answers, setAnswers] = useState<Record<string, string>>({});
   ```

### Étape 4 : Intégration de l'API ChatGPT
1. Configurer l'appel API :
   - Prompts spécifiques pour chaque type de projet
   - Gestion des réponses de l'API
   - Transformation des réponses en livrables

### Étape 5 : Affichage des livrables
1. Créer les composants d'affichage :
   - Cahier des charges avec sections navigables
   - Règles IA en format JSON/YAML
   - Boutons de copie

2. Implémenter la copie des livrables :
   ```typescript
   const copyToClipboard = async (content: string) => {
     await navigator.clipboard.writeText(content);
   }
   ```

### Étape 6 : Style et responsive
1. Appliquer les styles CSS :
   - Utiliser les classes personnalisées
   - Assurer la compatibilité mobile
   - Ajouter les animations et transitions

### Étape 7 : Tests et optimisation
1. Tester tous les parcours utilisateur :
   - Sélection de projet
   - Navigation dans les questions
   - Génération et copie des livrables
2. Optimiser les performances :
   - Chargement des composants
   - Temps de réponse de l'API