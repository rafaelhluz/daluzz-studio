<script setup>
const currentYear = new Date().getFullYear()
const socials = [
  { label: '@daluzzstudio', href: 'https://instagram.com/daluzzstudio' },
  { label: '+55 47 99241-3366', href: 'https://wa.me/5547992413366' }
]
</script>

<template>
  <footer class="border-t border-neutral-900 bg-neutral-950">
    <div class="site-container py-12">
      <div class="flex flex-col justify-between gap-10 border-b border-neutral-800 pb-12 md:flex-row md:items-end">
        <div class="w-full md:max-w-xl">
          <a href="#inicio" aria-label="Voltar ao início" class="flex w-fit max-w-full items-center">
            <img src="/logo.png" alt="DALUZZ studio" class="block h-14 w-auto max-w-full object-contain object-left sm:h-16 md:h-20">
          </a>
          <p class="mt-6 max-w-sm text-sm leading-relaxed text-neutral-500">Criamos o que a sua marca ainda não conseguiu dizer.</p>
          <div class="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-300">
            <span class="w-2 h-2 shrink-0 rounded-full bg-lime-400 animate-pulse" aria-hidden="true"></span>
            Disponível para novos projetos
          </div>
        </div>
        <div class="flex flex-wrap gap-x-7 gap-y-3">
            <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-neutral-300 transition hover:text-lime-400">{{ social.label }} ↗</a>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 pt-7 text-xs text-neutral-600 sm:flex-row sm:items-center">
        <p>© {{ currentYear }} DALUZZ studio. Todos os direitos reservados.</p>
        <a href="#inicio" class="inline-flex items-center gap-2 font-semibold text-neutral-400 transition hover:text-lime-400">Voltar ao topo <span class="grid h-8 w-8 place-items-center rounded-full border border-neutral-800" aria-hidden="true">↑</span></a>
      </div>
    </div>
  </footer>
</template>
