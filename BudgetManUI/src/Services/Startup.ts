
// Check if the browser is Microsoft Edge
const isEdge = /Edg\//.test(navigator.userAgent);

// Add a class to the body if the browser is Microsoft Edge
if (isEdge) {
  document.body.classList.add('edge');
}
