<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:040810,30:0A1628,60:0D1F38,100:0A1628&height=260&text=⚡%20BoosterBoards&fontColor=F59E0B&fontSize=58&fontAlignY=42&fontAlign=50&desc=Creator%20analytics%20%C2%B7%20Growth%20signals%20%C2%B7%20Workflow%20automation&descColor=475569&descSize=17&descAlignY=62&animation=fadeIn" alt="BoosterBoards" width="100%">

<br/>

<a href="#-the-idea"><img src="https://img.shields.io/badge/Django-6.0-022c22?style=for-the-badge&logo=django&logoColor=4ade80&labelColor=052e16" alt="Django 6.0"></a>&nbsp;
<a href="#-the-idea"><img src="https://img.shields.io/badge/Next.js-16-020617?style=for-the-badge&logo=nextdotjs&logoColor=cbd5e1&labelColor=0f172a" alt="Next.js 16"></a>&nbsp;
<a href="#-the-idea"><img src="https://img.shields.io/badge/PostgreSQL-16-0c1a2e?style=for-the-badge&logo=postgresql&logoColor=7dd3fc&labelColor=082032" alt="PostgreSQL 16"></a>&nbsp;
<a href="#-the-idea"><img src="https://img.shields.io/badge/Redis-7-1c0a0a?style=for-the-badge&logo=redis&logoColor=fca5a5&labelColor=3b0c0c" alt="Redis 7"></a>&nbsp;
<a href="#-the-idea"><img src="https://img.shields.io/badge/OpenAI-insights-1a1226?style=for-the-badge&logo=openai&logoColor=c4b5fd&labelColor=0d0a14" alt="OpenAI"></a>

<br/><br/>

<sub>
&ensp;<a href="#-the-idea">◈ The Idea</a>&ensp;·&ensp;
<a href="#-features">◈ Features</a>&ensp;·&ensp;
<a href="#-stack">◈ Stack</a>&ensp;·&ensp;
<a href="#-architecture">◈ Architecture</a>&ensp;·&ensp;
<a href="#-get-started">◈ Get Started</a>&ensp;·&ensp;
<a href="#-project-layout">◈ Project Layout</a>&ensp;
</sub>

<br/>

</div>

---

```
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                                                                              ║
  ║    YOUR CONTENT IS MOVING.   DO YOU KNOW WHERE?   DO YOU KNOW WHY?           ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
```

<br/>

## ◈ The Idea

BoosterBoards is a **creator intelligence platform** — built for teams who ship video at scale and need more than raw numbers. It unifies analytics from across your stack, surfaces AI-generated explanations for what's happening and *why*, and closes the loop with automated alerts so no spike or milestone goes unnoticed.

> *One command center. Every signal. Zero guesswork.*

The architecture is deliberately modular — backend apps map cleanly to business domains, and the frontend maps to user intent. Nothing bleeds across boundaries unless it absolutely has to.

<br/>

---

## ◈ Stack

<div align="center">

|  Layer  |  Technology  |  Role  |
|:-------:|:------------|:-------|
| `API` | **Django 6 + DRF** | REST endpoints, auth, business logic |
| `Realtime` | **Django Channels + Redis** | WebSocket event broadcasting |
| `Workers` | **Celery + Redis** | Background sync, AI generation tasks |
| `Frontend` | **Next.js 16 (App Router)** | Dashboards, analytics UI, controls |
| `Styling` | **Tailwind CSS** | Component-level design system |
| `Database` | **PostgreSQL 16** | Primary data store |
| `AI` | **OpenAI API** | Insight generation and explanation |
| `Integration` | **YouTube Data API v3** | Channel and video metadata sync |

</div>

<br/>

---

## ◈ Architecture

