<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const route = useRoute()
// Hide public chrome on the admin area.
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <NavBar v-if="!isAdmin" />
  <main>
    <RouterView />
  </main>
  <FooterSection v-if="!isAdmin" />
  <WhatsAppButton v-if="!isAdmin" />
</template>
