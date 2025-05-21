/*==================== MENU SHOW/HIDE ====================*/
const navMenu = document.querySelector('.nav-list');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    hamburger.classList.toggle('active');
  });
}

// Hide menu when clicking on links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    hamburger.classList.remove('active');
  });
});

/*==================== SKILLS ACCORDION ====================*/
const skillsHeaders = document.querySelectorAll('.skills-header');

skillsHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const skillsContent = header.parentNode;
    
    // Toggle the skills content
    skillsContent.classList.toggle('open');
  });
});

/*==================== QUALIFICATION MODALS ====================*/
const modalButtons = document.querySelectorAll('.qualification-button-more');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');

modalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    document.getElementById(modalId).classList.add('active');
  });
});

modalCloses.forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modal').classList.remove('active');
  });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.add('active');
    } else {
      document.querySelector(`.nav-link[href*="${sectionId}"]`).classList.remove('active');
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const header = document.querySelector('.header');
  
  if (this.scrollY >= 80) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP BUTTON ====================*/
function scrollUp() {
  const scrollUp = document.getElementById('scrollup');
  
  if (this.scrollY >= 560) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}

window.addEventListener('scroll', scrollUp);

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

// Validate if the user previously chose a theme
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
}

// Toggle theme
themeButton.addEventListener('click', () => {
  // Add or remove the dark theme class
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle('fa-moon');
  themeButton.classList.toggle('fa-sun');
  
  // Save theme and icon to localStorage
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== FORM LABEL ANIMATION ====================*/
const contactInputs = document.querySelectorAll('.contact-input');

contactInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentNode.classList.add('focus');
  });
  
  input.addEventListener('blur', () => {
    if (input.value === '') {
      input.parentNode.classList.remove('focus');
    }
  });
});