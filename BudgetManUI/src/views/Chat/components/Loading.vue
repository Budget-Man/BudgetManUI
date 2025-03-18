<template>
    <div class="loading-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </template>
  
  <style scoped>
  .loading-dots {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: #007bff;
    border-radius: 50%;
    animation: bounce 1.5s infinite ease-in-out;
  }
  
  .dot:nth-child(1) {
    animation-delay: 0s;
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.5);
      opacity: 1;
    }
  }
  </style>
  