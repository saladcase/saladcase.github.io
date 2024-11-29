// Select all images and modal elements
const images = document.querySelectorAll('.grid-item img');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

let currentIndex = 0; // Track the current image index

// Function to open modal
const openModal = (index) => {
currentIndex = index;
const image = images[currentIndex];
modal.style.display = 'flex'; // Show modal
modalImage.src = image.src; // Set modal image source
modalDescription.textContent = image.dataset.description; // Set modal description
};

// Function to close modal
const closeModalHandler = () => {
    modal.style.display = 'none'; // Hide modal
};

// Function to navigate to the previous image
const showPreviousImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back if at start
    openModal(currentIndex);
};

// Function to navigate to the next image
const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length; // Loop back if at end
    openModal(currentIndex);
};

// Function to get query parameters from the URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Function to find the index of an image by its source
const findImageIndexBySrc = (src) => {
    return Array.from(images).findIndex(image => image.src.includes(src));
};

// Event listeners for each image to open the modal
images.forEach((image, index) => {
    image.addEventListener('click', () => openModal(index));
});

// Event listener for closing the modal
closeModal.addEventListener('click', closeModalHandler);

// Event listeners for navigation arrows
leftArrow.addEventListener('click', showPreviousImage);
rightArrow.addEventListener('click', showNextImage);

// Close modal when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalHandler();
    }
});

// Keyboard navigation (optional)
window.addEventListener('keydown', (event) => {
    if (modal.style.display === 'flex') {
        if (event.key === 'ArrowLeft') showPreviousImage();
        if (event.key === 'ArrowRight') showNextImage();
        if (event.key === 'Escape') closeModalHandler();
    }
});

// On page load, check for the "image" query parameter
window.addEventListener('DOMContentLoaded', () => {
    const imageParam = getQueryParam('image'); // Get the "image" query param
    if (imageParam) {
        const index = findImageIndexBySrc(imageParam); // Find the image by its source
        if (index !== -1) {
            openModal(index); // Open the modal if the image is found
        }
    }
});