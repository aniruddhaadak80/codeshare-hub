# CodeShare Hub

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=180&text=CodeShare%20Hub&fontAlign=50&fontAlignY=35&color=0:0f172a,50:312e81,100:7c3aed&fontColor=ffffff&desc=Save%20code%20fast.%20Keep%20it%20tidy.%20Share%20what%20helps.&descAlign=50&descAlignY=58" alt="CodeShare Hub banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=24&duration=2600&pause=900&color=A78BFA&center=true&vCenter=true&width=900&lines=A+simple+home+for+your+best+code+snippets.;Find+helpful+code+faster.;Share+clean+snippets+with+other+developers." alt="Animated intro for CodeShare Hub" />
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js badge" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react" alt="React badge" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript badge" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS badge" /></a>
  <a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/MongoDB-Database-13AA52?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB badge" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel deployment badge" /></a>
</p>

<p align="center">
  CodeShare Hub is a friendly place to <strong>save</strong>, <strong>organize</strong>, and <strong>share</strong> useful code snippets.<br />
  It helps developers keep good code close, so they can reuse it, improve it, and help others faster.
</p>

---

## ✨ Quick look

<p align="center">
  <img src="./docs/images/homepage.png" alt="CodeShare Hub homepage preview" width="100%" />
</p>

### Why this feels useful

- Save snippets before they get lost in old chats, notes, or random files.
- Search and explore shared code with level, source, language, and quick-tag filters.
- Group snippets into collections when a project grows.
- Use the built-in starter library with 100 ready-to-browse snippets.
- Sign in with GitHub or Google and start quickly, or save snippets locally without auth.
- Share code in a clean format with syntax highlighting and voting.

---

## 🧭 Interactive product flow

```mermaid
flowchart TD
    A([Open CodeShare Hub]) --> B{What do you want to do?}
    B --> C[Explore public snippets]
    B --> D[Sign in with GitHub or Google]
    B --> N[Save a snippet locally without auth]
    D --> E[Create a new snippet]
    D --> F[Build a collection]
    C --> G[Open a snippet page]
    C --> O[Use level, source, tag, and search filters]
    E --> H[Add title, code, tags, and language]
    H --> I[Publish or keep it personal]
    N --> P[Store snippet in the current browser only]
    O --> Q[Preview code instantly inside Explore]
    G --> J[Upvote, share, or reuse]
    F --> K[Organize snippets by topic or project]
    I --> L[Grow your own code library]
    P --> L
    Q --> L
    J --> L
    K --> L
    L --> M([Come back faster next time])
```

> Tip: On GitHub, Mermaid diagrams stay interactive enough to expand, zoom, and make the project flow easier to scan.

---

## 🛠️ Tech stack with icons

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,mongodb,nodejs,vercel,github" alt="Tech stack icons for CodeShare Hub" />
</p>

| Layer | Tools |
| --- | --- |
| Frontend | Next.js App Router, React 18, TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js with GitHub and Google sign-in |
| Data | MongoDB + Mongoose |
| UI touches | Lucide React, Framer Motion, React Syntax Highlighter |
| Deployment fit | Vercel |

---

## 🌟 Main features

- **Fast sharing** — create a snippet with title, code, tags, and language.
- **100-snippet starter library** — explore a large built-in catalog immediately, even before the database has content.
- **Advanced discovery** — search across title, description, tags, code, level, and source with best-match ranking.
- **Interactive preview** — inspect the active snippet inline from Explore before opening the full page.
- **Guest-friendly creation** — save snippets without auth directly to local browser storage.
- **Clean reading** — syntax highlighting makes snippets easy to scan.
- **Community feel** — explore public snippets, vote, and share links.
- **Collections** — keep related snippets together.
- **Simple profile pages** — see your own shared work in one place.
- **Modern auth** — sign in with providers people already use.

---

## 🚀 Run it locally

### 1) Install dependencies

```bash
npm install
```

### 2) Add your environment variables

Copy the example file and fill in your real values:

```bash
cp .env.example .env.local
```

| Variable | What it is for |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_URL` | App URL, usually `http://localhost:3000` in local work |
| `NEXTAUTH_SECRET` | Secret used by NextAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub login |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google login |

> No auth configured yet? You can still create snippets in guest mode — they will be saved only to your current browser via local storage.

### 3) Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4) Validate it

```bash
npm run lint
npm run build
```

---

## ▲ Deploy

### Why not GitHub Pages?

GitHub Pages is best for static sites. CodeShare Hub is **not** a static-only project because it uses:

- Next.js server features
- API routes
- NextAuth authentication
- MongoDB data access

That means **Vercel is the right fit here**.

### One-click Vercel deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aniruddhaadak80/codeshare-hub)

### Vercel setup notes

1. Import this repository into Vercel.
2. Add the same environment variables from `.env.example`.
3. Set `NEXTAUTH_URL` to your deployed Vercel domain.
4. Deploy.

This repository now includes a small `vercel.json` file so the project is clearly marked as a Next.js deployment target.

---

## 🔎 Discovery topics

These are the **20 exact topics** prepared for repository discovery and also mirrored in `package.json` keywords:

`codeshare` · `code-snippets` · `snippet-manager` · `nextjs` · `react` · `typescript` · `tailwindcss` · `mongodb` · `mongoose` · `nextauth` · `oauth` · `developer-tools` · `syntax-highlighting` · `app-router` · `full-stack` · `web-app` · `open-source` · `vercel-ready` · `productivity` · `community-platform`

> If you want these to appear as GitHub repository topics in the repo header, add the same 20 words in the GitHub repository **About** settings.

---

## 💡 In simple words

CodeShare Hub helps you stop losing useful code.

Instead of digging through old files or chat messages, you can keep your best snippets in one calm place, give them tags, put them in collections, and share them when someone needs help.

Now it also includes:

- a built-in library of 100 starter snippets,
- richer search with level/source/tag filters and instant preview,
- and guest snippet creation that saves only in the browser when you are not signed in.

---

## 🤝 Contributing

If you want to improve the project, feel free to fork it, build something nice, and open a pull request.

---

## 📄 License

This project is open source and available under the license used by this repository.
