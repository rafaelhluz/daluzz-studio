<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref(null)
let ctx
const founders = reactive([
  {
    name: 'Maria P. Albano',
    role: 'Marketing & Criação',
    initials: 'MA',
    image: '/maria.jpg',
    imageFailed: false,
    bio: 'É quem vive o lado estratégico e criativo da Daluzz, pensando em marcas, comunicação, conteúdo e em como transformar uma ideia em algo que faça sentido visualmente.'
  },
  {
    name: 'Rafael Henrique da Luz',
    role: 'TI & Desenvolvimento',
    initials: 'RL',
    image: '/rafael.jpg',
    imageFailed: false,
    bio: 'É quem fica por trás da parte tecnológica, transformando conceitos em sites, ferramentas e experiências digitais que funcionam de verdade.'
  }
])

const handleImageError = (founder) => {
  founder.imageFailed = true
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('[data-team-heading]', {
      scrollTrigger: { trigger: root.value, start: 'top 78%' },
      opacity: 0, y: 30, duration: .8, ease: 'power3.out'
    })
    gsap.from('[data-founder]', {
      scrollTrigger: { trigger: '[data-founder-grid]', start: 'top 84%' },
      opacity: 0, y: 26, stagger: .14, duration: .75, ease: 'power3.out'
    })
    gsap.from('[data-manifesto]', {
      scrollTrigger: { trigger: '[data-manifesto]', start: 'top 88%' },
      opacity: 0, y: 20, duration: .7, ease: 'power3.out'
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="equipe" ref="root" class="border-b border-neutral-900 py-24 sm:py-32">
    <div class="site-container">
      <div data-team-heading class="mx-auto mb-14 max-w-3xl text-center">
        <span class="section-kicker">Por trás da Daluzz</span>
        <p class="text-lg leading-relaxed text-neutral-300 sm:text-xl">A Daluzz é um projeto criado por Maria e Rafael, que encontraram na mistura das próprias áreas uma forma de construir algo que tivesse a cara dos dois.</p>
      </div>

      <div data-founder-grid class="grid gap-6 md:grid-cols-2">
        <article v-for="founder in founders" :key="founder.name" data-founder class="rounded-3xl border border-neutral-800 bg-neutral-950 p-7 transition-colors duration-300 hover:border-lime-400/40 sm:p-9">
          <div class="mb-8 h-24 w-24 overflow-hidden rounded-2xl border border-lime-400/40 bg-black sm:h-28 sm:w-28">
            <div v-if="founder.imageFailed" class="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_center,rgba(163,230,53,.15),transparent_70%)] text-xl font-black text-lime-400">{{ founder.initials }}</div>
            <img v-else :src="founder.image" :alt="founder.name" class="h-full w-full object-cover" @error="handleImageError(founder)">
          </div>
          <p class="text-xs font-bold uppercase tracking-[.18em] text-lime-400">{{ founder.role }}</p>
          <h2 class="mt-3 text-2xl font-bold text-white">{{ founder.name }}</h2>
          <p class="mt-5 leading-relaxed text-neutral-300">{{ founder.bio }}</p>
        </article>
      </div>

      <p data-manifesto class="mt-10 max-w-4xl border-l-2 border-lime-400 pl-6 text-lg font-semibold leading-relaxed text-white sm:pl-8 sm:text-xl">
        A Daluzz existe justamente nesse encontro: um olhar criativo e estratégico de um lado, tecnologia e desenvolvimento do outro.
      </p>
    </div>
  </section>
</template>
