# Zahra | App & Web Developer Portfolio

A responsive personal portfolio website that shows who I am, what I do, the projects I have built, and how to contact me.

Built as **Task 1 (Personal Portfolio Website)** of the Full Stack Development Internship at Auspify Technologies.

- **Live site:** [portfolio-nu-jet-55.vercel.app](https://portfolio-nu-jet-55.vercel.app/)
- **Source code:** [github.com/Zahra1106/portfolio](https://github.com/Zahra1106/portfolio)

## Features

- **Hero:** big animated introduction with a portrait that follows the cursor
- **About:** short introduction with a text that reveals letter by letter while scrolling
- **Skills:** the technologies and areas I work in
- **Services:** web development, app development, UI/UX design, backend & APIs, maintenance & support
- **Projects:** stacked project cards that scale as you scroll (Zuno, Al-Sahifa, Food Delivery)
- **Contact:** working contact form, messages arrive in my inbox
- **Responsive:** designed for phones, tablets and desktops
- **Accessible details:** visible keyboard focus, reduced-motion support, labelled form fields

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and build
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- React Context + `useReducer` for the contact form state
- [Web3Forms](https://web3forms.com/) for sending the contact form messages
- [Vercel](https://vercel.com/) for hosting

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Zahra1106/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local address shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Contact Form Setup

The form sends messages through Web3Forms. To use your own inbox:

1. Get a free access key at [web3forms.com](https://web3forms.com/).
2. Open `src/sections/ContactSection.tsx`.
3. Set the key:

   ```tsx
   const WEB3FORMS_ACCESS_KEY = "your-access-key";
   ```

## Project Structure

```
src/
├── components/   Reusable pieces (FadeIn, AnimatedText, Magnet, buttons)
├── sections/     Page sections (Hero, Marquee, About, Skills, Services, Projects, Contact)
├── store/        Contact form state (Context + useReducer)
├── assets/       Static assets used in the code
├── App.tsx       Puts the sections together
└── main.tsx      App entry point
```

## Editing the Content

- **About text:** `src/sections/AboutSection.tsx`
- **Skills:** `skills` list in `src/sections/SkillsSection.tsx`
- **Services:** `services` list in `src/sections/ServicesSection.tsx`
- **Projects:** `projects` list in `src/sections/ProjectsSection.tsx` (add a `liveUrl` to show a "Live Project" button)

## Deployment

The site is deployed on Vercel. Every push to the main branch of the GitHub repository creates a new deployment.