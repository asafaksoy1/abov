<script setup>
import { RouterLink } from 'vue-router'
import { CONTACT, whatsappLink } from '../lib/supabase'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot">
    <!-- Main grid -->
    <div class="container foot-grid">
      <div class="foot-brand">
        <img class="foot-logo" src="/abov-logo-white.png" alt="ABOV Interiors" />
        <p class="blurb">Home and office renovation, repairs and finishing across the UK. Tidy work, clear pricing, finished on time.</p>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="foot-wa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.528 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.703-1.49A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.878 9.878 0 0 1-5.031-1.378l-.36-.214-3.733.976.998-3.639-.235-.374A9.86 9.86 0 0 1 2.1 12c0-5.464 4.436-9.9 9.9-9.9 5.463 0 9.9 4.436 9.9 9.9 0 5.463-4.437 9.9-9.9 9.9z"/></svg>
          WhatsApp us
        </a>
      </div>

      <div class="foot-col">
        <span class="foot-kicker">Pages</span>
        <nav class="foot-nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/services">Our Services</RouterLink>
          <RouterLink to="/projects">Projects</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
      </div>

      <div class="foot-col">
        <span class="foot-kicker">Get in touch</span>
        <nav class="foot-nav">
          <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
          <a :href="whatsappLink()" target="_blank" rel="noopener">{{ CONTACT.whatsappDisplay }}</a>
        </nav>
      </div>
    </div>

    <!-- Big wordmark -->
    <div class="foot-wordmark" aria-hidden="true">ABOV</div>

    <!-- Bottom bar -->
    <div class="container foot-bottom">
      <span class="foot-copy">© {{ year }} ABOV Interiors. All rights reserved.</span>
      <span class="foot-powered">
        Powered by <a href="https://eralean.com" target="_blank" rel="noopener">EraLean</a>
      </span>
      <RouterLink to="/admin" class="admin-link">Admin</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  background: var(--green-deep, #013a30);
  color: rgba(245, 239, 230, 0.7);
  padding-top: clamp(3.5rem, 8vw, 6rem);
  overflow: hidden;
  position: relative;
}

/* ---------- Grid ---------- */
.foot-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1.2fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding-bottom: clamp(2.5rem, 6vw, 5rem);
  border-bottom: 1px solid rgba(245, 239, 230, 0.1);
}

/* ---------- Brand col ---------- */
.foot-logo { height: 60px; width: auto; margin-bottom: 1.4rem; display: block; }
.blurb { font-size: 0.9rem; max-width: 36ch; line-height: 1.7; }
.foot-wa {
  display: inline-flex; align-items: center; gap: 0.55rem;
  margin-top: 1.6rem; color: var(--cream, #f5efe6); font-size: 0.9rem; font-weight: 500;
  text-decoration: none; border: 1px solid rgba(245,239,230,0.28); border-radius: 2px;
  padding: 0.6rem 1rem; transition: background 0.2s ease, border-color 0.2s ease;
}
.foot-wa:hover { background: rgba(245,239,230,0.08); border-color: rgba(245,239,230,0.5); }

/* ---------- Nav cols ---------- */
.foot-kicker {
  display: block; font-family: var(--mono, monospace); font-size: 0.68rem; font-weight: 500;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--brass, #b08d57); margin-bottom: 1.2rem;
}
.foot-nav { display: flex; flex-direction: column; gap: 0.6rem; }
.foot-nav a { color: rgba(245,239,230,0.7); text-decoration: none; font-size: 0.92rem; transition: color 0.18s ease; }
.foot-nav a:hover { color: var(--cream, #f5efe6); }

/* ---------- Wordmark ---------- */
.foot-wordmark {
  font-family: var(--display, 'Cormorant Garamond', serif);
  font-weight: 700; font-size: clamp(5rem, 22vw, 18rem);
  line-height: 0.82; letter-spacing: -0.02em;
  color: transparent; -webkit-text-stroke: 1px rgba(245,239,230,0.08);
  text-align: center; pointer-events: none; user-select: none;
  margin-top: clamp(1.5rem, 4vw, 3rem);
}

/* ---------- Bottom bar ---------- */
.foot-bottom {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;
  gap: 0.75rem; padding-block: 1.2rem;
  border-top: 1px solid rgba(245,239,230,0.08);
  font-size: 0.8rem;
}
.foot-copy { color: rgba(245,239,230,0.45); }
.foot-powered { color: rgba(245,239,230,0.45); }
.foot-powered a { color: var(--brass, #b08d57); text-decoration: none; transition: opacity 0.18s ease; }
.foot-powered a:hover { opacity: 0.8; }
.admin-link { color: rgba(245,239,230,0.25); text-decoration: none; font-size: 0.75rem; transition: color 0.18s ease; }
.admin-link:hover { color: rgba(245,239,230,0.6); }

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .foot-grid { grid-template-columns: 1fr; gap: 2rem; }
  .foot-wordmark { font-size: clamp(4.5rem, 28vw, 9rem); }
  .foot-bottom { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
}
</style>
