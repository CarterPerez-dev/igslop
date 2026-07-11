<!-- ©AngelaMos | 2026 | README.md -->

```
 ___ ____ ____  _     ___  ____
|_ _/ ___/ ___|| |   / _ \|  _ \
 | | |  _\___ \| |  | | | | |_) |
 | | |_| |___) | |__| |_| |  __/
|___\____|____/|_____\___/|_|
```

Drop an Instagram carousel slide. Find out if it's a poster or slop.

**[igslop.com](https://igslop.com)**

---

One slide in, a verdict out: **POSTER**, **NEWSPAPER**, or **SLOP**. Plus a
0-100 score, six axes scored (focal, hierarchy, space, restraint, color, type),
every mechanical AI/template tell it catches, and the exact edits to fix them.

Gemini 2.5 Flash does the looking. The rubric comes from a stupid amount of
research on what wins the 2026 feed and what reads as generated garbage.

No login. No saved uploads. You get graded and you leave.

## Run it

```
just dev-up        # needs GEMINI_API_KEY in .env.development
```

Stack: FastAPI, React, Gemini 2.5 Flash, nginx, Redis, Docker, Cloudflare Tunnel.
