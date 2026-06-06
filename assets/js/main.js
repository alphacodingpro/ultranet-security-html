/**
 * Ultranet Security - Global Script
 * Designed for static enterprise lead generation & responsive interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileMenu();
  highlightActiveNav();
  initBackToTop();
  initContactForms();
});

// Sticky Navbar Scroll effect
function initStickyNavbar() {
  const header = document.querySelector('header nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-opacity-95', 'backdrop-blur-md', 'border-b', 'border-cyan-500/20', 'py-3');
      header.classList.remove('py-5');
    } else {
      header.classList.remove('bg-opacity-95', 'backdrop-blur-md', 'border-b', 'border-cyan-500/20', 'py-3');
      header.classList.add('py-5');
    }
  });
}

// Responsive Mobile Toggle Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Close menu if a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

// Match & highlight the current active link
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link-item');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize path comparison (handle relative and absolute)
    if (
      currentPath.endsWith(href) || 
      (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '')) ||
      (currentPath.includes('/services/') && href === 'services.html')
    ) {
      link.classList.add('text-neon-cyan', 'border-b-2', 'border-neon-cyan');
      link.classList.remove('text-slate-300');
    } else {
      link.classList.remove('text-neon-cyan', 'border-b-2', 'border-neon-cyan');
    }
  });
}

// Back to Top and Quick Action Floating Buttons
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-5');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-5');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Handle Static Forms & Route to WhatsApp/Email
function initContactForms() {
  const contactForm = document.getElementById('theme-contact-form');
  const quoteForm = document.getElementById('theme-quote-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const service = document.getElementById('contact-service')?.value || 'General Inquiry';
      const msg = document.getElementById('contact-message').value;

      // Construct direct WhatsApp URL for immediate lead capturing in Pakistan
      const pakistanMobileNumber = '923001234567'; // Replace with company's actual WhatsApp number
      const textMessage = `Hello Ultranet Security, My name is *${name}* (${phone}). I am interested in *${service}*.\n\nMessage: ${msg}`;
      const whatsappURL = `https://wa.me/${pakistanMobileNumber}?text=${encodeURIComponent(textMessage)}`;

      // Show success modal, then redirect
      showFormFeedback('Inquiry Received!', 'Thank you! Redirecting to WhatsApp for instant secure response...', () => {
        window.open(whatsappURL, '_blank');
      });
    });
  }
}

// Custom Premium Neon Feedback Modal popup
function showFormFeedback(title, text, callback) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300';
  modal.innerHTML = `
    <div class="glass-panel border border-cyan-500/30 p-8 rounded-2xl max-w-md w-full text-center transform scale-95 transition-transform duration-300">
      <div class="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
        <i class="fa-solid fa-shield-halved text-2xl animate-pulse"></i>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2 font-heading">${title}</h3>
      <p class="text-slate-300 mb-6 text-sm">${text}</p>
      <button id="modal-ack-btn" class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 transition-all duration-300 btn-cyber">
        PROCEED SECURELY
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.classList.add('opacity-100');
    modal.querySelector('.transform').classList.add('scale-100');
  }, 10);

  const ackBtn = modal.querySelector('#modal-ack-btn');
  ackBtn.addEventListener('click', () => {
    // Animate out
    modal.classList.remove('opacity-100');
    modal.querySelector('.transform').classList.remove('scale-100');
    setTimeout(() => {
      document.body.removeChild(modal);
      if (callback) callback();
    }, 300);
  });
}
