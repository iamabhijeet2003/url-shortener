<template>
  <div id="app">
    <h1>Link Shortener</h1>
    <ShortenerForm />
  </div>
</template>

<script>
import ShortenerForm from './components/ShortenerForm.vue';

export default {
  name: 'App',
  components: {
    ShortenerForm
  }
};
</script>

<style>

</style>
