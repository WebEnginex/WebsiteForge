export const CHAT_CONFIG = {
  // Nombre maximum de messages à afficher à la fois
  MAX_MESSAGES_DISPLAYED: 50,
  
  // Nombre de messages à charger par page
  MESSAGES_PER_PAGE: 20,
  
  // Intervalle de nettoyage automatique (en millisecondes)
  CLEANUP_INTERVAL: 300000, // 5 minutes
  
  // Taille maximale de l'historique en mémoire
  MAX_HISTORY_SIZE: 100,
  
  // Délai de debounce pour la saisie (en millisecondes)
  INPUT_DEBOUNCE_DELAY: 100,
  
  // Activer la compression des messages anciens
  ENABLE_MESSAGE_COMPRESSION: true,
  
  // Seuil de performance pour le mode léger
  PERFORMANCE_THRESHOLD: {
    // Si le temps de rendu dépasse cette valeur, passer en mode léger
    RENDER_TIME_MS: 100,
    // Si la mémoire utilisée dépasse ce pourcentage, nettoyer l'historique
    MEMORY_USAGE_PERCENT: 80
  }
};
