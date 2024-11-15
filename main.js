// ScrollReveal setup for various elements
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".container .letter-s", {
  duration: 1000,
  delay: 1000,
});
ScrollReveal().reveal(".container img", {
  duration: 1000,
  delay: 1500,
});
ScrollReveal().reveal(".container .text__left", {
  ...scrollRevealOption,
  origin: "right",
  delay: 2000,
});
ScrollReveal().reveal(".container .text__right", {
  ...scrollRevealOption,
  origin: "left",
  delay: 2000,
});
ScrollReveal().reveal(".container .explore", {
  duration: 1000,
  delay: 2500,
});
ScrollReveal().reveal(".container h5", {
  duration: 1000,
  interval: 500,
  delay: 3000,
});
ScrollReveal().reveal(".container .catalog", {
  duration: 1000,
  delay: 5000,
});
ScrollReveal().reveal(".container .print", {
  duration: 1000,
  delay: 5500,
});
ScrollReveal().reveal(".footer p", {
  duration: 1000,
  delay: 7000,
});

// Navigation action for "Explore" button
document.querySelector(".btn.explore").addEventListener("click", function() {
  window.location.href = "upload.html";
});

// Get references to the HTML elements
const dropZone = document.getElementById('drop-zone');
const fileUpload = document.getElementById('file-upload');
const predictionResult = document.getElementById('prediction-result');

// Handle dragover event to show the drop area styling
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

// Handle dragleave event to remove the styling
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

// Handle drop event to process the file
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFile(file);
  }
});

// Handle file input change event
fileUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFile(file);
  }
});

// Function to handle the file, upload it, and get the prediction
function handleFile(file) {
  const reader = new FileReader();
  
  // Read the file as a data URL to display it on the page
  reader.onload = function (e) {
    const image = new Image();
    image.src = e.target.result;
    image.onload = function () {
      // Display the image
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.appendChild(image);
      dropZone.appendChild(imageContainer);

      // Send the image to the server for prediction
      sendImageToServer(file);
    };
  };
  
  reader.readAsDataURL(file);
}

// Function to send the image to the Flask backend for prediction
function sendImageToServer(file) {
  const formData = new FormData();
  formData.append('image', file);

  // Use fetch to send the image to the Flask backend
  fetch('/predict', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      // Display the prediction result
      predictionResult.innerHTML = `Prediction: ${data.prediction}`;
    })
    .catch(error => {
      console.error('Error:', error);
      predictionResult.innerHTML = 'Error in prediction';
    });
}
