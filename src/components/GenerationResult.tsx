import { FC, useEffect, useState } from 'react';
import { ProjectType, Answer } from '../types';
import { generateWebsiteContent, GenerationResult } from '../services/openai';
import ReactMarkdown from 'react-markdown';

interface GenerationResultProps {
  projectType: ProjectType;
  answers: Answer[];
  onBack: () => void;
}

const GenerationResultComponent: FC<GenerationResultProps> = ({
  projectType,
  answers,
  onBack
}) => {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      const generatedResult = await generateWebsiteContent(projectType, answers);
      setResult(generatedResult);
      setIsLoading(false);
    };

    generate();
  }, [projectType, answers]);

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto animate-fade-in">
        <div className="header-container">
          <button onClick={onBack} className="btn-home" title="Retour à l'accueil">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Accueil
          </button>
          <h1 className="header-title">Assistant IA pour la Création de Sites Web</h1>
        </div>

        <div className="card text-center p-8">
          <div className="loading-spinner mb-4"></div>
          <p className="text-xl text-gradient">Génération en cours...</p>
          <p className="text-secondary mt-2">
            Nous analysons vos réponses pour créer des recommandations personnalisées
          </p>
        </div>
      </div>
    );
  }

  if (!result?.success) {
    return (
      <div className="container max-w-3xl mx-auto animate-fade-in">
        <div className="header-container">
          <button onClick={onBack} className="btn-home" title="Retour à l'accueil">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Accueil
          </button>
          <h1 className="header-title">Assistant IA pour la Création de Sites Web</h1>
        </div>

        <div className="card text-center p-8">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-xl text-red-500">Une erreur est survenue</p>
          <p className="text-secondary mt-2">{result?.error}</p>
          <button onClick={onBack} className="btn btn-primary mt-6">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto animate-fade-in">
      <div className="header-container">
        <button onClick={onBack} className="btn-home" title="Retour à l'accueil">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Accueil
        </button>
        <h1 className="header-title">Assistant IA pour la Création de Sites Web</h1>
      </div>

      <div className="card p-8">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{result.content || ''}</ReactMarkdown>
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={onBack} className="btn btn-primary">
            Créer un nouveau projet
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerationResultComponent;
