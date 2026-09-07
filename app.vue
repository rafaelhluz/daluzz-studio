<script setup>
useHead({
  title: 'DALUZZ studio — Design & Desenvolvimento',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-black text-white">
    <Navbar />
    <main>
      <HeroSection />
      <WhatWeCreateSection />
      <TeamSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>
