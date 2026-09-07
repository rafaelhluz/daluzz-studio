<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref(null)
let ctx
const solutions = [
  { number: '01', title: 'Estratégia de marca', items: ['Posicionamento', 'Branding', 'Planejamento'] },
  { number: '02', title: 'Identidade visual', items: ['Identidade', 'Direção criativa', 'Materiais de marca'] },
  { number: '03', title: 'Conteúdo & Social Media', items: ['Estratégia de conteúdo', 'Redes sociais', 'Campanhas'] },
  { number: '04', title: 'Design', items: ['Peças gráficas', 'Apresentações', 'Materiais comerciais'] },
  { number: '05', title: 'Sites', items: ['Criação de sites', 'Landing pages', 'Estrutura e design de páginas'] },
  { number: '06', title: 'Experiências digitais', items: ['Projetos digitais', 'UX/UI', 'Interfaces'] }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('[data-create-heading]', {
      scrollTrigger: { trigger: root.value, start: 'top 78%' },
      opacity: 0, y: 30, duration: .8, ease: 'power3.out'
    })
    gsap.from('[data-create-card]', {
      scrollTrigger: { trigger: '[data-create-grid]', start: 'top 82%' },
      opacity: 0, y: 24, stagger: .08, duration: .65, ease: 'power3.out'
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="servicos" ref="root" class="border-b border-neutral-900 py-24 sm:py-32">
    <div class="site-container">
      <div data-create-heading class="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <span class="section-kicker">/ O que fazemos</span>
          <h2 class="section-title max-w-xl">O que podemos criar para a <span class="text-lime-400">sua marca</span></h2>
        </div>
        <p class="max-w-xl text-base leading-relaxed text-neutral-300 lg:justify-self-end">Da estratégia à execução, desenvolvemos soluções para marcas que querem se posicionar, comunicar e crescer.</p>
      </div>

      <div data-create-grid class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="solution in solutions"
          :key="solution.number"
          data-create-card
          class="group flex min-h-[280px] flex-col rounded-2xl border border-neutral-800 bg-neutral-950 p-7 transition-colors duration-300 hover:border-lime-400/50 sm:p-8"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold tracking-[.2em] text-lime-400">{{ solution.number }}</span>
            <span class="h-2 w-2 rounded-full border border-neutral-600 transition-colors group-hover:border-lime-400 group-hover:bg-lime-400" />
          </div>
          <h3 class="mb-8 mt-14 text-xl font-bold tracking-tight text-white sm:text-2xl">{{ solution.title }}</h3>
          <ul class="mt-auto space-y-3">
            <li v-for="item in solution.items" :key="item" class="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
              <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime-400" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
