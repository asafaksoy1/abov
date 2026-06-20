<script setup>
import { RouterLink } from 'vue-router'
import { CONTACT, whatsappLink } from '../lib/supabase'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <div class="container foot-grid">
      <div>
        <img class="foot-logo" src="/abov-logo-white.png" alt="ABOV Interiors" />
        <p class="blurb">Home and office renovation, repairs and finishing across the UK. Tidy work, clear pricing, finished on time.</p>
      </div>

      <div>
        <h4>Pages</h4>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/services">Our Services</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>

      <div>
        <h4>Get in touch</h4>
        <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
        <a :href="whatsappLink()" target="_blank" rel="noopener">WhatsApp {{ CONTACT.whatsappDisplay }}</a>
      </div>
    </div>

    <div class="container foot-bottom">
      <span>© {{ year }} ABOV Interiors. All rights reserved.</span>
      <RouterLink to="/admin" class="admin-link">Admin</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
.foot { background: var(--green-deep); color: #cfe0da; padding-block: clamp(48px, 7vw, 80px) 0; }
.foot-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr;
  gap: 2.5rem;
}
.foot-logo { height: 46px; width: auto; margin-bottom: 1rem; }
.blurb { margin-top: 0.9rem; max-width: 38ch; }
h4 { color: var(--cream); font-size: 0.95rem; letter-spacing: 0.05em; margin-bottom: 0.9rem; }
.foot-grid a { display: block; color: #cfe0da; text-decoration: none; padding: 0.25rem 0; }
.foot-grid a:hover { color: var(--cream); }
.foot-bottom {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 3rem; padding-block: 1.4rem;
  border-top: 1px solid rgba(255,255,255,0.12);
  font-size: 0.85rem;
}
.admin-link { color: #7fa99d; text-decoration: none; }
.admin-link:hover { color: var(--cream); }

@media (max-width: 760px) { .foot-grid { grid-template-columns: 1fr; gap: 1.8rem; } }
</style>
