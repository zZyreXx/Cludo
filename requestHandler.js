async function makeRequest(url) {
  try {
    const response = await fetch(url);
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After'));
      if (!isNaN(retryAfter)) {
        // Wait for the specified time before retrying
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        // Retry the request
        return makeRequest(url);
      } else {
        throw new Error('Retry-After header missing or invalid');
      }
    } else {
      return response.json();
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
