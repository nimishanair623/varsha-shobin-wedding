# Varsha & Shobin — Wedding Invitation Site

Static site. No build step — just rename your photos/audio as listed below, drop them into `assets/`, and deploy.

## 1. Rename your images into `assets/images/`

From your `varsha_shobin` folder, rename and copy files to these exact names:

| Put this file...                     | ...rename it to              | Used for                          |
|---------------------------------------|-------------------------------|-----------------------------------|
| your favorite hero/couple shot        | `cover.jpg`                   | Fullscreen hero background        |
| solo photo of the bride                | `bride.jpg`                   | "Meet the Couple" — bride portrait |
| solo photo of the groom                | `groom.jpg`                   | "Meet the Couple" — groom portrait |
| the proposal (kneeling) photo         | `proposal-1.jpg`              | "Our Story" — left photo          |
| a proposal/close couple photo         | `proposal-2.jpg`              | "Our Story" — right photo         |
| any 8 photos of your choice           | `gallery-1.jpg` ... `gallery-8.jpg` | Gallery grid              |

Suggested mapping based on the photos you shared (adjust as you like):

- `cover.jpg` → `SRI04515.JPG` (wide, atmospheric)
- `bride.jpg` → `SRI03925.JPG` (solo, red dress in the flower field)
- `groom.jpg` → `1697527357229.jpg` (solo b&w portrait)
- `proposal-1.jpg` → `IMG-20250518-WA0133.jpg` (kneeling proposal with bouquet)
- `proposal-2.jpg` → `IMG-20250520-WA0039.jpg` (embrace right after)
- `gallery-1.jpg` → `DSC08431.jpg`
- `gallery-2.jpg` → `SRI02933.JPG`
- `gallery-3.jpg` → `SRI03263.JPG`
- `gallery-4.jpg` → `SRI05139.jpg`
- `gallery-5.jpg` → `SRI05924.JPG`
- `gallery-6.jpg` → `IMG-20250905-WA0022.jpg`
- `gallery-7.jpg` → `20250722_095001.jpg`
- `gallery-8.jpg` → (any remaining photo of your choice)

Tip: keep each image under ~1–2 MB for fast loading. You can compress with
[squoosh.app](https://squoosh.app) or TinyPNG before renaming, if the originals
are large (several of yours are 10–14 MB).

## 2. Rename your audio into `assets/audio/`

Rename your MP3 (`AUD-20260728-WA0044_`) to:

```
assets/audio/song.mp3
```

## 3. Edit your details (optional)

All text, dates, venues, and phone numbers live in one place:
`js/main.js` → the `CONFIG` object at the top of the file. Edit there if
anything changes — no need to touch the HTML.

## 4. Deploy

**Netlify (drag & drop):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `varsha-shobin-wedding` folder onto the page.
3. Done — you'll get a live URL instantly. You can rename the site under
   Site settings → Change site name.

**GitHub Pages:**
1. Create a new repo, push this folder's contents to it.
2. Go to Settings → Pages → Deploy from branch → `main` / root.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Features included

- Hero section with names, tagline, date
- Live countdown timer
- Our Story (proposal photos)
- Wedding + Reception event cards with Google Maps links & Add to Calendar (Google/ICS)
- Photo gallery with lightbox (click to enlarge, arrow keys to navigate)
- Dress code section
- WhatsApp RSVP + phone call button
- Guestbook — wishes are sent via WhatsApp
- Background music toggle
- Floating floral petals animation
- Share button (native share sheet or copy link)
- Download Invitation (opens print dialog → Save as PDF)
- Fully responsive, works on mobile
