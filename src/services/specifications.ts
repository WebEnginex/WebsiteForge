import { Answer, ProjectType } from '../types';

function formatAnswerValue(value: string | string[] | { primary: string; secondary: string; accent: string }): string {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object' && value !== null) {
    return `Couleurs: Principal=${value.primary}, Secondaire=${value.secondary}, Accent=${value.accent}`;
  }
  return value;
}

function formatAnswers(answers: Answer[]): string {
  let formattedAnswers = '';
  let currentCategory = '';

  answers.forEach((answer) => {
    if (answer.category !== currentCategory) {
      currentCategory = answer.category;
      formattedAnswers += `\n### ${currentCategory}\n`;
    }

    if (answer.questionId === 'color-scheme') {
      const colors = answer.value as { primary: string; secondary: string; accent: string; background: string; text: string };
      formattedAnswers += '\nPalette de couleurs :\n';
      formattedAnswers += `- Couleur primaire : ${colors.primary}\n`;
      formattedAnswers += `- Couleur secondaire : ${colors.secondary}\n`;
      formattedAnswers += `- Couleur d'accent : ${colors.accent}\n`;
      formattedAnswers += `- Couleur de fond : ${colors.background}\n`;
      formattedAnswers += `- Couleur de texte : ${colors.text}\n`;
    } else {
      formattedAnswers += `\n${formatAnswerValue(answer.value)}\n`;
    }
  });

  return formattedAnswers;
}

export async function generateSpecifications(projectType: ProjectType, answers: Answer[]): Promise<string> {
  const formattedAnswers = formatAnswers(answers);

  const prompt = `
En tant qu'expert en développement web, génère un cahier des charges détaillé pour un projet web en utilisant ces informations :

Type de projet : ${projectType}

${formattedAnswers}

Le cahier des charges doit inclure :

1. Présentation du Projet
   - Contexte et objectifs
   - Public cible
   - Périmètre du projet

2. Spécifications Fonctionnelles
   - Architecture du site
   - Description détaillée des fonctionnalités
   - Parcours utilisateur

3. Spécifications Techniques
   - Stack technologique (front-end, back-end, base de données)
   - Hébergement et infrastructure
   - Performances et sécurité

4. Design et Ergonomie
   - Charte graphique (avec les codes couleur exacts)
   - Responsive design
   - Accessibilité

5. Contenu et Médias
   - Types de contenus
   - Sources des médias
   - Formats acceptés

6. Intégrations
   - Services tiers
   - APIs externes
   - Réseaux sociaux

7. Maintenance et Support
   - Type de maintenance
   - Mises à jour
   - Support technique

8. Planning et Phases
   - Découpage en sprints
   - Délais par phase
   - Livrables

9. Budget et Ressources
   - Estimation des coûts
   - Ressources nécessaires

Format le cahier des charges de manière professionnelle avec des sections claires et des sous-sections.
Utilise Markdown pour la mise en forme.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en développement web spécialisé dans la rédaction de cahiers des charges pour des projets web modernes. Tu dois prendre en compte que le développeur est un expert full-stack indépendant qui utilise Windsurf et qui peut réaliser des sites vitrines en 5-7 jours maximum. Ses estimations et plannings doivent refléter cette efficacité. Il travaille seul et maîtrise tous les aspects du développement (design, frontend, backend, tests, déploiement)."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération du cahier des charges');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function generateWindsurfRules(projectType: ProjectType, answers: Answer[]): Promise<string> {
  try {
    const prompt = `Génère les règles Windsurf pour ce projet.

Type de projet : ${projectType}

Informations du projet :
${answers.map(a => `${a.category} - ${a.questionId}: ${formatAnswerValue(a.value)}`).join('\n')}

Structure des règles :

CONFIGURATION WINDSURF
---------------------

1. STACK TECHNIQUE
   - Frontend
   - Backend
   - Base de données
   - APIs

2. STRUCTURE DU PROJET
   - Dossiers principaux
   - Fichiers de configuration
   - Variables d'environnement

3. FONCTIONNALITÉS
   - Essentielles
   - Optionnelles

4. SÉCURITÉ
   - Authentification
   - Autorisation
   - Protection des données

5. PERFORMANCE
   - Métriques cibles
   - Optimisations

Génère les règles de manière claire et structurée en texte simple.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es Windsurf, un IDE intelligent spécialisé dans la configuration de projets web. Génère des règles claires et structurées en format texte."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la génération des règles Windsurf');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}
