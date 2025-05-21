class ProjectLoader {
  constructor(options) {
    // Default options
    this.options = {
      dataSource: [],             // Array of project data or function that returns data
      containerId: 'projects-container', // ID of the container element
      itemsPerPage: 3,            // Number of items per page
      enablePagination: true,     // Whether to enable pagination
      paginationContainerId: 'projects-pagination', // ID of pagination container
      cardTemplate: null,         // Function to generate card HTML
      cardClass: 'project-card',  // CSS class for project cards
      paginationBulletClass: 'projects-pagination-bullet', // CSS class for pagination bullets
      ...options
    };
    
    this.currentPage = 0;
    this.totalPages = 0;
    this.projects = [];
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  init() {
    // Get container element
    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      console.error(`Container with ID "${this.options.containerId}" not found.`);
      return;
    }
    
    // Get pagination container if enabled
    if (this.options.enablePagination && this.options.paginationContainerId) {
      this.paginationContainer = document.getElementById(this.options.paginationContainerId);
      if (!this.paginationContainer) {
        console.warn(`Pagination container with ID "${this.options.paginationContainerId}" not found.`);
      }
    }
    
    // Load projects data
    this.loadProjects();
  }
  
  loadProjects() {
    // Get projects data
    if (typeof this.options.dataSource === 'function') {
      this.projects = this.options.dataSource();
    } else if (Array.isArray(this.options.dataSource)) {
      this.projects = this.options.dataSource;
    } else if (window[this.options.dataSource] && Array.isArray(window[this.options.dataSource])) {
      // Try to get from global variable if string is provided
      this.projects = window[this.options.dataSource];
    } else {
      console.error('Invalid data source. Must be an array, a function that returns an array, or a global variable name.');
      return;
    }
    
    // Create pagination if enabled
    if (this.options.enablePagination && this.paginationContainer) {
      this.createPagination();
    }
    
    // Display projects
    this.displayProjects();
  }
  
  createPagination() {
    if (!this.paginationContainer) return;
    
    this.paginationContainer.innerHTML = '';
    this.totalPages = Math.ceil(this.projects.length / this.options.itemsPerPage);
    
    for (let i = 0; i < this.totalPages; i++) {
      const bullet = document.createElement('span');
      bullet.classList.add(this.options.paginationBulletClass);
      if (i === this.currentPage) {
        bullet.classList.add('active');
      }
      
      bullet.addEventListener('click', () => {
        this.currentPage = i;
        this.displayProjects();
      });
      
      this.paginationContainer.appendChild(bullet);
    }
  }
  
  createProjectCard(project) {
    if (typeof this.options.cardTemplate === 'function') {
      // Use custom card template if provided
      const cardHTML = this.options.cardTemplate(project);
      if (typeof cardHTML === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        return tempDiv.firstElementChild;
      } else if (cardHTML instanceof HTMLElement) {
        return cardHTML;
      }
    }
    
    // Use default card template
    const card = document.createElement('div');
    card.classList.add(this.options.cardClass);
    
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-img">
      <h3 class="project-title">${project.title}</h3>
      ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
      <a href="${project.url}" class="btn btn-small" target="_blank">
        View Project <i class="fas fa-external-link-alt"></i>
      </a>
    `;
    
    return card;
  }
  
  displayProjects() {
    if (!this.container) return;
    
    this.container.innerHTML = '';
    
    const startIndex = this.currentPage * this.options.itemsPerPage;
    const endIndex = Math.min(startIndex + this.options.itemsPerPage, this.projects.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const project = this.projects[i];
      const card = this.createProjectCard(project);
      this.container.appendChild(card);
    }
    
    // Update active pagination bullet
    if (this.paginationContainer) {
      const bullets = this.paginationContainer.querySelectorAll(`.${this.options.paginationBulletClass}`);
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === this.currentPage);
      });
    }
  }
  
  // Method to change page
  goToPage(pageNumber) {
    if (pageNumber >= 0 && pageNumber < this.totalPages) {
      this.currentPage = pageNumber;
      this.displayProjects();
    }
  }
  
  // Method to go to next page
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.displayProjects();
    }
  }
  
  // Method to go to previous page
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.displayProjects();
    }
  }
  
  // Method to refresh projects (useful if data source changes)
  refresh() {
    this.loadProjects();
  }
}

// Initialize project loaders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Main portfolio projects loader
  if (typeof projectsData !== 'undefined' && document.getElementById('projects-container')) {
    new ProjectLoader({
      dataSource: projectsData,
      containerId: 'projects-container',
      itemsPerPage: 3,
      paginationContainerId: 'projects-pagination'
    });
  }
});