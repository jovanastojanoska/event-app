<template>
  <HeaderComponent></HeaderComponent>
  
  <router-view />
</template>

<script setup>
 import HeaderComponent from './components/HeaderComponent.vue';
 </script>
<style lang="scss">
@import "./scss/main.scss";
</style>
