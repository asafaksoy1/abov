<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

const open = ref(false)
const scrolled = ref(false)
const close = () => (open.value = false)
const onScroll = () => (scrolled.value = window.scrollY > 60)

onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// Bar is "solid" (cream) when scrolled OR when the mobile menu is open.
const solid = computed(() => scrolled.value || open.value)
const logo = computed(() => (solid.value ? '/abov-logo-green.png' : '/abov-logo-white.png'))
</script>

<template>
  <header class="nav" :class="{ solid }">
    <div class="container nav-inner">
      <RouterLink to="/" class="brand" @click="close" aria-label="ABOV Interiors home">
        <img :src="logo" alt="ABOV Interiors" />
      </RouterLink>

      <button class="burger" :class="{ open }" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <span></span><span></span>
      </button>

      <nav class="links" :class="{ open }">
        <RouterLink to="/" @click="close">Home</RouterLink>
        <RouterLink to="/services" @click="close">Our Services</RouterLink>
        <RouterLink to="/projects" @click="close">Projects</RouterLink>
        <RouterLink to="/contact" @click="close">Contact</RouterLink>
        <RouterLink to="/contact" class="btn btn-primary nav-cta" @click="close">Get a Quote</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  background: transparent; border-bottom: 1px solid transparent;
  transition: background .4s var(--ease), border-color .4s var(--ease);
}
.nav.solid {
  background: rgba(245, 239, 230, 0.94);
  backdrop-filter: blur(10px);
  border-bottom-color: var(--line);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 84px; }

.brand img { height: 40px; width: auto; display: block; }

.links { display: flex; align-items: center; gap: 1.8rem; }
.links a {
  font-family: var(--mono); font-weight: 500; font-size: 0.74rem;
  letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none;
  color: var(--cream); transition: color .3s var(--ease);
}
.nav.solid .links a { color: var(--ink); }
.links a:hover { color: var(--accent); }
.nav.solid .links a:hover { color: var(--green); }
.links a.router-link-exact-active:not(.nav-cta) { color: var(--accent); }
.nav-cta { color: var(--cream) !important; padding: 0.65rem 1.2rem; }
.nav-cta:hover { color: var(--cream) !important; }

.burger { display: none; flex-direction: column; justify-content: center; gap: 7px; width: 34px; height: 34px; background: none; border: 0; cursor: pointer; padding: 0; z-index: 60; }
.burger span { width: 28px; height: 1.5px; background: var(--cream); display: block; transition: transform .3s var(--ease), background .3s; margin-left: auto; }
.nav.solid .burger span { background: var(--ink); }
.burger.open span:first-child { transform: translateY(4px) rotate(45deg); }
.burger.open span:last-child { transform: translateY(-4px) rotate(-45deg); }

@media (max-width: 880px) {
  .nav-inner { height: 72px; }
  .brand img { height: 34px; }
  .burger { display: flex; }
  .links {
    position: absolute; top: 72px; left: 0; right: 0;
    flex-direction: column; align-items: flex-start; gap: 1.1rem;
    background: var(--cream); border-bottom: 1px solid var(--line);
    padding: 1.6rem var(--pad) 2rem;
    transform: translateY(-12px); opacity: 0; pointer-events: none;
    transition: opacity .3s var(--ease), transform .3s var(--ease);
  }
  .links a { color: var(--ink); font-size: 0.95rem; }
  .links.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nav-cta { margin-top: 0.4rem; }
}
</style>
