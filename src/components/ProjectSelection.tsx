import React from 'react';
import { FaGlobe, FaDesktop, FaShoppingCart } from 'react-icons/fa';
import { ProjectType } from '../types';

interface ProjectSelectionProps {
  onSelect: (type: ProjectType) => void;
}

const ProjectSelection: React.FC<ProjectSelectionProps> = ({ onSelect }) => {
  return (
    <div className="home-container">
      <div className="title-container">
        <h1>Choisissez votre type de projet</h1>
        <p className="subtitle">Sélectionnez le type de projet qui correspond le mieux à vos besoins</p>
      </div>
      
      <div className="project-types">
        <div className="project-card" onClick={() => onSelect('vitrine')}>
          <div className="project-icon">
            <FaGlobe />
          </div>
          <h3>Site Vitrine</h3>
          <p>Présentez votre entreprise avec élégance. Idéal pour établir votre présence en ligne et mettre en valeur vos services.</p>
        </div>

        <div className="project-card" onClick={() => onSelect('webapp')}>
          <div className="project-icon">
            <FaDesktop />
          </div>
          <h3>Application Web</h3>
          <p>Créez une application web interactive et performante. Parfait pour offrir des services en ligne avancés.</p>
        </div>

        <div className="project-card" onClick={() => onSelect('ecommerce')}>
          <div className="project-icon">
            <FaShoppingCart />
          </div>
          <h3>E-Commerce</h3>
          <p>Lancez votre boutique en ligne. Solution complète pour vendre vos produits et gérer vos commandes.</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelection;
