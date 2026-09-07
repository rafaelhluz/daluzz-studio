<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isOpen = ref(false)
const isScrolled = ref(false)
const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' }
]
const handleScroll = () => { isScrolled.value = window.scrollY > 24 }
const closeMenu = () => { isOpen.value = false }

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['fixed inset-x-0 top-0 z-50 border-b transition-all duration-300', isScrolled || isOpen ? 'border-neutral-800 bg-black/90 backdrop-blur-xl' : 'border-transparent bg-transparent']">
    <div class="site-container flex h-20 items-center justify-between">
      <a href="#inicio" class="relative z-10 flex h-12 items-center" aria-label="DALUZZ studio, início" @click="closeMenu">
        <img src="/logo.png" alt="DALUZZ studio" class="h-28 w-auto max-w-none object-contain sm:h-32">
      </a>
      <nav class="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
        <a v-for="link in links" :key="link.href" :href="link.href" class="text-sm font-medium text-neutral-300 transition-colors hover:text-lime-400">{{ link.label }}</a>
      </nav>
      <a href="#contato" class="hidden rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold transition-all hover:border-lime-400 hover:text-lime-400 sm:block">Começar um projeto</a>
      <button class="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-neutral-800 lg:hidden" type="button" :aria-expanded="isOpen" aria-controls="mobile-menu" aria-label="Abrir menu" @click="isOpen = !isOpen">
        <span class="sr-only">Menu</span>
        <span class="flex w-5 flex-col gap-1.5">
          <span :class="['h-px w-full bg-white transition-transform', isOpen && 'translate-y-[3.5px] rotate-45']" />
          <span :class="['h-px w-full bg-white transition-transform', isOpen && '-translate-y-[3.5px] -rotate-45']" />
        </span>
      </button>
    </div>
    <div v-show="isOpen" id="mobile-menu" class="border-t border-neutral-900 bg-black px-5 pb-8 pt-4 lg:hidden">
      <nav class="site-container flex flex-col px-0" aria-label="Navegação mobile">
        <a v-for="link in links" :key="link.href" :href="link.href" class="border-b border-neutral-900 py-4 text-lg font-semibold" @click="closeMenu">{{ link.label }}</a>
        <a href="#contato" class="mt-6 rounded-full bg-lime-400 px-6 py-4 text-center font-bold text-black" @click="closeMenu">Começar um projeto</a>
      </nav>
    </div>
  </header>
</template>
