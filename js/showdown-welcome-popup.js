/**
 * Welcome and Instructions popup handling
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if this is the first visit or if user has seen the welcome message
  const hasSeenWelcome = localStorage.getItem('ubuntuProShowdown_hasSeenWelcome');
  
  if (!hasSeenWelcome) {
    // Show welcome popup on first visit
    document.getElementById('welcome-popup').style.display = 'flex';
    
    // Mark as seen for future visits
    localStorage.setItem('ubuntuProShowdown_hasSeenWelcome', 'true');
  } else {
    // Hide welcome popup if already seen
    document.getElementById('welcome-popup').style.display = 'none';
  }
  
  // Button to close welcome popup and start the game
  document.getElementById('welcome-close-btn').addEventListener('click', () => {
    document.getElementById('welcome-popup').style.display = 'none';
  });
  
  // Add Instructions button to the header
  const headerRight = document.querySelector('.p-navigation__items');
  
  if (headerRight) {
    const instructionsButton = document.createElement('li');
    instructionsButton.className = 'p-navigation__item';
    instructionsButton.innerHTML = `
      <a href="#" id="instructions-btn" class="p-navigation__link">
        Instructions
      </a>
    `;
    headerRight.appendChild(instructionsButton);
    
    // Show instructions popup when button is clicked
    document.getElementById('instructions-btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('instructions-popup').style.display = 'flex';
    });
  }
  
  // Close instructions popup
  document.getElementById('close-instructions-btn').addEventListener('click', () => {
    document.getElementById('instructions-popup').style.display = 'none';
  });
  
  // Allow clicking outside the popup to close it
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
  
  // Reset welcome screen function (for testing)
  window.resetWelcomeScreen = function() {
    localStorage.removeItem('ubuntuProShowdown_hasSeenWelcome');
    alert('Welcome screen reset. Refresh the page to see it again.');
  };
});
