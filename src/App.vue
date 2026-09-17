<script setup>
import { RouterView, RouterLink } from 'vue-router'
import Intestazione from './components/Intestazione.vue'
import { useLingua } from './composables/useLingua'

const { t } = useLingua()
</script>

<template>
  <div class="layout-app">
    <Intestazione />

    <main class="contenitore corpo-principale">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="contenitore footer-interno">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} <strong>ep-algorithms</strong> — {{ t('footer.crediti') }}
        </p>
        <div class="link-footer">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/selettore">{{ t('nav.selettore') }}</RouterLink>
          <RouterLink to="/algoritmi">{{ t('nav.algoritmi') }}</RouterLink>
          <a href="https://github.com/MCR300400" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Reset & stili globali */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--bg-primario);
  color: var(--testo-primario);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background-color 0.25s ease, color 0.2s ease;
}

.contenitore {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.layout-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.corpo-principale {
  flex: 1;
}

.footer {
  border-top: 1px solid var(--bordo-sottile);
  padding: 2.25rem 0;
  margin-top: 4rem;
  font-size: 0.88rem;
  color: var(--testo-secondario);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.footer-interno {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.link-footer {
  display: flex;
  gap: 1.25rem;
}

.link-footer a {
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.link-footer a:hover {
  color: var(--accento);
}
</style>
