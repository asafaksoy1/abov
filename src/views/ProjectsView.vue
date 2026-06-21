<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase, whatsappLink } from '../lib/supabase'

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  projects.value = data ?? []
  loading.value = false
})

function onImgError(e) { e.target.classList.add('is-missing') }
</script>

<template>
  <!-- HERO -->
  <section class="proj-hero">
    <div class="container">
      <span class="kicker" v-reveal>Our Work</span>
      <h1 v-reveal="1">Recent <em>projects.</em></h1>
      <p class="lead" v-reveal="2">A selection of renovations, installations and finishing work across homes and offices in the UK.</p>
    </div>
  </section>

  <!-- GRID -->
  <section class="section">
    <div class="container">
      <!-- Loading -->
      <div v-if="loading" class="proj-loading">
        <span class="kicker">Loading projects…</span>
      </div>

      <!-- No projects yet -->
      <div v-else-if="projects.length === 0" class="proj-empty">
        <p>Projects will appear here once added from the admin panel.</p>
        <RouterLink to="/contact" class="btn btn-fill" style="margin-top:1.5rem">Get in touch instead</RouterLink>
      </div>

      <!-- Projects grid -->
      <div v-else class="proj-grid">
        <article class="proj-card" v-for="(p, i) in projects" :key="p.id" v-reveal="i % 3">
          <figure class="proj-img">
            <img
              v-if="p.image_urls && p.image_urls[0]"
              :src="p.image_urls[0]"
              :alt="p.title"
              loading="lazy"
              @error="onImgError"
            />
          </figure>
          <div class="proj-info">
            <span class="proj-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ p.title }}</h3>
              <p v-if="p.description">{{ p.description }}</p>
              <span v-if="p.category" class="proj-tag">{{ p.category }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section proj-cta">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="kicker kicker--brass">Start a project</span>
        <h2>Like what you see?<br /><em>Let's talk.</em></h2>
      </div>
      <div class="cta-btns" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-fill">Get a quote</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">WhatsApp us →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }

.proj-hero {
  background: var(--green, #014d40);
  padding: clamp(9rem, 16vw, 14rem) 0 clamp(4rem, 7vw, 7rem);
}
.proj-hero h1 { color: var(--cream, #f5efe6); }
.proj-hero .lead { color: rgba(245,239,230,0.74); margin-top: 1.2rem; max-width: 50ch; }

.proj-loading, .proj-empty { padding: 4rem 0; text-align: center; color: var(--muted, #5c665f); }
.proj-empty .btn { display: inline-flex; }

.proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(1.5rem, 3vw, 2.5rem); }

.proj-card { display: flex; flex-direction: column; gap: 1.2rem; }
.proj-img {
  margin: 0; border-radius: 5px; overflow: hidden; aspect-ratio: 4/3;
  background: var(--cream-2, #ede5d8);
}
.proj-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.proj-img img.is-missing { display: none; }
.proj-info { display: flex; gap: 1.1rem; align-items: start; }
.proj-num { font-family: var(--mono, monospace); font-size: 0.75rem; color: var(--brass, #b08d57); padding-top: 0.4rem; flex-shrink: 0; }
.proj-info h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(1.3rem, 2.2vw, 1.8rem); margin: 0 0 0.4rem; color: var(--green, #014d40); }
.proj-info p { color: var(--muted, #5c665f); margin: 0 0 0.6rem; font-size: 0.92rem; }
.proj-tag { font-family: var(--mono, monospace); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brass, #b08d57); }

.proj-cta { background: var(--cream-2, #ede5d8); }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-btns { display: flex; gap: 1.4rem; align-items: center; flex-wrap: wrap; }
.link-underline { font-family: var(--ui, 'Inter', sans-serif); color: var(--green, #014d40); font-weight: 500; font-size: 0.95rem; text-decoration: none; border-bottom: 1px solid rgba(1,77,64,0.4); padding-bottom: 2px; transition: border-color 0.2s; }
.link-underline:hover { border-color: var(--green, #014d40); }

@media (max-width: 680px) {
  .proj-grid { grid-template-columns: 1fr; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
}
</style>
