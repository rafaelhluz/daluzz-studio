<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref(null)
const channels = ['WhatsApp', 'Instagram']
const form = reactive({
  name: '',
  email: '',
  channel: 'WhatsApp',
  message: ''
})
const toastMessage = ref('')
let toastTimer
let ctx

const showToast = (message) => {
  toastMessage.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 4500)
}

const buildBriefing = () => [
  'Briefing - DALUZZ studio',
  '',
  `• Nome: ${form.name}`,
  `• E-mail: ${form.email}`,
  `• Canal preferido: ${form.channel}`,
  `• Mensagem: ${form.message || 'Não informada'}`
].join('\n')

const copyBriefing = async (briefing) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(briefing)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = briefing
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

const handleSubmit = async () => {
  const briefing = buildBriefing()

  if (form.channel === 'WhatsApp') {
    const encodedMessage = encodeURIComponent(briefing)
    window.open(`https://wa.me/5547992413366?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
    return
  }

  const directUrl = 'https://ig.me/m/daluzzstudio'
  const fallbackUrl = 'https://instagram.com/daluzzstudio'
  const directWindow = window.open('', '_blank')

  try {
    await copyBriefing(briefing)
    showToast('Briefing copiado! Cole no Direct do Instagram.')
  } catch {
    showToast('Não foi possível copiar automaticamente. Copie os dados antes de enviar.')
  }

  if (directWindow) {
    directWindow.opener = null
    directWindow.location.href = directUrl
  } else {
    window.location.href = fallbackUrl
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('[data-contact-manifesto]', {
      scrollTrigger: { trigger: root.value, start: 'top 78%' },
      opacity: 0,
      y: 32,
      duration: .85,
      ease: 'power3.out'
    })
    gsap.from('[data-contact-cta]', {
      scrollTrigger: { trigger: '[data-contact-cta]', start: 'top 86%' },
      opacity: 0,
      y: 28,
      duration: .75,
      ease: 'power3.out'
    })
    gsap.from('[data-contact-form]', {
      scrollTrigger: { trigger: '[data-contact-form]', start: 'top 86%' },
      opacity: 0,
      y: 28,
      duration: .8,
      ease: 'power3.out'
    })
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
  window.clearTimeout(toastTimer)
})
</script>

<template>
  <section id="contato" ref="root" class="relative overflow-hidden py-24 sm:py-32">
    <div class="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-400/10 blur-[150px]" />

    <div class="site-container relative">
      <div data-contact-manifesto class="grid gap-10 border-b border-neutral-900 pb-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <span class="section-kicker self-start">/ No que acreditamos</span>
        <div class="max-w-3xl space-y-6 text-lg leading-relaxed text-neutral-300 sm:text-xl">
          <p class="font-semibold text-white">A gente acredita que dá pra fazer diferente.</p>
          <p>Não diferente só por ser diferente.</p>
          <p>Mas porque cada marca tem uma história, um jeito de falar e uma razão para existir. E isso merece aparecer em tudo o que ela cria.</p>
          <p>É por isso que a gente não parte de fórmulas prontas. A gente olha para cada projeto, entende o que existe por trás dele e encontra uma forma de transformar isso em algo que tenha identidade.</p>
        </div>
      </div>

      <div data-contact-cta class="py-16 text-center sm:py-20">
        <h2 class="text-3xl font-black leading-tight tracking-[-.04em] text-white sm:text-4xl lg:text-5xl">Vamos criar alguma coisa <span class="text-lime-400">juntos?</span></h2>
        <button form="contact-form" type="submit" class="mt-8 inline-flex rounded-full bg-lime-400 px-8 py-4 text-sm font-black uppercase tracking-[.12em] text-black transition hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(163,230,53,.25)]">
          Falar com a Daluzz <span class="ml-2" aria-hidden="true">↗</span>
        </button>
      </div>

      <form id="contact-form" data-contact-form class="mx-auto max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-9" @submit.prevent="handleSubmit">
        <div class="mb-8">
          <p class="text-xs font-bold uppercase tracking-[.18em] text-lime-400">Enviar briefing</p>
          <p class="mt-2 text-sm text-neutral-400">Preencha seus dados e escolha onde prefere continuar a conversa.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <label>
            <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Nome</span>
            <input v-model.trim="form.name" required autocomplete="name" type="text" placeholder="Seu nome" class="w-full border-b border-neutral-700 bg-transparent py-3 text-sm text-white placeholder-neutral-600 transition focus:border-lime-400 focus:outline-none">
          </label>
          <label>
            <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">E-mail</span>
            <input v-model.trim="form.email" required autocomplete="email" type="email" placeholder="voce@empresa.com" class="w-full border-b border-neutral-700 bg-transparent py-3 text-sm text-white placeholder-neutral-600 transition focus:border-lime-400 focus:outline-none">
          </label>
        </div>

        <fieldset class="mt-8">
          <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">Canal preferido</legend>
          <div class="flex flex-wrap gap-2">
            <label v-for="channel in channels" :key="channel" class="cursor-pointer">
              <input v-model="form.channel" type="radio" name="channel" :value="channel" class="peer sr-only">
              <span class="block rounded-full border border-neutral-700 px-5 py-2.5 text-xs font-semibold text-neutral-300 transition hover:border-neutral-500 peer-checked:border-lime-400 peer-checked:bg-lime-400 peer-checked:text-black">{{ channel }}</span>
            </label>
          </div>
        </fieldset>

        <label class="mt-8 block">
          <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Mensagem <span class="normal-case tracking-normal text-neutral-600">(opcional)</span></span>
          <textarea v-model.trim="form.message" rows="4" placeholder="Conte um pouco sobre a sua ideia ou projeto" class="w-full resize-none rounded-xl border border-neutral-800 bg-black p-4 text-sm text-white placeholder-neutral-600 transition focus:border-lime-400 focus:outline-none" />
        </label>

        <button type="submit" class="mt-8 w-full rounded-full border border-lime-400 px-7 py-4 text-sm font-bold text-lime-400 transition hover:bg-lime-400 hover:text-black">Enviar briefing</button>
      </form>
    </div>

    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="translate-y-3 opacity-0"
      leave-active-class="transition duration-200"
      leave-to-class="translate-y-3 opacity-0"
    >
      <div v-if="toastMessage" class="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 rounded-xl border border-lime-400/40 bg-neutral-950 px-5 py-4 text-center text-sm font-semibold text-lime-400 shadow-2xl" role="status" aria-live="polite">
        {{ toastMessage }}
      </div>
    </Transition>
  </section>
</template>
