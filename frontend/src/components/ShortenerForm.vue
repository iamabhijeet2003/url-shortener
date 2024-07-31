<template>
    <div>
      <form @submit.prevent="shortenLink">
        <input v-model="url" type="text" placeholder="Enter URL to shorten" required />
        <button type="submit">Shorten</button>
      </form>
      <div v-if="shortenedUrl">
        Shortened URL: <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        url: '',
        shortenedUrl: ''
      };
    },
    methods: {
      async shortenLink() {
        const response = await fetch('https://url-shortener-backend-abhi.vercel.app/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: this.url })
        });
        const data = await response.json();
        this.shortenedUrl = data.shortenedUrl;
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  