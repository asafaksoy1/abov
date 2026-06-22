// src/directives/reveal.js
// Drop-in replacement for the existing reveal directive.
// Usage:
//   v-reveal              → fade + slide up (default)
//   v-reveal="1"          → same with 100ms stagger delay
//   v-reveal.left         → slide from left
//   v-reveal.right        → slide from right
//   v-reveal.scale        → scale up
//   v-reveal.split        → each word animates individually
//   v-reveal.slow         → slower duration

const io = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el._revealDelay ?? 0
            setTimeout(() => {
              el.classList.add('revealed')
              // also reveal split children
              el.querySelectorAll('.split-word').forEach((w, i) => {
                setTimeout(() => w.classList.add('revealed'), i * 55)
              })
            }, delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  : null

function prepare(el, binding) {
  const mods = binding.modifiers ?? {}
  const val = binding.value

  // stagger delay from numeric value
  const staggerIndex = typeof val === 'number' ? val : 0
  el._revealDelay = staggerIndex * 110

  // add base class
  el.classList.add('v-reveal')
  if (mods.left)  el.classList.add('v-reveal--left')
  if (mods.right) el.classList.add('v-reveal--right')
  if (mods.scale) el.classList.add('v-reveal--scale')
  if (mods.slow)  el.classList.add('v-reveal--slow')

  // split text into word spans
  if (mods.split && el.textContent) {
    const text = el.textContent
    el.innerHTML = text
      .split(' ')
      .map((w) => `<span class="split-word">${w}</span>`)
      .join(' ')
    el.classList.add('v-reveal--split')
  }

  if (io) io.observe(el)
  else el.classList.add('revealed') // SSR / no IO fallback
}

export default {
  mounted: prepare,
  updated(el, binding) {
    // re-run if binding changes
    el.classList.remove('v-reveal', 'v-reveal--left', 'v-reveal--right', 'v-reveal--scale', 'v-reveal--slow', 'v-reveal--split', 'revealed')
    prepare(el, binding)
  },
  unmounted(el) {
    if (io) io.unobserve(el)
  },
}
