import { useState, useEffect } from 'react';
import { generateSpecifications, generateWindsurfRules } from '../services/specifications';
import { ProjectType, Answer } from '../types';

interface SpecificationsProps {
  projectType: ProjectType;
  answers: Answer[];
  onReset: () => void;
}

export default function Specifications({ projectType, answers, onReset }: SpecificationsProps) {
  const [specifications, setSpecifications] = useState<string | null>(null);
  const [rules, setRules] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'rules'>('specs');

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [specs, windsurfRules] = await Promise.all([
          generateSpecifications(projectType, answers),
          generateWindsurfRules(projectType, answers)
        ]);
        setSpecifications(specs);
        setRules(windsurfRules);
        setError(null);
      } catch (err) {
        setError("Erreur lors de la génération du contenu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [projectType, answers]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // On pourrait ajouter une notification de succès ici
    } catch (err) {
      console.error('Erreur lors de la copie :', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Génération en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={onReset} className="btn-reset">Recommencer</button>
      </div>
    );
  }

  return (
    <div className="specifications-container">
      <div className="header">
        <h1>Documentation du Projet</h1>
        <button onClick={onReset} className="btn-reset">Nouveau projet</button>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'specs' ? 'active' : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Cahier des charges
        </button>
        <button
          className={`tab ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Règles Windsurf
        </button>
      </div>

      {activeTab === 'specs' && specifications && (
        <div className="specifications-content">
          <div className="content-header">
            <h2>Cahier des charges</h2>
            <button 
              className="btn-copy"
              onClick={() => copyToClipboard(specifications)}
            >
              Copier le cahier des charges
            </button>
          </div>
          <pre className="content-text">{specifications}</pre>
        </div>
      )}

      {activeTab === 'rules' && rules && (
        <div className="specifications-content">
          <div className="content-header">
            <h2>Règles Windsurf</h2>
            <button 
              className="btn-copy"
              onClick={() => copyToClipboard(rules)}
            >
              Copier les règles
            </button>
          </div>
          <pre className="content-text">{rules}</pre>
        </div>
      )}
    </div>
  );
}
