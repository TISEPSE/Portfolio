const GITHUB_USERNAME = 'TISEPSE';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

const modal = document.getElementById("projectModal");
const modalImage = modal.querySelector(".modal-image");
const modalTitle = modal.querySelector(".modal-title");
const modalDescription = modal.querySelector(".modal-description");
const closeButton = modal.querySelector(".close");

async function fetchGitHubRepos() {
  try {
    const response = await fetch(`${GITHUB_API_URL}?sort=updated&per_page=20`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des repositories');
    
    const repos = await response.json();
    return repos.filter(repo => !repo.fork && !repo.private);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    React: '#61dafb',
    Vue: '#4fc08d',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
    C: '#555555'
  };
  return colors[language] || '#6c757d';
}

function getProjectImage(repoName) {
  const imageMap = {
    'QR-code-Generator': 'img/Capture d\'écran 2024-09-25 135218.png',
    'Jeu-Des-Pays-JavaScript': 'img/Jeu des pays 2.png',
    'Nav-Bar-Effect': 'img/Nav-Bar-Effect.png',
    'Site-Open-Classroom': 'img/Robis Lens.png',
    'Appli-Note2': 'img/Capture Note portfolio.PNG'
  };
  
  return imageMap[repoName] || null;
}

function generateGradientBackground(repoName, language) {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)'
  ];
  
  const hash = repoName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return gradients[Math.abs(hash) % gradients.length];
}

function getProjectIcon(language) {
  const icons = {
    JavaScript: '⚡',
    HTML: '🌐',
    CSS: '🎨',
    Python: '🐍',
    Java: '☕',
    TypeScript: '📘',
    React: '⚛️',
    Vue: '💚',
    PHP: '🐘',
    'C++': '⚙️',
    C: '🔧',
    Web: '💻'
  };
  
  return icons[language] || '📁';
}

function getProjectDescription(repoName, originalDescription) {
  const descriptionMap = {
    'QR-code-Generator': 'Ce projet de générateur de QR codes constitue l\'un de mes premiers travaux en JavaScript. Il exploite la bibliothèque CDNJS pour convertir un lien en QR code.',
    'Jeu-Des-Pays-JavaScript': 'Un de mes premiers projets réalisés dans le cadre de mes études. Ce projet m\'a permis d\'approfondir mes connaissances en JavaScript.',
    'Nav-Bar-Effect': 'Projet d\'exploration en HTML, CSS et JavaScript. J\'ai pu découvrir les diverses possibilités de personnalisation et les aspects créatifs du web.',
    'Site-Open-Classroom': 'Le tout premier site que j\'ai codé en suivant le tutoriel de Mathieu Nébra. Exploration des techniques de style et mise en forme.',
    'Appli-Note2': 'Mini-projet pour approfondir ma compréhension de JavaScript, notamment le stockage de données et la manipulation du DOM.'
  };
  
  return descriptionMap[repoName] || originalDescription || 'Projet développé avec passion';
}

function createRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const projectImage = getProjectImage(repo.name);
  const description = getProjectDescription(repo.name, repo.description);
  const language = repo.language || 'Web';
  const stars = repo.stargazers_count;
  const forks = repo.forks_count;
  const projectIcon = getProjectIcon(language);
  
  let imageContent;
  if (projectImage) {
    imageContent = `<img src="${projectImage}" alt="${repo.name}" loading="lazy">`;
  } else {
    const gradientBg = generateGradientBackground(repo.name, language);
    imageContent = `
      <div class="gradient-placeholder" style="background: ${gradientBg};">
        <div class="placeholder-content">
          <div class="project-icon">${projectIcon}</div>
          <div class="project-name-overlay">${repo.name.replace(/-/g, ' ').substring(0, 15)}</div>
        </div>
      </div>
    `;
  }
  
  card.innerHTML = `
    <div class="card-image-container">
      ${imageContent}
      <div class="card-overlay">
        <div class="repo-stats-overlay">
          <span class="stars">⭐ ${stars}</span>
          <span class="forks">🍴 ${forks}</span>
        </div>
      </div>
    </div>
    <div class="card-content">
      <h2>${repo.name.replace(/-/g, ' ')}</h2>
      <p class="repo-description">${description}</p>
      <div class="repo-bottom">
        <div class="repo-language">
          <span class="language-dot" style="background-color: ${getLanguageColor(language)}"></span>
          <span>${language}</span>
        </div>
        <button class="githubButton" data-link="${repo.html_url}">Voir le projet</button>
      </div>
    </div>
  `;
  
  return card;
}

async function loadProjects() {
  const container = document.querySelector('.container-prjt');
  container.innerHTML = '<div class="loading">Chargement des projets...</div>';
  
  const repos = await fetchGitHubRepos();
  
  if (repos.length === 0) {
    container.innerHTML = '<div class="error">Impossible de charger les projets</div>';
    return;
  }
  
  container.innerHTML = '';
  
  repos.forEach(repo => {
    const card = createRepoCard(repo);
    container.appendChild(card);
  });
  
  attachCardListeners();
}

function attachCardListeners() {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const gradientPlaceholder = card.querySelector(".gradient-placeholder");
      const title = card.querySelector("h2");
      const description = card.querySelector(".repo-description");
      
      if (img) {
        modalImage.src = img.src;
        modalImage.style.display = 'block';
      } else if (gradientPlaceholder) {
        modalImage.style.display = 'none';
      }
      
      modalTitle.textContent = title.textContent;
      modalDescription.textContent = description.textContent;
      modal.classList.add("show");
    });

    const githubButton = card.querySelector(".githubButton");
    if (githubButton) {
      githubButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const link = githubButton.getAttribute("data-link");
        if (link) {
          window.open(link, "_blank");
        }
      });
    }
  });
}

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener('DOMContentLoaded', loadProjects);