```
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                                                                             │
 │                        B O O S T E R B O A R D S                            │
 │                           System Architecture                               │
 │                                                                             │
 ├──────────────────────┬────────────────────────┬─────────────────────────────┤
 │                      │                        │                             │
 │   ┌──────────────┐   │   ┌────────────────┐   │   ┌─────────────────────┐   │
 │   │  Next.js 16  │   │   │  Django / DRF  │   │   │    PostgreSQL 16    │   │
 │   │  App Router  │◄──┼──►│  REST  ·  Auth │◄──┼──►│    Primary Store    │   │
 │   └──────┬───────┘   │   └───────┬────────┘   │   └─────────────────────┘   │
 │          │           │           │            │                             │
 │   ┌──────▼───────┐   │   ┌───────▼────────┐   │   ┌─────────────────────┐   │
 │   │  Dashboards  │   │   │    Channels    │   │   │        Redis        │   │
 │   │  Insights UI │   │   │  WebSockets    │   │   │   Cache · Broker    │   │
 │   └──────────────┘   │   └───────┬────────┘   │   └────────┬────────────┘   │
 │                      │           │            │            │                │
 │                      │   ┌───────▼────────┐   │   ┌────────▼────────────┐   │
 │                      │   │    Celery      │◄──┼──►│    Task Queue       │   │
 │                      │   │  YT Sync · AI  │   │   │    Beat Schedule    │   │
 │                      │   └────────────────┘   │   └─────────────────────┘   │
 │                      │                        │                             │
 ├──────────────────────┴────────────────────────┴─────────────────────────────┤
 │                                                                             │
 │    ↳  YouTube Data API  ──  external video and channel metadata             │
 │    ↳  OpenAI API        ──  on-demand insight generation via workers        │
 │                                                                             │
 └─────────────────────────────────────────────────────────────────────────────┘

  Browser → Django REST → PostgreSQL                (request / response path)
  Celery Workers → Redis Broker → Beat Scheduler    (background task path)
  Django Channels → WebSocket → Dashboard           (realtime event path)
```

<br/>

---

## ◈ Get Started

> **Prerequisites** — Python 3.12+, Node.js 20+, PostgreSQL, and Redis running locally.

<br/>

### `1` — Backend

```bash
# Clone and move into backend
cd backend-bb

# Create isolated environment
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate

# Install and configure
pip install -r requirements.txt
cp .env-example .env               # ← fill in your DB, Redis, and API secrets

# Migrate and start
python manage.py migrate
python manage.py runserver
```

To run background tasks alongside the server:

```bash
# In a separate terminal (same virtualenv)
celery -A config worker -l info
```

<br/>

### `2` — Frontend

```bash
cd frontend-bb
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — dashboards load on first visit.

<br/>

---

## ◈ Project Layout

```
CreatorBoost/
│
├── backend-bb/                     ← Django project root
│   │
│   ├── apps/
│   │   ├── analytics/              → metrics, aggregations, trend queries
│   │   ├── ai_insights/            → OpenAI-powered explanation engine
│   │   ├── notifications/          → alerting, milestones, realtime events
│   │   ├── youtube/                → external sync · channel metadata
│   │   └── users/                  → authentication · profile management
│   │
│   └── config/                     → settings · URLs · ASGI / WSGI
│
└── frontend-bb/                    ← Next.js project root
    │
    ├── app/                        → routes and layouts (App Router)
    ├── components/                 → UI components · analytics charts
    └── lib/                        → API client · hooks · utilities
```

<br/>

---

## ◈ Contributing

```
  ┌─────────────────────────────────────────────────────────┐
  │  ✓  Keep pull requests focused — one concern per PR     │
  │  ✓  Write tests for new behavior whenever possible      │
  │  ✓  Respect app boundaries — use service interfaces     │
  │  ✗  Don't reach directly across apps                    │
  │  ✗  Don't let domain logic bleed into config/           │
  └─────────────────────────────────────────────────────────┘
```

<br/>

---

## ✦ License

Open source. See [`LICENSE`](LICENSE) - Do whatever you want.

<br/>
<br/>


<p align="center">
  <i>Built with ☕ and questionable sleep schedules.</i>
</p>

<div align="center">
<p>
  <i>
    Connect with me –
  </i>
</p>

  <a href="https://www.linkedin.com/in/meghan31/" target="_blank">
  <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=logmein&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo" /></a>
  <a href="https://www.instagram.com/me_gun_31/" target="_blank">
  <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="instagram logo"  /></a>
  <a href="https://www.meghan31.me/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Portfolio&logo=biolink&label=&color=000000&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="portfolio logo"  /></a>
  <a href="mailto:meghasrivardhanp@gmail.com" target="_blank">
  <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="gmail logo"  /></a>
 

  
</div>
