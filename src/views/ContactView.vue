<script setup>
import { ref } from 'vue'
import { supabase, CONTACT, whatsappLink } from '../lib/supabase'

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const imageFile = ref(null)
const imagePreview = ref('')
const sending = ref(false)
const sent = ref(false)
const error = ref('')

// ── Web3Forms key ────────────────────────────────────────────────────
const WEB3FORMS_KEY = 'c6f69982-68d3-4a45-b086-d75a3402439d'
// ── ImgBB key ────────────────────────────────────────────────────────
const IMGBB_KEY = '3a29f72476be5274036c38a88b5f7e96'

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) { error.value = 'Image must be under 10MB.'; return }
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = ''
}

async function uploadImage() {
  const formData = new FormData()
  formData.append('image', imageFile.value)
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  if (!data.success) throw new Error('Image upload failed')
  return data.data.url // direct public URL, included in email
}

async function submit() {
  error.value = ''
  if (!name.value || !email.value || !message.value) {
    error.value = 'Please fill in your name, email and message.'
    return
  }
  sending.value = true
  try {
    // 1. Upload image if attached — get direct public URL
    let imageUrl = null
    if (imageFile.value) imageUrl = await uploadImage()

    // 2. Save to Supabase
    await supabase.from('contact_submissions').insert({
      name: name.value,
      email: email.value,
      phone: phone.value || null,
      message: message.value,
      image_url: imageUrl,
    })

    // 3. Email via Web3Forms — image URL included so you see it directly in the email
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: name.value,
        email: email.value,
        phone: phone.value || 'Not provided',
        message: message.value,
        photo: imageUrl ?? 'No photo attached',
        subject: `New enquiry from ${name.value} — ABOV Interiors`,
      }),
    })

    sent.value = true
  } catch (e) {
    error.value = e.message || 'Something went wrong. Please try WhatsApp instead.'
  }
  sending.value = false
}
</script>

