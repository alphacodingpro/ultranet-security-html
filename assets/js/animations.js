/**
 * Ultranet Security - Advanced Interactions & Animations Script
 * Developed for Ultranet Security, Pakistan
 */

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initFaqAccordions();
  initQuoteFormSteps();
});

// Animate Stats Numbers on Scroll
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    // Safety check for tiny/huge numbers
    const increment = target > 100 ? Math.ceil(target / 100) : 1;
    const interval = Math.max(stepTime, 15);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        counter.textContent = current.toLocaleString() + (counter.getAttribute('data-suffix') || '');
      }
    }, interval);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        countUp(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Interactive FAQ Accordions
function initFaqAccordions() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');
      
      // Close all other FAQs in the same group
      const allContents = header.closest('.faq-container')?.querySelectorAll('.faq-content') || [];
      const allIcons = header.closest('.faq-container')?.querySelectorAll('.faq-icon') || [];
      
      allContents.forEach(item => {
        if (item !== content) {
          item.classList.add('hidden');
          item.style.maxHeight = null;
        }
      });
      
      allIcons.forEach(itemIcon => {
        if (itemIcon !== icon) {
          itemIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current FAQ
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// Multi-Step Interactive Quote Form
function initQuoteFormSteps() {
  const steps = document.querySelectorAll('.quote-step');
  const nextBtns = document.querySelectorAll('.quote-next-btn');
  const prevBtns = document.querySelectorAll('.quote-prev-btn');
  const progressPercent = document.getElementById('quote-progress-percent');
  const progressBar = document.getElementById('quote-progress-bar');
  
  if (steps.length === 0) return;

  let currentStep = 0;

  const updateFormUI = () => {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });

    if (progressBar && progressPercent) {
      const percentage = Math.round(((currentStep + 1) / steps.length) * 100);
      progressBar.style.width = `${percentage}%`;
      progressPercent.textContent = `Step ${currentStep + 1} of ${steps.length} (${percentage}%)`;
    }
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Validate inputs in active step
      const activeStep = steps[currentStep];
      const requiredInputs = activeStep.querySelectorAll('[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500/50');
          input.classList.remove('border-slate-700');
        } else {
          input.classList.remove('border-red-500/50');
          input.classList.add('border-slate-700');
        }
      });

      if (!isValid) return;

      if (currentStep < steps.length - 1) {
        currentStep++;
        updateFormUI();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateFormUI();
      }
    });
  });

  // Handle final dynamic submission logic
  const quoteForm = document.getElementById('theme-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const property = document.querySelector('input[name="property_type"]:checked')?.value || 'Commercial';
      const cameras = document.getElementById('quote-cameras').value;
      const servicesChecked = Array.from(document.querySelectorAll('input[name="quote_services"]:checked')).map(el => el.value).join(', ');
      
      const name = document.getElementById('quote-name').value;
      const phone = document.getElementById('quote-phone').value;
      const city = document.getElementById('quote-city').value;

      // Pakistan Lead Generation routing via WhatsApp
      const pakistanMobileNumber = '923001234567'; // Replace with company's actual WhatsApp
      const textMessage = `*NEW ULTRANET QUOTE REQUEST*\n` +
                          `-----------------------------\n` +
                          `👤 *Client:* ${name}\n` +
                          `📞 *Phone:* ${phone}\n` +
                          `📍 *City:* ${city}\n` +
                          `🏢 *Property:* ${property}\n` +
                          `📹 *Cameras Needed:* ${cameras} Unit(s)\n` +
                          `🛠️ *Requested Services:* ${servicesChecked || 'Surveillance System'}\n` +
                          `-----------------------------`;
      
      const whatsappURL = `https://wa.me/${pakistanMobileNumber}?text=${encodeURIComponent(textMessage)}`;

      if (window.showFormFeedback) {
        window.showFormFeedback('Quote Request Compiled!', 'Our technical audit team in Pakistan will prepare a detailed proposal. Redirecting to WhatsApp for instant chat...', () => {
          window.open(whatsappURL, '_blank');
        });
      } else {
        alert('Thank you! Redirecting...');
        window.open(whatsappURL, '_blank');
      }
    });
  }

  // Initial render
  updateFormUI();
}
