const maxRetries = 5;
let retryCount = 0;

function makeRequest() {
  // Your code to make the request goes here
  // For example:
  fetch('/dashboard')
    .then(response => {
      if (response.status === 429) {
        throw new Error('Too Many Requests');
      }
      return response.json();
    })
    .then(data => {
      // Process the response data
      console.log(data);
    })
    .catch(error => {
      if (error.message === 'Too Many Requests' && retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        retryCount++;
        console.log(`Retry attempt ${retryCount} after ${delay / 1000} seconds...`);
        setTimeout(makeRequest, delay);
      } else {
        console.error('Request failed:', error);
      }
    });
}

// Initial request
makeRequest();
