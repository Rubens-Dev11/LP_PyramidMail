# PyramidMail — Landing Page

> La messagerie professionnelle souveraine, made in Cameroun.

**URL** : https://rubens-dev11.github.io/LP_PyramidMail/
**Auteur** : Rubens Dev
**Stack** : HTML5 / CSS3 / JavaScript vanilla

---

## 📊 Diagnostic du projet — Avril 2026

### État Git
| Propriété | Valeur |
|---|---|
| **Branche** | `main` |
| **Remote** | `https://github.com/Rubens-Dev11/LP_PyramidMail.git` |
| **Dernier commit** | `6adebe3` — fix: hero carousel |

### Architecture
| Dossier | Contenu | Fichiers |
|---|---|---|
| `assets/css/` | Styles complets (8 fichiers) | ✅ Tous présents |
| `assets/js/` | Scripts comportementaux (8 fichiers) | ✅ Tous présents |
| `assets/images/` | Logos SVG, screenshots PNG, drapeau | ✅ 12 fichiers |
| Racine | `index.html`, `merci.html`, `README.md`, `.gitignore` | ✅ |

### Audit fonctionnel
| Composant | État | Détails |
|---|---|---|
| **Navbar** | ✅ OK | Sticky, CTA injecté au scroll, toggle FR/EN desktop |
| **Hero — Typewriter** | ✅ OK | 3 titres/sous-titres FR/EN, pause au survol |
| **Hero — Carousel** | ✅ OK | Auto-rotation 4,5 s + flèches + dots |
| **Avantages — Carousel** | ✅ OK | 3 features cliquables + mockup 3 slides (souveraineté, sécurité, perf) |
| **Fonctionnalités** | ✅ OK | 3 blocs alternés avec images et pills |
| **Waitlist — Formulaire** | ✅ OK | Validation, EmailJS, Google Sheets, anti-doublons localStorage |
| **FAQ** | ✅ OK | Accordéon 4 questions, aria-expanded |
| **Scroll-to-top** | ✅ OK | Sync avec hero "Rejoindre" + bouton mobile flottant |
| **Langue FR/EN** | ✅ OK | localStorage, data-attributes, event `langchange` |
| **Canvas backgrounds** | ✅ OK | Losanges animés sur hero, avantages, waitlist, features (~60fps) |
| **Footer** | ✅ OK | 4 colonnes, liens sociaux, icône 3D |
| **Responsive** | ✅ OK | Breakpoints 900px, 860px, 768px |

### Corrections récentes
| Date | Correction |
|---|---|
| Avr. 2026 | Hero carousel — fonctions `heroChangeSlide()` / `heroGoTo()` manquantes dans `hero.js` |
| Avr. 2026 | Dép Git recréé proprement (ancien merge aborté, nouveau repo `LP_PyramidMail`) |
| Avr. 2026 | Waitlist — anti-doublons localStorage ajouté |
| Avr. 2026 | Avantages — hauteur dynamique des slides corrigée |
| Avr. 2026 | `pyramid-bg.js` — init sous `DOMContentLoaded` |
| Avr. 2026 | `merci.html` — URL retour relatif au lieu de GitHub |

### TODO / Améliorations futures
- [ ] **Backend pour EmailJS** : migrer l'appel API côté serveur pour cacher la clé publique
- [ ] **Compteur d'inscrits** : afficher le nombre de waitlisters (social proof)
- [ ] **Analytics** : Google Analytics ou Plausible pour le tracking
- [ ] **Accessibilité** : `aria-label` manquants sur certains éléments interactifs
- [ ] **Performance** : lazy-loading des images de screenshots (`dashboard.png`, etc.)

---

## 📁 Architecture du projet

```
LP_PyramidMail/
├── index.html                  # Page unique (landing page)
├── merci.html                  # Page de remerciement post-inscription
├── README.md                   # Ce fichier
├── .gitignore
└── assets/
    ├── css/
    │   ├── base.css            # Reset, variables CSS (:root), typographie
    │   ├── navbar.css          # Navigation desktop + hamburger + drawer mobile + toggle langue
    │   ├── hero.css            # Section hero, logo animé, carousel, typewriter, scroll-to-top
    │   ├── advantages.css      # Section avantages + mockup slides (souveraineté, sécurité, perf)
    │   ├── features.css        # Section fonctionnalités (messagerie, productivité, admin)
    │   ├── waitlist.css        # Formulaire d'inscription waitlist
    │   ├── faq.css             # Accordéon FAQ
    │   ├── footer.css          # Pied de page 4 colonnes
    │   └── responsive.css      # Tous les @media queries regroupés
    ├── js/
    │   ├── pyramid-bg.js       # Canvas losanges animés (background toutes sections)
    │   ├── navbar.js           # Drawer mobile + injection CTA au scroll (multilingue)
    │   ├── hero.js             # Carousel hero + typewriter multilingue
    │   ├── advantages.js       # Carousel avantages (slides mockup + features)
    │   ├── lang.js             # Système de traduction FR/EN (localStorage + data-attr)
    │   ├── scrolltop.js        # Bouton scroll-to-top synchronisé avec btn-join-fixed
    │   ├── waitlist.js         # Formulaire waitlist + EmailJS + Google Sheets + anti-doublons
    │   └── faq.js              # Accordéon FAQ (aria-expanded)
    └── images/                 # Logos, screenshots, drapeau, icônes
```

