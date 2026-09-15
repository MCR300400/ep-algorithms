# ep-algorithms (Cloudflare Pages + Vue 3)

Piattaforma interattiva ad alte prestazioni per la scelta, l'analisi e la visualizzazione degli algoritmi informatici fondamentali.
Progettata e sviluppata per l'hosting statico a costo zero su **Cloudflare Pages**, con architettura completamente client-side (zero backend).

---

## 🚀 Caratteristiche Principali

- **🎯 Selettore Guidato di Algoritmi (Wizard)**:
  Un motore di raccomandazione a risposta multipla che analizza i requisiti computazionali (obiettivo, ordinamento preliminare, vincoli di memoria RAM in-place, stabilità, pesi di rete) e suggerisce l'algoritmo ottimale con indice di compatibilità (% Match).

- **📊 Dimostrazioni Grafiche Live (Visualizzatore Interattivo)**:
  Simulatore grafico interattivo nativo (zero dipendenze esterne pesanti) con:
  - Generazione di dati casuali ad ogni avvio o su richiesta.
  - Controlli completi: *Avvia (Play)*, *Pausa*, *Passo successivo*, *Passo precedente*, *Reset* e slider per la velocità di esecuzione.
  - Log e spiegazione in tempo reale di ogni operazione (confronto, partizionamento, rilassamento archi, ecc.).

- **💻 Implementazioni in 6 Linguaggi**:
  Ogni algoritmo include codice sorgente verificato e pronto all'uso con pulsante di copia negli appunti per:
  - **Python**
  - **Java**
  - **TypeScript**
  - **JavaScript**
  - **C**
  - **C#**

- **🎨 Design System Artigianale & Doppio Tema**:
  - Tema **Dark** (predefinito al primo avvio) e **Light**.
  - Accento cromatico arancione ambrato/internazionale.
  - Persistenza automatica della preferenza in `localStorage`.
  - Zero-FOUC (nessun flash di luce al caricamento).

- **🔒 Privacy-First Analytics**:
  Modulo di telemetria integrato con il backend Cloudflare Workers (`ep-analytics`). Zero cookie, zero profilazione, zero violazioni GDPR.

---

## 🛠️ Stack Tecnologico

- **Framework**: Vue 3 (Composition API con `<script setup>`)
- **Bundler & Dev Server**: Vite 6
- **Routing**: Vue Router 4 (modalità history)
- **Deployment**: Cloudflare Pages (`wrangler.jsonc`)

---

## 📦 Installazione e Avvio Locale

```bash
# 1. Naviga nella cartella del progetto
cd ep-algorithms

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo Vite
npm run dev

# 4. Build di produzione per Cloudflare Pages
npm run build
```

---

## ☁️ Deploy su Cloudflare Pages

- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**:
  - `VITE_API_URL`: URL del worker `ep-analytics` (es. `https://analytics.edoardopippi.dev`)
  - `VITE_CHIAVE_SITO`: Chiave del sito configurata in D1
