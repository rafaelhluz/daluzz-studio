<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref(null)
const activeStep = ref(0)
let ctx
const steps = [
  { number: '01', title: 'Descoberta & Estratégia', description: 'Mergulhamos no negócio, no público e no mercado para definir uma direção clara e mensurável.' },
  { number: '02', title: 'UI/UX Design', description: 'Transformamos estratégia em jornadas, interfaces e protótipos que antecipam a experiência final.' },
  { number: '03', title: 'Desenvolvimento & Animações', description: 'Construímos com código limpo, alta performance e movimento pensado em cada interação.' },
  { number: '04', title: 'Lançamento & Otimização', description: 'Testamos, publicamos e acompanhamos os dados para evoluir o produto continuamente.' }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('[data-process-heading]', { scrollTrigger: { trigger: root.value, start: 'top 78%' }, opacity: 0, y: 30, duration: .8, ease: 'power3.out' })
    gsap.from('[data-process-list] button', { scrollTrigger: { trigger: '[data-process-list]', start: 'top 82%' }, opacity: 0, y: 25, stagger: .12, duration: .7, ease: 'power3.out' })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="processo" ref="root" class="border-b border-neutral-900 bg-neutral-950/50 py-24 sm:py-32">
    <div class="site-container">
      <div data-process-heading class="mb-16 max-w-3xl"><span class="section-kicker">/ Como trabalhamos</span><h2 class="section-title">Um processo claro.<br><span class="text-lime-400">Nenhuma caixa-preta.</span></h2></div>
      <div data-process-list class="relative grid gap-3 lg:grid-cols-4">
        <div class="absolute left-0 right-0 top-7 hidden h-px bg-neutral-800 lg:block"><div class="h-full bg-lime-400 transition-all duration-500" :style="{ width: (activeStep / (steps.length - 1) * 100) + '%' }" /></div>
        <button v-for="(step, index) in steps" :key="step.number" type="button" :class="['group relative z-10 rounded-2xl border p-6 text-left transition duration-300 lg:border-transparent lg:bg-transparent lg:p-0', activeStep === index ? 'border-lime-400 bg-neutral-950' : 'border-neutral-800 bg-black lg:hover:border-transparent']" @click="activeStep = index" @mouseenter="activeStep = index">
          <span :class="['mb-7 grid h-14 w-14 place-items-center rounded-full border text-sm font-bold transition', index <= activeStep ? 'border-lime-400 bg-lime-400 text-black' : 'border-neutral-700 bg-black text-neutral-500']">{{ step.number }}</span>
          <span class="block pr-4 text-lg font-bold">{{ step.title }}</span>
          <span :class="['mt-4 block text-sm leading-relaxed text-neutral-400 transition lg:pr-6', activeStep === index ? 'opacity-100' : 'lg:opacity-60']">{{ step.description }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
