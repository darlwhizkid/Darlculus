# AGENT.md - Darlculus Portfolio

## Build/Test Commands
This is a static HTML portfolio website. No build tools are configured.
- **Development**: Open `index.html` in browser or use a live server
- **Validation**: Check HTML markup and CSS syntax manually
- **Deploy**: Upload static files to web server

## Architecture & Structure
- **Type**: Static HTML/CSS/JS portfolio website  
- **Main file**: `index.html` - Single-page application with multiple sections
- **Assets**: `assets/` directory contains CSS, JS, images, fonts, and files
- **Sections**: Hero, About, Skills, Portfolio, with multilingual support (EN/FR/ES)
- **Features**: Animated preloader, theme switching (dark/light), responsive design

## Code Style & Conventions
- **HTML**: Semantic structure, data attributes for translations (`data-en`, `data-fr`, `data-es`)
- **CSS**: Custom properties for theming, BEM-like naming, mobile-first approach
- **JS**: Vanilla JavaScript, class-based organization, ES6+ features
- **Colors**: Dark theme primary, CSS custom properties in `:root`
- **Fonts**: Courier New monospace for tech aesthetic
- **Naming**: Kebab-case for CSS classes, camelCase for JavaScript

## Key Components
- **Preloader**: Animated loading screen with percentage counter
- **Language Manager**: Multi-language support with localStorage persistence
- **Theme Manager**: Dark/light mode toggle with system preference detection
- **Portfolio Filter**: Category-based project filtering with animations
