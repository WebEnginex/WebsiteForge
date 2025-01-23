import React, { useState } from 'react';
import { ProjectType, Answer } from '../types';
import '../styles/Questionnaire.css';
import { FaHome, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

interface QuestionnaireProps {
  projectType: ProjectType | null;
  onSubmit: (answers: Answer[]) => void;
  onReturnHome: () => void;
}

const getProjectTitle = (type: ProjectType): string => {
  switch (type) {
    case 'vitrine':
      return 'Site Vitrine';
    case 'webapp':
      return 'Application Web';
    case 'ecommerce':
      return 'E-Commerce';
    default:
      return '';
  }
};

const questions = {
  vitrine: [
    { id: 'company', text: 'Quel est le nom et le secteur d\'activité de votre entreprise ?' },
    { id: 'values', text: 'Quelles sont les valeurs et la mission de votre entreprise ?' },
    { id: 'target', text: 'Qui est votre public cible ?' },
    { id: 'services', text: 'Quels sont vos principaux produits ou services ?' },
    { id: 'colors', text: 'Quelles sont les couleurs souhaitées pour votre site ? (optionnel, max 3)' },
  ],
  webapp: [
    { id: 'purpose', text: 'Quel est l\'objectif principal de votre application web ?' },
    { id: 'features', text: 'Quelles sont les fonctionnalités clés souhaitées ?' },
    { id: 'users', text: 'Qui sont les utilisateurs principaux de l\'application ?' },
    { id: 'integration', text: 'Avez-vous besoin d\'intégrations avec d\'autres services ?' },
    { id: 'colors', text: 'Quelles sont les couleurs souhaitées pour votre application ? (optionnel, max 3)' },
  ],
  ecommerce: [
    { id: 'products', text: 'Quels types de produits vendez-vous ?' },
    { id: 'inventory', text: 'Combien de produits prévoyez-vous de mettre en vente ?' },
    { id: 'payment', text: 'Quels modes de paiement souhaitez-vous proposer ?' },
    { id: 'shipping', text: 'Quelles sont vos options de livraison ?' },
    { id: 'colors', text: 'Quelles sont les couleurs souhaitées pour votre boutique ? (optionnel, max 3)' },
  ],
};

const Questionnaire: React.FC<QuestionnaireProps> = ({
  projectType,
  onSubmit,
  onReturnHome,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  if (!projectType) return null;

  const currentQuestions = questions[projectType];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;
  const projectTitle = getProjectTitle(projectType);

  const handleNext = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: currentQuestions[currentQuestion].id,
      question: currentQuestions[currentQuestion].text,
      value,
      category: projectType,
    };
    setAnswers(newAnswers);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="questionnaire-container">
      <button className="home-button" onClick={onReturnHome}>
        <FaHome />
        <span>Accueil</span>
      </button>

      <div className="questionnaire-header">
        <h1>Configuration de votre {projectTitle}</h1>
        <p className="question-count">Question {currentQuestion + 1} sur {currentQuestions.length}</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      
      <div className="question-content">
        <h2>{currentQuestions[currentQuestion].text}</h2>
        
        <div className="answer-container">
          <textarea
            value={answers[currentQuestion]?.value || ''}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[currentQuestion] = {
                questionId: currentQuestions[currentQuestion].id,
                question: currentQuestions[currentQuestion].text,
                value: e.target.value,
                category: projectType,
              };
              setAnswers(newAnswers);
            }}
            placeholder="Votre réponse..."
            rows={5}
          />
        </div>
      </div>

      <div className="navigation-buttons">
        <div className="left-buttons">
          <button className="nav-button" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <FaArrowLeft />
            <span>Précédent</span>
          </button>
        </div>
        <div className="right-buttons">
          <button
            className="nav-button primary"
            onClick={() => handleNext(answers[currentQuestion]?.value || '')}
          >
            <span>{currentQuestion === currentQuestions.length - 1 ? 'Terminer' : 'Suivant'}</span>
            {currentQuestion === currentQuestions.length - 1 ? <FaCheck /> : <FaArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
