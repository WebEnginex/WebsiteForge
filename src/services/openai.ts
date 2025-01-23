import OpenAI from 'openai';
import { ProjectType, Answer, ColorScheme } from '../types';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || !(apiKey.startsWith('sk-') || apiKey.startsWith('sk-proj-'))) {
  console.error('Clé API OpenAI invalide ou manquante');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export interface GenerationResult {
  success: boolean;
  content?: string;
  error?: string;
}

export async function generateWebsiteContent(
  projectType: ProjectType,
  answers: Answer[]
): Promise<GenerationResult> {
  try {
    const prompt = buildPrompt(projectType, answers);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en développement web qui aide à générer du contenu et des recommandations pour des sites web. Fournis des réponses détaillées et structurées en format Markdown. Réponds toujours en français."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Aucun contenu généré par l\'API');
    }

    return {
      success: true,
      content
    };
  } catch (error: any) {
    console.error('Erreur détaillée:', error);
    let errorMessage = 'Une erreur est survenue lors de la génération du contenu.';
    
    if (error.message.includes('API key')) {
      errorMessage = 'Problème avec la clé API. Veuillez vérifier votre configuration.';
    } else if (error.message.includes('Rate limit')) {
      errorMessage = 'Limite de requêtes atteinte. Veuillez réessayer dans quelques instants.';
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}

function buildPrompt(projectType: ProjectType, answers: Answer[]): string {
  const projectTypeText = {
    vitrine: "site vitrine",
    webapp: "application web",
    ecommerce: "site e-commerce"
  }[projectType];

  const answersText = answers
    .map(answer => `- ${answer.questionId}: ${Array.isArray(answer.value) ? answer.value.join(', ') : answer.value}`)
    .join('\n');

  return `
Je souhaite créer un ${projectTypeText} avec les caractéristiques suivantes :

${answersText}

Génère une réponse détaillée qui inclut :
1. Un résumé des besoins identifiés
2. Une proposition de structure du site
3. Des recommandations techniques (technologies, frameworks, etc.)
4. Des suggestions de fonctionnalités clés
5. Des conseils pour l'UX/UI
6. Une estimation du temps de développement
7. Les prochaines étapes recommandées

Formate la réponse en Markdown avec des sections claires.`;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateSpecifications(projectType: ProjectType, answers: Answer[]): Promise<string> {
  try {
    const prompt = `En tant qu'expert en développement web, génère un cahier des charges détaillé pour ce projet.

Type de projet : ${projectType}

Informations du projet :
${answers.map(a => `${a.category} - ${a.questionId}: ${formatAnswerValue(a.value)}`).join('\n')}

Structure attendue du cahier des charges :

1. INTRODUCTION
   - Contexte du projet
   - Objectifs principaux

2. SPÉCIFICATIONS FONCTIONNELLES
   - Fonctionnalités principales
   - Fonctionnalités secondaires
   - Expérience utilisateur

3. SPÉCIFICATIONS TECHNIQUES
   - Stack technique recommandé
   - Architecture proposée
   - Sécurité et performance

4. STRUCTURE DU PROJET
   - Organisation des dossiers
   - Composants principaux
   - Configuration requise

5. PLANNING ET RESSOURCES
   - Phases du projet
   - Estimation des délais
   - Ressources nécessaires

6. RECOMMANDATIONS
   - Bonnes pratiques
   - Points d'attention
   - Évolutions futures

Génère un document clair et structuré en suivant ce plan.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en développement web spécialisé dans la rédaction de cahiers des charges détaillés et structurés."
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
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
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

export async function generateColorScheme(projectType: string, referenceUrls: string[]): Promise<{
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}> {
  let prompt = "";
  
  if (referenceUrls && referenceUrls.filter(url => url.trim()).length > 0) {
    prompt = `Analyse les sites web suivants : ${referenceUrls.filter(url => url.trim()).join(', ')}
    et génère une palette de couleurs unique mais inspirée de ces sites.
    
    Instructions spécifiques :
    1. Extrais les couleurs dominantes et les accents des sites de référence
    2. Crée une nouvelle palette harmonieuse qui capture l'essence du design tout en restant unique
    3. Assure-toi que les couleurs offrent un excellent contraste pour l'accessibilité
    4. Adapte les couleurs au type de projet : ${projectType}
    
    La palette doit inclure exactement :
    - Une couleur primaire : pour les éléments principaux et l'identité de la marque
    - Une couleur secondaire : pour les éléments de support et la hiérarchie visuelle
    - Une couleur d'accent : pour les call-to-action et les points d'emphase
    - Une couleur de fond : pour le thème sombre, préfère des tons sombres mais pas noir pur
    - Une couleur de texte : assure un contraste optimal avec le fond`;
  } else {
    prompt = `Génère une palette de couleurs moderne et professionnelle pour un projet de type ${projectType}.
    
    Adaptations selon le type de projet :
    - Site vitrine : couleurs professionnelles et mémorables
    - Web app : couleurs modernes et engageantes
    - E-commerce : couleurs inspirant confiance et incitant à l'action
    
    La palette doit inclure exactement :
    - Une couleur primaire : pour l'identité principale
    - Une couleur secondaire : pour les éléments de support
    - Une couleur d'accent : pour les call-to-action
    - Une couleur de fond : adaptée au thème sombre
    - Une couleur de texte : pour un contraste optimal`;
  }

  prompt += "\nRéponds UNIQUEMENT avec un objet JSON au format : { primary: '#XXXXXX', secondary: '#XXXXXX', accent: '#XXXXXX', background: '#XXXXXX', text: '#XXXXXX' }";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en design web et en théorie des couleurs, spécialisé dans la création de palettes harmonieuses et accessibles. Tu analyses les sites de référence pour créer des palettes uniques mais cohérentes avec leur style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Aucune palette de couleurs générée');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Erreur lors de la génération de la palette:', error);
    throw error;
  }
}

function formatAnswerValue(value: string | string[] | ColorScheme): string {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'object' && value !== null) {
    return `Couleurs: Principal=${value.primary}, Secondaire=${value.secondary}, Accent=${value.accent}`;
  }
  return value;
}
