document.addEventListener('DOMContentLoaded', function () {
  // Video controls for the watch now button
  const watchBtn = document.querySelector('.watch-btn');
  if (watchBtn) {
    watchBtn.addEventListener('click', function () {
      const video = document.getElementById('background-video');

      // If video is in the background, create a modal to show it prominently
      const modal = document.createElement('div');
      modal.className = 'video-modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';

      const closeBtn = document.createElement('span');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '&times;';

      const videoClone = document.createElement('video');
      videoClone.src = 'assets/main_trailer.mp4';
      videoClone.controls = true;
      videoClone.autoplay = true;

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(videoClone);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Prevent body scrolling
      document.body.style.overflow = 'hidden';

      // Close modal on button click
      closeBtn.addEventListener('click', function () {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      });

      // Close modal on outside click
      modal.addEventListener('click', function (event) {
        if (event.target === modal) {
          document.body.removeChild(modal);
          document.body.style.overflow = 'auto';
        }
      });
    });
  }

  // Support form validation
  const supportForm = document.getElementById('supportForm');
  if (supportForm) {
    supportForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValid = true;

      // Validate name
      const name = document.getElementById('name');
      const nameError = document.getElementById('name-error');
      if (!name.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
      } else {
        nameError.style.display = 'none';
      }

      // Validate email
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value)) {
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }

      // Validate description
      const description = document.getElementById('description');
      const descriptionError = document.getElementById('description-error');
      if (!description.value.trim()) {
        descriptionError.style.display = 'block';
        isValid = false;
      } else {
        descriptionError.style.display = 'none';
      }

      // If the form is valid, show notification and reset form
      if (isValid) {
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Hide notification after 3 seconds
        setTimeout(function () {
          notification.classList.remove('show');
        }, 3000);

        // Reset form
        supportForm.reset();
      }
    });
  }

  // Add smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    });
  });

  // Add CSS for video modal
  const style = document.createElement('style');
  style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .modal-content {
            width: 80%;
            max-width: 1000px;
            position: relative;
        }
        
        .close-btn {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .modal-content video {
            width: 100%;
            max-height: 80vh;
        }
    `;
  document.head.appendChild(style);

  // Add parallax effect to features
  window.addEventListener('scroll', function () {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      const position = feature.getBoundingClientRect();

      // If feature is in viewport
      if (position.top < window.innerHeight && position.bottom > 0) {
        const scrollPosition = window.scrollY;
        const featureCenter = position.top + position.height / 2;
        const windowCenter = window.innerHeight / 2;
        const distance = featureCenter - windowCenter - scrollPosition;

        // Apply parallax effect
        const featureImage = feature.querySelector('.feature-image');
        if (featureImage) {
          featureImage.style.transform = `translateY(${distance * 0.05}px)`;
        }
      }
    });
  });

  // Add navbar background change on scroll
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    }
  });
}
);
