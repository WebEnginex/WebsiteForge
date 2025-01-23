import React, { useState } from 'react';
import { ProjectType, Answer } from '../types';
import { generateSpecifications } from '../services/openai';

interface ResultsProps {
  projectType: ProjectType;
  answers: Answer[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  projectType,
  answers,
  onReset,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [specifications, setSpecifications] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const generateResults = async () => {
      try {
        const specs = await generateSpecifications(projectType, answers);
        setSpecifications(specs);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setIsLoading(false);
      }
    };

    generateResults();
  }, [projectType, answers]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={onReset} className="btn-retry">
          Réessayer
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
        <p>Génération du cahier des charges en cours...</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="specifications-content">
        <div dangerouslySetInnerHTML={{ __html: specifications }} />
      </div>
      <div className="action-buttons">
        <button onClick={onReset} className="btn-reset">
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};
