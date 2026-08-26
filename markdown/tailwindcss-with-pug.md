# Comprehensive Setup Guide: Tailwind CSS v4 + Express.js + Pug + TypeScript

This document outlines the complete step-by-step process for configuring and running **Tailwind CSS v4** with **Pug** templates in a **Node.js/Express.js** application written in **TypeScript**.

---

## 1. Directory & File Structure

Ensure your project files are organized as follows:

```text
my-project/
├── public/
│   └── styles/
│       ├── tailwind.css   # Source CSS file
│       └── global.css     # Compiled output CSS
├── views/
│   └── product.pug        # Pug template files
├── services/
├── controllers/
├── utils/
├── postcss.config.js      # PostCSS configuration
├── server.ts              # Express server entry point
├── package.json
└── tsconfig.json
```

---

## 2. Install Required Dependencies

Install the necessary PostCSS and Tailwind v4 dependencies as development tools:

```bash
npm install -D @tailwindcss/postcss postcss postcss-cli concurrently
```

---

## 3. PostCSS Configuration (`postcss.config.js`)

Create a file named `postcss.config.js` in the project root directory. This explicitly forces `@tailwindcss/postcss` to scan your `.pug` view files for dynamic class names:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {
      base: process.cwd(),
      content: ['./views/**/*.pug', './public/**/*.css']
    }
  }
}
```

---

## 4. Source CSS File (`public/styles/tailwind.css`)

Open or create `public/styles/tailwind.css` and include the Tailwind v4 import directive along with explicit source tracking for your views:

```css
@import "tailwindcss";

@source "../../views/**/*.pug";
```

---

## 5. Express Server Setup (`server.ts`)

Ensure your Express application properly serves static assets from the `public` directory and points to the `views` folder:

```typescript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Set Pug as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Example Route
app.get('/products/:id', (req, res) => {
  res.render('product', {
    product: {
      id: req.params.id,
      title: 'Sample Product',
      description: 'Product description goes here.'
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 6. Pug Template Example (`views/product.pug`)

Use standard HTML class attributes inside Pug files to ensure clean resolution by the Tailwind parser:

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        link(rel="stylesheet", href="/styles/global.css")
        title= `Product - ${product.id}`
    body 
        h2(class="bg-red-200 p-4 text-red-900 font-bold text-xl")= product.title 
        p(class="mt-2 text-gray-700")= product.description
```

---

## 7. Configuration Scripts (`package.json`)

Update the `scripts` block in `package.json` to handle CSS compilation using `postcss-cli` alongside `tsx` watch mode using `concurrently`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc -p .",
    "build:css": "postcss public/styles/tailwind.css -o public/styles/global.css",
    "watch:css": "postcss public/styles/tailwind.css -o public/styles/global.css --watch",
    "dev": "concurrently \"npm run watch:css\" \"tsx watch server.ts\""
  }
}
```

---

## 8. Execution & Testing

1. **Clean Legacy Files (If Existing):**
   Delete any existing `tailwind.config.js` file from your project root as it conflicts with Tailwind v4 auto-scanning.

2. **Run Manual Initial Build:**
   ```bash
   npm run build:css
   ```
   *Verify:* Open `public/styles/global.css` and check if utility classes like `.bg-red-200` are generated.

3. **Start Development Environment:**
   ```bash
   npm run dev
   ```

4. **Verify output:**
   Navigate to `http://localhost:5000/products/1` in your browser. Perform a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`) to view styled elements.