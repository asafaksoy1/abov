<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
const close = () => (open.value = false)
const onScroll = () => (scrolled.value = window.scrollY > 60)

onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// Pages without a dark hero need a solid nav immediately
const alwaysSolid = computed(() =>
  !['home'].includes(route.name)
)

const solid = computed(() => scrolled.value || open.value || alwaysSolid.value)
const logo = computed(() => solid.value ? '/abov-logo-green.png' : '/abov-logo-white.png')
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
        <RouterLink to="/contact" class="nav-cta" @click="close">Get a Quote</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  background: transparent; border-bottom: 1px solid transparent;
  transition: background .35s ease, border-color .35s ease;
}
.nav.solid {
  background: rgba(245, 239, 230, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--line, rgba(1,58,48,0.14));
}

/* Inner */
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 88px; }
.brand img { height: 58px; width: auto; display: block; }

/* Links */
.links { display: flex; align-items: center; gap: 2rem; }
.links a {
  font-family: var(--mono, monospace); font-weight: 500; font-size: 0.72rem;
  letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
  color: rgba(245,239,230,0.92); transition: color .25s ease;
}
.nav.solid .links a { color: var(--ink, #16221e); }
.links a:hover { color: #fff; }
.nav.solid .links a:hover { color: var(--green, #014d40); }
.links a.router-link-exact-active:not(.nav-cta) {
  color: var(--brass, #b08d57);
}
.nav.solid .links a.router-link-exact-active:not(.nav-cta) {
  color: var(--green, #014d40);
}

/* CTA button */
.nav-cta {
  background: var(--green, #014d40) !important;
  color: #fff !important;
  padding: 0.7rem 1.6rem;
  border-radius: 2px;
  border: 1px solid transparent;
  letter-spacing: 0.14em;
  transition: background .2s ease, opacity .2s ease !important;
}
.nav-cta:hover { background: var(--green-deep, #013a30) !important; opacity: 1 !important; }
.nav.solid .nav-cta { background: var(--green, #014d40) !important; color: #fff !important; }

/* Burger */
.burger {
  display: none; flex-direction: column; justify-content: center; gap: 6px;
  width: 34px; height: 34px; background: none; border: 0; cursor: pointer; padding: 0; z-index: 60;
}
.burger span {
  width: 26px; height: 1.5px; background: rgba(245,239,230,0.9);
  display: block; transition: transform .3s ease, background .3s ease; margin-left: auto;
}
.nav.solid .burger span { background: var(--ink, #16221e); }
.burger.open span:first-child { transform: translateY(3.75px) rotate(45deg); }
.burger.open span:last-child  { transform: translateY(-3.75px) rotate(-45deg); }

/* Mobile */
@media (max-width: 880px) {
  .nav-inner { height: 80px; }
  .brand img { height: 54px; }
  .burger { display: flex; }
  .links {
    position: absolute; top: 80px; left: 0; right: 0;
    flex-direction: column; align-items: flex-start; gap: 0;
    background: var(--cream, #f5efe6);
    border-bottom: 1px solid var(--line, rgba(1,58,48,0.14));
    transform: translateY(-8px); opacity: 0; pointer-events: none;
    transition: opacity .3s ease, transform .3s ease;
    overflow: hidden;
  }
  .links a {
    color: var(--ink, #16221e) !important;
    width: 100%; padding: 1.1rem 1.5rem;
    border-bottom: 1px solid var(--line, rgba(1,58,48,0.08));
    font-size: 0.8rem; box-sizing: border-box;
  }
  .links.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
  .nav-cta {
    display: block !important;
    margin: 1.2rem 1.5rem 1.5rem !important;
    width: calc(100% - 3rem) !important;
    text-align: center !important;
    padding: 1rem 1rem !important;
    border-radius: 2px !important;
    font-size: 0.8rem !important;
    background: var(--green, #014d40) !important;
    color: #fff !important;
    border: none !important;
    box-sizing: border-box !important;
    letter-spacing: 0.14em !important;
  }
}
</style>