<template>
  <!-- HERO -->
  <section class="contact-hero">
    <div class="container">
      <span class="kicker" v-reveal>Get in touch</span>
      <h1 v-reveal="1">Tell us what<br /><em>needs doing.</em></h1>
      <p class="lead" v-reveal="2">Send us a message and we'll come back with honest advice and a clear price — usually within a few hours.</p>
    </div>
  </section>

  <section class="section contact-body">
    <div class="container contact-grid">

      <!-- FORM -->
      <div class="form-wrap" v-reveal>

        <!-- Success -->
        <div v-if="sent" class="form-success">
          <span class="kicker kicker--brass">Message sent ✓</span>
          <h2>We'll be in touch shortly.</h2>
          <p>In a hurry? Message us directly on WhatsApp for a faster reply.</p>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-fill" style="margin-top:1.5rem">WhatsApp us now</a>
        </div>

        <!-- Form -->
        <form v-else class="contact-form" @submit.prevent="submit">
          <h2>Send a message</h2>

          <div class="field-row">
            <label class="field">
              <span>Your name <em class="req">*</em></span>
              <input v-model="name" type="text" placeholder="Jane Smith" :disabled="sending" autocomplete="name" />
            </label>
            <label class="field">
              <span>Email address <em class="req">*</em></span>
              <input v-model="email" type="email" placeholder="jane@example.com" :disabled="sending" autocomplete="email" />
            </label>
          </div>

          <label class="field">
            <span>Phone number <em class="opt">(optional)</em></span>
            <input v-model="phone" type="tel" placeholder="+44 7700 000000" :disabled="sending" autocomplete="tel" />
          </label>

          <label class="field">
            <span>Tell us about the job <em class="req">*</em></span>
            <textarea v-model="message" rows="5" placeholder="e.g. We need flooring in the living room and a full bathroom repaint. Happy to send photos." :disabled="sending"></textarea>
          </label>

          <!-- Image upload -->
          <div class="field">
            <span>Attach a photo <em class="opt">(optional — up to 10MB)</em></span>
            <div v-if="imagePreview" class="upload-preview-wrap">
              <img :src="imagePreview" alt="Preview" class="upload-preview-img" />
              <button type="button" class="remove-img" @click="removeImage" :disabled="sending">✕ Remove</button>
            </div>
            <label v-else class="upload-zone">
              <div class="upload-inner">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <p>Click or drag a photo here</p>
                <p class="upload-hint">JPG, PNG, WEBP — max 10MB</p>
              </div>
              <input type="file" accept="image/*" class="upload-input" @change="onFileChange" :disabled="sending" />
            </label>
          </div>

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <button class="submit-btn" type="submit" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send message' }}
          </button>

          <p class="form-note">Or reach us directly: <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></p>
        </form>
      </div>

      <!-- SIDEBAR -->
      <aside class="contact-info" v-reveal="1">
        <span class="kicker kicker--brass">Contact details</span>

        <div class="info-block">
          <h3>WhatsApp</h3>
          <p>Fastest way to reach us — send photos and we'll reply with honest advice.</p>
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="info-link">{{ CONTACT.whatsappDisplay }}</a>
        </div>

        <div class="info-block">
          <h3>Email</h3>
          <p>For quotes, invoices and anything in writing.</p>
          <a :href="`mailto:${CONTACT.email}`" class="info-link">{{ CONTACT.email }}</a>
        </div>

        <div class="info-block">
          <h3>Where we work</h3>
          <p>Across the UK — most of our projects are in London</p>
        </div>

        <div class="info-block info-block--cta">
          <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-fill wa-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Message on WhatsApp
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }
em.req, em.opt { font-style: normal; color: var(--muted, #5c665f); font-size: 0.82em; font-weight: 400; }

.contact-hero { background: var(--green, #014d40); padding: clamp(9rem, 16vw, 14rem) 0 clamp(4rem, 7vw, 7rem); }
.contact-hero h1 { color: var(--cream, #f5efe6); }
.contact-hero .lead { color: rgba(245,239,230,0.74); margin-top: 1.2rem; max-width: 48ch; }

.contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; }

/* Form */
.contact-form h2 { margin: 0 0 2rem; color: var(--green, #014d40); }
.contact-form { display: grid; gap: 1.3rem; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
.field { display: grid; gap: 0.45rem; }
.field > span { font-family: var(--ui, 'Inter', sans-serif); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.03em; color: var(--ink, #16221e); }
.field input, .field textarea {
  font-family: var(--ui, 'Inter', sans-serif); font-size: 1rem;
  padding: 0.85rem 1rem; border: 1px solid var(--line, rgba(1,58,48,0.18));
  border-radius: 3px; background: #fff; color: var(--ink, #16221e);
  transition: border-color .18s ease; resize: vertical;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--green, #014d40); }
.field input:disabled, .field textarea:disabled { opacity: 0.6; }

/* Upload */
.upload-zone { display: block; position: relative; cursor: pointer; }
.upload-inner {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.5rem; padding: 2rem 1rem; text-align: center;
  border: 2px dashed var(--line, rgba(1,58,48,0.22)); border-radius: 4px;
  color: var(--muted, #5c665f); transition: border-color .18s ease, background .18s ease;
}
.upload-zone:hover .upload-inner { border-color: var(--green, #014d40); background: rgba(1,77,64,0.03); }
.upload-inner p { margin: 0; font-size: 0.9rem; }
.upload-hint { font-size: 0.78rem !important; color: var(--muted, #5c665f); }
.upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
.upload-preview-wrap { position: relative; border-radius: 4px; overflow: hidden; }
.upload-preview-img { width: 100%; max-height: 220px; object-fit: cover; display: block; }
.remove-img {
  position: absolute; top: 0.6rem; right: 0.6rem; background: rgba(1,42,34,0.7);
  color: #fff; border: none; border-radius: 2px; padding: 0.35rem 0.7rem;
  font-size: 0.78rem; cursor: pointer; font-family: var(--ui, 'Inter', sans-serif);
}

.form-error { margin: 0; font-size: 0.88rem; color: #a23b2d; background: rgba(162,59,45,0.07); border: 1px solid rgba(162,59,45,0.18); padding: 0.65rem 0.9rem; border-radius: 3px; }
.form-success { padding: 1rem 0; }
.form-success h2 { margin: 0.5rem 0 0.8rem; color: var(--green, #014d40); }
.form-success p { color: var(--muted, #5c665f); }

.submit-btn {
  width: 100%; padding: 1rem 1.6rem; background: var(--green, #014d40); color: #fff;
  border: none; border-radius: 2px; font-family: var(--ui, 'Inter', sans-serif);
  font-weight: 500; font-size: 1rem; cursor: pointer; transition: background .2s ease;
}
.submit-btn:hover { background: var(--green-deep, #013a30); }
.submit-btn:disabled { opacity: 0.6; cursor: default; }
.form-note { margin: 0; font-size: 0.82rem; color: var(--muted, #5c665f); text-align: center; }
.form-note a { color: var(--green, #014d40); text-decoration: none; border-bottom: 1px solid rgba(1,77,64,0.3); }

/* Sidebar */
.contact-info { display: grid; gap: 2rem; padding-top: 4.5rem; }
.info-block h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(1.2rem, 2vw, 1.5rem); margin: 0 0 0.4rem; color: var(--green, #014d40); }
.info-block p { color: var(--muted, #5c665f); margin: 0 0 0.5rem; font-size: 0.9rem; line-height: 1.6; }
.info-link { font-weight: 500; color: var(--green, #014d40); text-decoration: none; border-bottom: 1px solid rgba(1,77,64,0.3); padding-bottom: 1px; transition: border-color .18s; }
.info-link:hover { border-color: var(--green, #014d40); }
.info-block--cta { margin-top: 0.5rem; }
.wa-btn { display: inline-flex; align-items: center; gap: 0.6rem; }

@media (max-width: 760px) {
  .contact-grid { grid-template-columns: 1fr; }
  .field-row { grid-template-columns: 1fr; }
  .contact-info { padding-top: 0; }
}
</style>
