// gallery.js - Purpose: Display behind-the-scenes photos in a responsive grid with interactive lightbox
document.addEventListener('DOMContentLoaded', function() {
  // Gallery images
  const galleryImages = [
    { src: "assets/ima.jpg  ", caption: "Director discussing the scene with the lead actor" },
    { src: "assets/bts2.jpg", caption: "Setting up the dramatic battle sequence" },
    { src: "assets/bts3.jpg", caption: "Special effects team creating the magical elements" },
    { src: "assets/bts4.jpg", caption: "Cast rehearsing an emotional scene" },
    { src: "assets/bts5.jpg", caption: "Costume design for the royal outfits" },
    { src: "assets/bts6.jpg", caption: "Location scouting for the palace scenes" }
  ];
  
  const galleryContainer = document.querySelector('.gallery-grid');
  if (galleryContainer) {
    // Generate gallery items
    galleryImages.forEach((image, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.innerHTML = `
        <img src="${image.src}" alt="Behind the scenes ${index + 1}" data-index="${index}">
        <div class="gallery-overlay">
          <i class="fas fa-search-plus"></i>
        </div>
      `;
      galleryContainer.appendChild(galleryItem);
    });
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="" class="lightbox-image">
        <div class="lightbox-caption"></div>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
      </div>
    `;
    document.body.appendChild(lightbox);
    
    // Lightbox functionality
    let currentImageIndex = 0;
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    function openLightbox(index) {
      currentImageIndex = index;
      lightboxImage.src = galleryImages[index].src;
      lightboxCaption.textContent = galleryImages[index].caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    
    function navigateLightbox(direction) {
      currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[currentImageIndex].src;
      lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
    }
    
    // Event listeners
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', function() {
        openLightbox(parseInt(this.dataset.index));
      });
    });
    
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navigateLightbox(-1);
      else if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
});