---

## 🌐 Traduction FR/EN

Le site supporte le basculement de langue **Français ↔ Anglais** sans rechargement.

### Toggle de langue

| Mode | Emplacement |
|------|-------------|
| **Desktop (> 860px)** | Dans la barre `<nav>`, entre le bouton "Rejoindre" et le hamburger |
| **Mobile (≤ 860px)** | Dans le drawer mobile, avant le bouton "Rejoindre" |

### Fonctionnement

- **Stockage** : La langue choisie est sauvegardée dans `localStorage` (clé `pm-lang`)
- **Persistance** : Au rechargement, la page s'affiche dans la langue précédemment sélectionnée
- **Attributs** : Chaque élément de texte visible possède `data-fr="..."` et `data-en="..."`
- **Placeholders** : Les champs de formulaire utilisent `data-placeholder-fr` / `data-placeholder-en`
- **Typewriter** : Le hero typewriter redémarre automatiquement dans la nouvelle langue via un événement `langchange`
- **CTA injecté** : Le bouton `.nav-cta` ajouté dynamiquement au scroll est traduit en temps réel

### Fichiers concernés

- `index.html` — 98+ éléments avec attributs `data-fr` / `data-en` + 3 placeholders
- `assets/js/lang.js` — Logique de switch (lecture/écriture localStorage, dispatch `langchange`)
- `assets/js/hero.js` — Objet `HERO_CONTENT` avec titres et sous-titres FR/EN
- `assets/js/navbar.js` — Injection du CTA dans la bonne langue + écouteur `langchange`

### Termes techniques non traduits

OpenPGP, RSA-4096, CAMTEL, 2FA, SMS, Pyramid Mail, PyramidMail, data center, MTN MoMo, Orange Money, CalDAV, PWA, API

---

## 🎯 Sections de la landing page

| # | Section | ID | Description |
|---|---------|----|-------------|
| 1 | **Navbar** | — | Navigation sticky + toggle FR/EN + bouton "Rejoindre" + hamburger mobile + drawer avec toggle langue |
| 2 | **Hero** | `#accueil` | Titre animé multilingue (typewriter), sous-titre, logo SVG animé, carousel 3 screenshots, fond canvas losanges |
| 3 | **Avantages** | `#avantages` | 3 features cliquables (souveraineté, sécurité, performance) + mockup interactif 3 slides |
| 4 | **Fonctionnalités** | `#fonctionnalites` | 3 blocs alternés (messagerie, productivité, admin) avec images et pills de tags |
| 5 | **Waitlist** | `#waitlist` | Formulaire d'inscription multilingue (prénom, nom, email, téléphone) + envoi EmailJS + Google Sheets |
| 6 | **FAQ** | `#faq` | 4 questions en accordéon |
| 7 | **Footer** | — | 4 colonnes (marque, navigation, légal, contact) + icône logo |

---

## 🖱️ Bouton Scroll-to-Top

Un bouton flottant **↑** apparaît en bas à gauche lorsque le bouton "Rejoindre" du hero sort du viewport.

- **Synchronisation** : Le même événement contrôle l'apparition du scroll-to-top (gauche) et du bouton mobile "Rejoindre" (droite)
- **Style** : Semi-transparent avec `backdrop-filter: blur(8px)`
- **Position** : `bottom: 32px; left: 32px` — pas de collision avec le bouton mobile (droite)

---

## 📧 EmailJS — Configuration complète

### Compte EmailJS

| Détail | Valeur |
|--------|--------|
| **Email du compte** | `pyramidmail2026@gmail.com` |
| **Service ID** | `service_8vcsfns` |
| **Template ID** | `template_q0oji1v` |
| **Clé publique** | `blfR01aZiUPHAJ6iI` |

> ⚠️ **La clé publique est exposée côté client.** C'est inhérent à EmailJS en mode frontend pur. Pour sécuriser :
> - Restreindre les domaines autorisés dans le dashboard EmailJS (ajouter `rubens-dev11.github.io`)
> - Activer la reCAPTCHA si disponible
> - À terme, migrer l'appel EmailJS vers un backend serveur

### Template EmailJS

Le template `template_q0oji1v` reçoit les variables suivantes :

| Variable | Source | Exemple |
|----------|--------|---------|
| `{{to_email}}` | Champ email du formulaire | `user@example.com` |
| `{{to_name}}` | Champ prénom | `Jean` |
| `{{prenom}}` | Champ prénom | `Jean` |
| `{{nom}}` | Champ nom | `Dupont` |
| `{{telephone}}` | Champ téléphone | `+237 6 99 34 56 78` |
| `{{confirm_url}}` | URL hardcodée | `https://rubens-dev11.github.io/LP_PyramidMail/merci.html` |

