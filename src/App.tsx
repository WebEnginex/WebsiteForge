import { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Specifications from './components/Specifications';
import { ProjectType, Answer } from './types';
import './styles/App.css';

const projectTypeInfo = {
  vitrine: {
    title: 'Site Vitrine',
    description: 'Présentez votre entreprise avec élégance et professionnalisme',
    icon: '🌐'
  },
  webapp: {
    title: 'Application Web',
    description: 'Créez une application web interactive et performante',
    icon: '💻'
  },
  ecommerce: {
    title: 'E-commerce',
    description: 'Lancez votre boutique en ligne et développez vos ventes',
    icon: '🛍️'
  }
};

function App() {
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'questionnaire' | 'specifications'>('home');

  const handleSubmit = (answers: Answer[]) => {
    setAnswers(answers);
    setCurrentView('specifications');
  };

  const handleReset = () => {
    setProjectType(null);
    setAnswers(null);
    setCurrentView('home');
  };

  const handleStartQuestionnaire = (type: ProjectType) => {
    setProjectType(type);
    setCurrentView('questionnaire');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="home-container fade-up">
            <h1 className="text-gradient">Choisissez votre type de projet</h1>
            <div className="project-types">
              {(Object.keys(projectTypeInfo) as ProjectType[]).map((type) => (
                <div
                  key={type}
                  className="project-card glass-effect"
                  onClick={() => handleStartQuestionnaire(type)}
                >
                  <div className="project-icon">{projectTypeInfo[type].icon}</div>
                  <h3>{projectTypeInfo[type].title}</h3>
                  <p>{projectTypeInfo[type].description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'questionnaire':
        return (
          <Questionnaire
            projectType={projectType}
            onProjectSelect={setProjectType}
            onSubmit={handleSubmit}
            onReturnHome={() => setCurrentView('home')}
          />
        );

      case 'specifications':
        return (
          <Specifications
            projectType={projectType!}
            answers={answers!}
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
    </div>
  );
}

export default App;
