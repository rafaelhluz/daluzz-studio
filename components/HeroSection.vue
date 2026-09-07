<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from('[data-hero-badge]', { opacity: 0, y: 14, duration: .65 })
      .from('[data-hero-title]', { opacity: 0, y: 32, filter: 'blur(6px)', duration: .85 }, '-=.3')
      .from('[data-hero-subtitle]', { opacity: 0, y: 24, duration: .75 }, '-=.45')
      .from('[data-hero-copy]', { opacity: 0, y: 18, duration: .65 }, '-=.4')
      .from('[data-hero-actions]', { opacity: 0, y: 14, duration: .6 }, '-=.35')
    gsap.to('[data-hero-glow]', { opacity: .3, scale: 1.12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="inicio" ref="root" class="relative flex min-h-screen items-center overflow-hidden border-b border-neutral-900 pb-16 pt-28 sm:pb-20">
    <div data-hero-glow class="pointer-events-none absolute left-1/2 top-[38%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/20 opacity-20 blur-[130px] sm:h-[30rem] sm:w-[30rem]" />
    <div class="pointer-events-none absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

    <div class="site-container relative z-10">
      <div data-hero-badge class="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-lime-400 sm:text-xs">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
        Conteúdo • Estratégia • Criação de Sites
      </div>

      <h1 class="max-w-4xl tracking-[-.04em]">
        <span data-hero-title class="block text-2xl font-black leading-[1.16] text-lime-400 sm:text-3xl md:text-4xl lg:text-[2.75rem]">Sua marca não precisa parecer com nenhuma outra.</span>
        <span data-hero-subtitle class="mt-2 block text-2xl font-bold leading-[1.18] text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">E é exatamente por isso que a gente existe.</span>
      </h1>

      <p data-hero-copy class="mt-7 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">Criamos marcas, sites e experiências para quem quer fugir do comum.</p>

      <div data-hero-actions class="mt-9 flex flex-col gap-3 sm:flex-row">
        <a href="#contato" class="rounded-full bg-lime-400 px-7 py-4 text-center text-sm font-bold text-black transition hover:bg-lime-300">Iniciar um projeto <span aria-hidden="true">↗</span></a>
        <a href="#servicos" class="rounded-full border border-neutral-700 bg-neutral-950/70 px-7 py-4 text-center text-sm font-semibold text-neutral-300 transition hover:border-lime-400 hover:text-lime-400">O que criamos</a>
      </div>
    </div>
  </section>
</template>