### Flux d'envoi

```
Utilisateur remplit le formulaire
        ↓
Validation côté client (prénom, nom, email regex, tel min 8 chars)
        ↓
Bouton → "Envoi en cours…" (disabled + opacity 0.7)
        ↓
emailjs.send(service_8vcsfns, template_q0oji1v, templateParams)
        ↓
   ┌──── Succès ────┬──── Échec ────
   ↓                ↓               ↓
Toast ✅           fetch Google    Toast ❌
"Email envoyé"     Sheets (no-cors) "Erreur..."
   ↓                ↓
form.reset()       (silencieux)
   ↓
Pré-remplir +237
```

### Fichier concerné

- `assets/js/waitlist.js` — Contient toute la logique : validation, EmailJS, Google Sheets, toast notifications

---

## 📊 Google Sheets — Backup des inscriptions

### Web App URL

```
https://script.google.com/macros/s/AKfycbxq7-HhftfMe6m2Dc5eEa3RYzfQ_44gLrSwfY7y08Nulg5ZZV-nWTQZ5W6gV7IuG5BsVQ/exec
```

### Données envoyées

| Champ | Clé JSON |
|-------|----------|
| Prénom | `prenom` |
| Nom | `nom` |
| Email | `to_email` |
| Téléphone | `telephone` |

### Mode `no-cors`

L'appel utilise `mode: 'no-cors'` pour éviter les erreurs CORS depuis GitHub Pages. La réponse n'est pas lisible côté JavaScript, mais Google Sheets enregistre bien les données. Les erreurs sont capturées silencieusement via `.catch()`.

---

## 🎨 Design System

### Palette de couleurs

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--pm-blue` | `#0087CA` | Couleur principale (boutons, liens, accents) |
| `--pm-light` | `#9ACEE8` | Bleu clair (halo, dégradés) |
| `--pm-bg` | `#EDF3F6` | Fond principal |
| `--pm-gray` | `#DFE5E7` | Gris clair (bordures, dots) |
| `--pm-dark` | `#0a1628` | Texte principal |
| `--pm-white` | `#ffffff` | Fond des cartes |

### Typographie

- **Famille** : `Inter` (Google Fonts, weights 300–800)
- **Titres** : 700–800 weight
- **Corps** : 400 weight
- **Labels** : 600 weight, uppercase, letter-spacing

### Icônes

- **Material Symbols Outlined** (Google Fonts) — utilisées dans le footer

---

## 🖼️ Animations

| Animation | Cible | Type |
|-----------|-------|------|
| `pm-spin3d` | Logo hero | Rotation 3D continue (2.67s) |
| `pm-pulse-halo` | Halo du logo | Pulsation opacity + scale |
| `pm-sweep` | Shine du logo | Balayage diagonal |
| `blink` | Curseur typewriter | Clignotement step-end |
| `floatBtn` | Bouton "Rejoindre" hero | Float vertical infini |
| `blobFloat` | Blob mockup avantages | Scale + translate lent |
| `advProgress` | Barre de progression features | Height 0→100% en 4s |
| `rippleAnim` | Ripple bouclier slide 1 | Scale + opacity pulse |
| `eyeDot` | Points indicateurs | Opacity pulse |
| Canvas losanges | Background sections | `requestAnimationFrame` (~60fps) |

---

## 📱 Responsive

| Breakpoint | Cible |
|------------|-------|
| `≤ 900px` | Avantages → 1 colonne, features → 1 colonne, footer → 2 colonnes, waitlist → 1 colonne |
| `≤ 860px` | Navbar : liens cachés, hamburger affiché, drawer activé, toggle FR/EN dans le drawer, carousel centré |
| `≤ 768px` | Hero → 1 colonne, padding réduit, waitlist/FAQ/features/footer padding adapté |

---

## 🚀 Déploiement

Le site est hébergé sur **GitHub Pages** :

- **Repo** : https://github.com/Rubens-Dev11/LP_PyramidMail
- **Branch** : `main`
- **URL** : https://rubens-dev11.github.io/LP_PyramidMail/

### Pusher le projet

```bash
git add -A
git commit -m "description du changement"
git push origin main
```

---

## 🛠️ TODO / Améliorations futures

- [ ] **Backend pour EmailJS** : migrer l'appel API côté serveur pour cacher la clé publique
- [ ] **Détection de doublons** : empêcher les inscriptions multiples avec le même email
- [ ] **Compteur d'inscrits** : afficher le nombre de personnes sur la waitlist (social proof)
- [ ] **Analytics** : ajouter Google Analytics ou Plausible pour le tracking
- [ ] **SEO** : ajouter meta tags Open Graph, Twitter Card, description, favicon
- [ ] **Accessibilité** : améliorer les contrastes, ajouter des `aria-label` manquants
- [ ] **Page merci.html** : créer une vraie page de remerciement avec lien de retour
#   L P _ P y r a m i d M a i l  
 