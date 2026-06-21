<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) router.replace({ name: 'admin-dashboard' })
})

async function signIn() {
  error.value = ''
  if (!email.value || !password.value) { error.value = 'Enter your email and password.'; return }
  loading.value = true
  const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.value.trim(), password: password.value })
  loading.value = false
  if (signInError) {
    error.value = signInError.message === 'Invalid login credentials' ? 'Email or password is incorrect.' : signInError.message
    return
  }
  router.replace({ name: 'admin-dashboard' })
}
</script>

<template>
  <section class="login-wrap">
    <div class="login-card">
      <img src="/abov-logo-green.png" alt="ABOV Interiors" class="login-logo" />
      <h1 class="login-title">Admin sign in</h1>
      <p class="login-sub">Manage projects and site content.</p>
      <form class="login-form" @submit.prevent="signIn">
        <label class="field">
          <span>Email</span>
          <input v-model="email" type="email" autocomplete="username" placeholder="you@abov.co.uk" :disabled="loading" />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••" :disabled="loading" />
        </label>
        <p v-if="error" class="login-error" role="alert">{{ error }}</p>
        <button class="btn-submit" type="submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-wrap { min-height: 100svh; display: grid; place-items: center; padding: 2rem 1.25rem; background: var(--cream, #f5efe6); }
.login-card { width: 100%; max-width: 24rem; background: #fff; border: 1px solid var(--line, rgba(1,58,48,0.14)); border-radius: 6px; padding: clamp(2rem, 5vw, 3rem); }
.login-logo { height: 36px; width: auto; margin-bottom: 1.8rem; display: block; }
.login-title { font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 600; font-size: clamp(1.8rem, 5vw, 2.2rem); margin: 0 0 0.25rem; color: var(--green, #014d40); }
.login-sub { color: var(--muted, #5c665f); margin: 0 0 2rem; font-size: 0.92rem; }
.login-form { display: grid; gap: 1.1rem; }
.field { display: grid; gap: 0.4rem; }
.field span { font-family: var(--ui, 'Inter', sans-serif); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink, #16221e); }
.field input { font-family: var(--ui, 'Inter', sans-serif); font-size: 1rem; padding: 0.8rem 0.9rem; border: 1px solid var(--line, rgba(1,58,48,0.2)); border-radius: 3px; background: var(--cream, #f5efe6); color: var(--ink, #16221e); transition: border-color 0.18s ease, background 0.18s ease; }
.field input:focus { outline: none; border-color: var(--green, #014d40); background: #fff; }
.field input:disabled { opacity: 0.6; }
.btn-submit { width: 100%; margin-top: 0.4rem; padding: 0.95rem 1.6rem; background: var(--green, #014d40); color: #fff; border: none; border-radius: 2px; font-family: var(--ui, 'Inter', sans-serif); font-weight: 500; font-size: 0.95rem; cursor: pointer; transition: background 0.2s ease; }
.btn-submit:hover { background: var(--green-deep, #013a30); }
.btn-submit:disabled { opacity: 0.6; cursor: default; }
.login-error { margin: 0; font-size: 0.88rem; color: #a23b2d; background: rgba(162,59,45,0.07); border: 1px solid rgba(162,59,45,0.18); padding: 0.6rem 0.8rem; border-radius: 3px; }
</style>
