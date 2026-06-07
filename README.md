# Ayesh Ul Hassan - Game Developer & Designer Portfolio

A modern, interactive portfolio showcasing game development projects, technical skills, and professional experience. Built with React, TypeScript, and cutting-edge web technologies.

**🌐 Live Demo:** [View Portfolio](https://sudo-ayesh.github.io/portfolio) *(Coming Soon)*

---

## ✨ Features

- **Interactive Hero Section** - Animated landing with custom cursor effects
- **Projects Showcase** - Display of game development projects with filtering
- **Experience & Skills** - Detailed work experience, education, and technical expertise
- **Core Arsenal** - Skill badges with professional icons (Unreal Engine, C++, Godot, etc.)
- **Contact Form** - EmailJS integration for direct email forwarding to your inbox
- **Responsive Design** - Mobile-first, works on all devices
- **Smooth Animations** - GSAP ScrollTrigger for scroll-triggered effects
- **Neural Wave Effects** - 3D animated backgrounds using Three.js
- **Dark Theme** - Sleek dark UI with custom liquid glass effects

---

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0
- TypeScript
- Vite 7.3.0 (Fast build tool)
- Tailwind CSS 3.4.19
- GSAP 3.15.0 (Animation library)
- Three.js 0.184.0 (3D graphics)

**Services:**
- EmailJS - Email forwarding (form submissions → your inbox)
- GitHub Pages - Deployment

**UI Components:**
- Radix UI (Accessible component library)
- Lucide Icons (Clean icon set)
- Custom styled components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/syedayeshulhassanbukhari/portfolio.git
cd portfolio/app

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will open at `http://localhost:3001` (or next available port)

### Project Structure
```
app/
├── src/
│   ├── components/         # Reusable React components
│   ├── sections/           # Page sections (Hero, Projects, Contact, etc.)
│   ├── pages/              # Full page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main app component
├── public/
│   ├── core/               # Skill icons (PNG/SVG)
│   └── projectImages/      # Project showcase images
└── package.json            # Dependencies
```

---

## ⚙️ Configuration

### EmailJS Setup (Contact Form)

To enable the contact form, you need to set up EmailJS:

1. **Sign up** at [emailjs.com](https://www.emailjs.com/)
2. **Get credentials:**
   - Public Key
   - Service ID
   - Template ID

3. **Update** `src/sections/Contact.tsx`:
   ```typescript
   emailjs.init('YOUR_PUBLIC_KEY_HERE');
   
   await emailjs.send(
     'YOUR_SERVICE_ID_HERE',
     'YOUR_TEMPLATE_ID_HERE',
     { ... }
   );
   ```

📖 **Full setup guide:** See `SETUP_EMAILJS.md`

### Customizing Content

- **Experience & Skills:** Update `src/sections/Experience.tsx`
- **Projects:** Modify `src/sections/Projects.tsx`
- **Social Links:** Edit `src/sections/Contact.tsx`
- **Images:** Add PNG/SVG files to `public/core/` for skill icons

---

## 📦 Build & Deployment

### Local Build
```bash
npm run build
```

Generates optimized production build in `dist/` folder

### Deploy to GitHub Pages

1. **Update** `vite.config.ts` with your repository name:
```typescript
export default defineConfig({
  base: '/portfolio/',  // Replace with your repo name
  // ... other config
})
```

2. **Push to GitHub:**
```bash
git add .
git commit -m "Update portfolio"
git push origin master
```

3. **Enable GitHub Pages:**
   - Go to Repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` or `master`
   - Folder: `/ (root)` or `/docs` if you build there

4. **Deploy** (automate with GitHub Actions):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./app/dist
```

---

## 📝 Available Scripts

```bash
# Development server (HMR enabled)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/sections/Hero.tsx` | Landing hero section |
| `src/sections/Projects.tsx` | Projects showcase |
| `src/sections/Experience.tsx` | Work experience & skills |
| `src/sections/Contact.tsx` | Contact form (EmailJS) |
| `SETUP_EMAILJS.md` | Email setup guide |
| `Changes.md` | Resume/CV data in markdown |

---

## 🎮 Projects Included

1. **Unwanted Guest** (IN DEVELOPMENT)
   - Professional internship: Modular gameplay mechanics & AI systems
   - Tech: Unity, C#, AI State Machines

2. **Locked In Fear** (COMPLETED)
   - Horror experience game
   - Tech: Godot, Physics
   - [Play Now](https://lockedinfear.me/html/index.html)

---

## 🔐 Security Notes

- ✅ Contact form emails go **only to you** (hardcoded in code)
- ✅ EmailJS credentials are public-key based (safe to expose)
- ✅ No backend needed - everything runs client-side
- ✅ No sensitive data stored locally

---

## 🤝 Contributing

This is a personal portfolio. For bug reports or suggestions, feel free to open an issue on GitHub.

---

## 📧 Contact & Links

- **Email:** ayeshulhassan@gmail.com
- **GitHub:** [syedayeshulhassanbukhari](https://github.com/syedayeshulhassanbukhari)
- **LinkedIn:** [syedaishulhassan](https://www.linkedin.com/in/syedaishulhassan)
- **Itch.io:** [sudo-ayesh](https://sudo-ayesh.itch.io/)

---

## 📄 License

This portfolio is personal work. Feel free to use as inspiration but please create your own portfolio.

---

## 🙏 Acknowledgments

- **GSAP** - Smooth scroll animations
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **Three.js** - 3D graphics
- **EmailJS** - Easy email service

---

**Last Updated:** June 7, 2026  
**Status:** ✅ Live & Functional
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
