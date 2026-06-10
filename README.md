# Royal — Mana Shamim Online Shop

This is the new dynamic version of the Royal / Mana Shamim website. The whole
catalog is data-driven: every product card, the shop page, the homepage
"Featured" and "New Arrivals" sections, and every product detail page are all
generated automatically from **one file** — `data/products.js`.

You do **not** need to know how to code to add, edit, or remove products.
You also do **not** need a server: just double-click `index.html` (or any
other page) to open the site in your browser.

---

## 1. How the site is organized

```
Mana Shop 4/
├── index.html        Homepage (slideshow, about, categories, featured, new arrivals)
├── shop.html         Full shop with category filter, search, and sorting
├── product.html      Product detail page — shared by ALL products (uses ?id=...)
├── cart.html         Shopping cart page
├── checkout.html      Checkout / order page (demo)
├── about.html        About Us + catalog downloads
├── Contact.html       Contact form, office info, and map
├── data/
│   └── products.js   ⭐ ALL PRODUCT DATA LIVES HERE — edit this to change the shop
├── images/           Product photos + placeholder.svg
├── css/style.css     Small set of custom styles (animations, fonts, RTL tweaks)
└── js/
    ├── i18n.js            All UI text in English, German & Persian (Farsi)
    ├── script.js          Shared header/footer, navigation, language switcher
    ├── cart.js            Shopping cart logic (localStorage)
    ├── product-render.js  Shared product card / grid / quick-view rendering
    ├── home.js            Homepage logic
    ├── shop.js            Shop page logic (filter/search/sort)
    ├── product.js         Product detail page logic
    ├── cart-page.js        Cart page logic
    ├── checkout.js        Checkout page logic (demo)
    └── contact.js         Contact form logic (demo)
```

---

## 2. Adding / editing products (the important part!)

Open **`data/products.js`** in any text editor (Notepad, TextEdit, VS Code,
etc.). Near the top you'll find the `CATEGORIES` list, and below it the big
`PRODUCTS` array. Each product looks like this:

```js
{
  id: "80",                 // must be unique — never reuse an existing id
  sku: "RYL-PRF-080",       // optional reference code, shown on product page
  category: "perfume",      // must match one of the CATEGORIES keys below
  name: {
    en: "Royal Oud",
    de: "Royal Oud",
    fa: "رویال عود",
  },
  description: {
    en: "A short one-line description shown on product cards.",
    de: "Eine kurze Beschreibung für die Produktkarte.",
    fa: "توضیح کوتاه برای کارت محصول.",
  },
  longDescription: {
    en: "A longer paragraph shown on the product detail page.",
    de: "Ein längerer Absatz für die Produktdetailseite.",
    fa: "توضیح کامل‌تر برای صفحه جزئیات محصول.",
  },
  price: 24.99,              // number only, no currency symbol
  currency: "EUR",
  images: [
    "images/products/royal-oud-1.jpg",
    "images/products/royal-oud-2.jpg",
  ],
  stock: 25,                 // 0 = "Out of stock"
  isNew: true,                // shows a "New" badge + appears in New Arrivals
  isFeatured: false,          // shows on the homepage Featured section
}
```

### To add a new product
1. Copy an existing product object (the `{ ... }` block, including the curly
   braces) that's similar to what you're adding.
2. Paste it just before the closing `];` of the `PRODUCTS` array, separated
   from the previous entry by a comma.
3. Give it a **new, unique `id`** (just increment the highest existing number).
4. Update `name`, `description`, `longDescription`, `price`, `category`,
   `images`, and `stock`.
5. Save the file. That's it — the product instantly appears in the shop,
   search, and (if `isNew`/`isFeatured` is `true`) on the homepage. No new
   HTML page is ever needed; the product is automatically reachable at
   `product.html?id=80`.

### To edit a product
Find it by its `id`, `sku`, or name (use Ctrl+F / Cmd+F) and change any
field. Saving the file updates the live site immediately.

### To remove a product
Delete its entire `{ ... }` block (and the comma before or after it, so the
list stays valid). Or, if you'd rather hide it temporarily, set
`stock: 0` — it will show as "Out of stock" but still be visible.

### Adding photos
Put image files into the `images/` folder (you can create subfolders, e.g.
`images/products/`), then reference them in the product's `images` array
using the path relative to the site root, e.g. `"images/products/myphoto.jpg"`.
If a product has no images, it automatically falls back to
`images/placeholder.svg`.

### Categories
The 7 categories (Perfume, Cologne, Body Spray, Air Freshener, Industrial,
Celebration, Stands) are defined at the top of `data/products.js` in the
`CATEGORIES` array. Each has a `key` (used by products), a name in all three
languages, and an emoji `icon`. You can rename categories or change icons
there, but changing a category's `key` requires also updating every product
that uses that key.

### Prices
All prices in the current data are **placeholders** — go through
`data/products.js` and update the `price` field for each product to your
real prices.

---

## 3. Languages

The site supports **English, German, and Persian (Farsi)**, switchable from
the flag menu in the top navigation. Persian automatically switches the
whole layout to right-to-left (RTL).

- All UI text (buttons, labels, messages) lives in `js/i18n.js`.
- All product text lives in `data/products.js` (the `name`/`description`/
  `longDescription` objects with `en`/`de`/`fa` keys).
- The selected language is remembered (saved in the browser) so returning
  visitors see the same language.

To change any UI wording, search for the relevant key (e.g. `"hero_shop_now"`)
in `js/i18n.js` — it appears once per language (`en`, `de`, `fa`).

---

## 4. Shopping cart & checkout

- The cart is stored in the browser (`localStorage`), so it persists between
  visits on the same device/browser but is not shared across devices.
- Customers can add items from product cards, the quick-view popup, or the
  product detail page; adjust quantities and remove items on `cart.html`;
  and proceed to `checkout.html`.
- **`checkout.html` is a UI/UX demo.** It validates the form and shows an
  order confirmation with a generated order number, but **no real payment is
  processed** and no order is actually transmitted anywhere. To accept real
  orders/payments you will need to connect a backend and a payment provider
  such as Stripe or PayPal. This is documented in a comment at the top of
  `js/checkout.js`.
- Similarly, **`Contact.html`'s form** does not send emails yet — it's a
  demo. To receive messages, connect it to a backend or a form service
  (e.g. Formspree, Netlify Forms) — see the comment at the top of
  `js/contact.js`.

---

## 5. Testing the site locally

1. Open `index.html` by double-clicking it (it will open in your default
   browser).
2. Click through: Home → Shop → a product → Cart → Checkout.
3. Try the search and category filters on the Shop page.
4. Try the language switcher (flag icon, top right) and confirm Persian
   switches the layout to right-to-left.
5. Add a test product to `data/products.js`, save, and refresh the Shop
   page — it should appear immediately.
6. Resize the browser window (or open on a phone) to confirm the mobile
   menu, grids, and cart all adapt correctly.

---

## 6. Notes on legacy files

The old static HTML pages (`Mana2.html`, `Products.html`, `CologneStructure.html`,
`body-freshener.html`, `Air-productStructure.html`, `ProductPageStructure.html`,
`test*.html`, and the standalone `footer.html`) are no longer used by the new
site — the new pages (`index.html`, `shop.html`, `product.html`, etc.) replace
them entirely, with the header/footer now generated by `js/script.js`. These
old files can be safely deleted once you've confirmed the new site has
everything you need, or kept for reference.
