<script setup>
import { ref } from 'vue'
import { CONTACT, whatsappLink } from '../lib/supabase'

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)
const error = ref('')

// ─── Replace this with your Web3Forms access key ───────────────────────────
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY'
// ──────────────────────────────────────────────────────────────────────────

async function submit() {
  error.value = ''
  if (!name.value || !email.value || !message.value) {
    error.value = 'Please fill in your name, email and message.'
    return
  }
  sending.value = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
        subject: `New enquiry from ${name.value} — ABOV Interiors`,
      }),
    })
    const data = await res.json()
    if (data.success) { sent.value = true }
    else { error.value = 'Something went wrong. Please try WhatsApp instead.' }
  } catch {
    error.value = 'Could not send. Please try WhatsApp instead.'
  }
  sending.value = false
}
</script>

<template>
  <section class="contact-hero">
    <div class="container">
      <span class="kicker" v-reveal>Get in touch</span>
      <h1 v-reveal="1">Tell us what<br /><em>needs doing.</em></h1>
      <p class="lead" v-reveal="2">Send us a message and we'll come back with honest advice and a clear price.</p>
    </div>
  </section>

  <section class="section contact-body">
    <div class="container contact-grid">

      <!-- Form -->
      <div class="form-wrap" v-reveal>
        <!-- Success state -->
        <div v-if="sent" class="form-success">
          <span class="kicker kicker--brass">Message sent</span>
          <h2>We'll be in touch shortly.</h2>
          <p>In a hurry? Message us directly on WhatsApp for a faster reply.</p>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-fill" style="margin-top:1.5rem">WhatsApp us</a>
        </div>

        <!-- Form -->
        <form v-else class="contact-form" @submit.prevent="submit">
          <h2>Send a message</h2>

          <div class="field-row">
            <label class="field">
              <span>Your name <em class="req">*</em></span>
              <input v-model="name" type="text" placeholder="Jane Smith" :disabled="sending" />
            </label>
            <label class="field">
              <span>Email address <em class="req">*</em></span>
              <input v-model="email" type="email" placeholder="jane@example.com" :disabled="sending" />
            </label>
          </div>

          <label class="field">
            <span>Phone number <em class="opt">(optional)</em></span>
            <input v-model="phone" type="tel" placeholder="+44 7700 000000" :disabled="sending" />
          </label>

          <label class="field">
            <span>Tell us about the job <em class="req">*</em></span>
            <textarea v-model="message" rows="6" placeholder="e.g. We need flooring in the living room and kitchen, plus a bathroom repaint — happy to send photos." :disabled="sending"></textarea>
          </label>

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <button class="btn btn-fill submit-btn" type="submit" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send message' }}
          </button>
        </form>
      </div>

      <!-- Contact info -->
      <aside class="contact-info" v-reveal="1">
        <span class="kicker kicker--brass">Contact details</span>

        <div class="info-block">
          <h3>WhatsApp</h3>
          <p>The fastest way to reach us — send photos of the space and we'll reply with honest advice.</p>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="info-link">{{ CONTACT.whatsappDisplay }}</a>
        </div>

        <div class="info-block">
          <h3>Email</h3>
          <p>For quotes, invoices and anything else in writing.</p>
          <a :href="`mailto:${CONTACT.email}`" class="info-link">{{ CONTACT.email }}</a>
        </div>

        <div class="info-block">
          <h3>Based in</h3>
          <p>We work across the UK. Most of our projects are in England.</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }
em.req, em.opt { font-style: normal; color: var(--muted, #5c665f); font-size: 0.85em; }

.contact-hero {
  background: var(--green, #014d40);
  padding: clamp(9rem, 16vw, 14rem) 0 clamp(4rem, 7vw, 7rem);
}
.contact-hero h1 { color: var(--cream, #f5efe6); }
.contact-hero .lead { color: rgba(245,239,230,0.74); margin-top: 1.2rem; max-width: 48ch; }

.contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; }

/* Form */
.contact-form h2 { margin: 0 0 2rem; }
.contact-form { display: grid; gap: 1.4rem; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.field { display: grid; gap: 0.45rem; }
.field span { font-family: var(--ui, 'Inter', sans-serif); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.02em; color: var(--ink, #16221e); }
.field input, .field textarea {
  font-family: var(--ui, 'Inter', sans-serif); font-size: 1rem;
  padding: 0.85rem 1rem; border: 1px solid var(--line, rgba(1,58,48,0.18));
  border-radius: 3px; background: var(--cream-2, #ede5d8); color: var(--ink, #16221e);
  transition: border-color 0.18s ease, background 0.18s ease; resize: vertical;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--green, #014d40); background: #fff; }
.field input:disabled, .field textarea:disabled { opacity: 0.6; }
.submit-btn { width: 100%; padding-block: 1rem; margin-top: 0.4rem; }
.submit-btn:disabled { opacity: 0.6; cursor: default; }
.form-error { margin: 0; font-size: 0.88rem; color: #a23b2d; background: rgba(162,59,45,0.07); border: 1px solid rgba(162,59,45,0.18); padding: 0.7rem 0.9rem; border-radius: 3px; }
.form-success { padding: 2rem 0; }
.form-success h2 { margin: 0.5rem 0 0.8rem; }

/* Info aside */
.contact-info { display: grid; gap: 2.4rem; padding-top: 4rem; }
.info-block h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(1.3rem, 2vw, 1.6rem); margin: 0 0 0.4rem; }
.info-block p { color: var(--muted, #5c665f); margin: 0 0 0.6rem; font-size: 0.92rem; }
.info-link { font-weight: 500; color: var(--green, #014d40); text-decoration: none; border-bottom: 1px solid rgba(1,77,64,0.35); padding-bottom: 1px; transition: border-color 0.18s ease; }
.info-link:hover { border-color: var(--green, #014d40); }

@media (max-width: 760px) {
  .contact-grid { grid-template-columns: 1fr; }
  .field-row { grid-template-columns: 1fr; }
  .contact-info { padding-top: 0; }
}
</style>
