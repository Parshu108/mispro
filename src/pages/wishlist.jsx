import React, { useState, useMemo } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  X,
  Menu,
  Eye,
  Trash2,
  Minus,
  Plus,
  Truck,
  Headphones,
  RefreshCcw,
  ChevronDown,
  LayoutGrid,
  Grid2x2,
  Grid3x3,
} from "lucide-react";

/* ---------------------------------------------------------
   Design tokens (see inline comments) — Mishu, a bedding &
   sleep-goods label. Palette: linen background, deep ink,
   a quiet "sleep teal" accent, and a warm clay for sale/alerts.
   Display face: Fraunces (soft, rounded serif — cozy, tactile,
   like a duvet). Body: Inter, quiet workhorse for commerce UI.
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
`;

const CATEGORIES = [
  "Mattresses",
  "Pillows",
  "Bedding",
  "Toppers",
  "Bed Frames",
  "Accessories",
];

const seedImg = (seed) => `https://picsum.photos/seed/${seed}/600/750`;

const INITIAL_WISHLIST = [
  {
    id: "w1",
    name: "Ridley Cloud Pillow",
    sizes: ["Standard", "Queen", "King"],
    price: 36,
    salePrice: null,
    swatches: ["#e8e2d6", "#20343a"],
    img: seedImg("mishu-pillow-01"),
    badge: null,
  },
  {
    id: "w2",
    name: "Cream Linen Duvet Set",
    sizes: ["Twin", "Queen", "King"],
    price: 135,
    salePrice: null,
    swatches: ["#f1ece0"],
    img: seedImg("mishu-duvet-02"),
    badge: "New",
  },
  {
    id: "w3",
    name: "Charcoal Memory Topper",
    sizes: ["Queen", "King"],
    price: 160,
    salePrice: null,
    swatches: ["#2a2a2a"],
    img: seedImg("mishu-topper-03"),
    badge: null,
  },
  {
    id: "w4",
    name: "La Rosé Weighted Blanket",
    sizes: ["S", "M", "L"],
    price: 90,
    salePrice: 60,
    swatches: ["#c98a7d", "#20343a"],
    img: seedImg("mishu-blanket-04"),
    badge: "-25%",
  },
  {
    id: "w5",
    name: "Mercury Bamboo Sheet Set",
    sizes: ["S", "M"],
    price: 68,
    salePrice: null,
    swatches: ["#dcd6c8", "#8b8073"],
    img: seedImg("mishu-sheet-05"),
    badge: null,
  },
  {
    id: "w6",
    name: "Blush Knit Bed Runner",
    sizes: ["One Size"],
    price: 45,
    salePrice: null,
    swatches: ["#e3c9c2", "#c98a7d", "#20343a"],
    img: seedImg("mishu-runner-06"),
    badge: null,
  },
  {
    id: "w7",
    name: "Sea Salt Cooling Gel Pillow",
    sizes: ["XS", "S", "M"],
    price: 60,
    salePrice: 40,
    swatches: ["#6f9c92", "#20343a"],
    img: seedImg("mishu-gel-07"),
    badge: "-25%",
  },
  {
    id: "w8",
    name: "Short-Fill Hotel Comforter",
    sizes: [],
    price: 30,
    salePrice: null,
    swatches: [],
    img: seedImg("mishu-comforter-08"),
    badge: null,
  },
  {
    id: "w9",
    name: "Chill Sleep Candle",
    sizes: [],
    price: 16,
    salePrice: null,
    swatches: [],
    img: seedImg("mishu-candle-09"),
    badge: null,
  },
  {
    id: "w10",
    name: "Sport Recovery Sleep Mask",
    sizes: [],
    price: 35,
    salePrice: null,
    swatches: [],
    img: seedImg("mishu-mask-10"),
    badge: null,
  },
];

const INITIAL_CART = [
  {
    id: "c1",
    name: "La Rosé Weighted Blanket",
    variant: "Clay",
    price: 90,
    salePrice: 60,
    qty: 2,
    img: seedImg("mishu-blanket-04"),
  },
  {
    id: "c2",
    name: "Blush Knit Bed Runner",
    variant: "Grey / One Size",
    price: 15,
    salePrice: null,
    qty: 1,
    img: seedImg("mishu-runner-06"),
  },
  {
    id: "c3",
    name: "Ridley Cloud Pillow",
    variant: "Standard",
    price: 36,
    salePrice: null,
    qty: 1,
    img: seedImg("mishu-pillow-01"),
  },
];

const GRID_OPTIONS = [
  { key: 2, label: "Compact", icon: Grid3x3 },
  { key: 3, label: "Comfortable", icon: Grid2x2 },
  { key: 4, label: "Spacious", icon: LayoutGrid },
];

const FREE_SHIP_THRESHOLD = 100;

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function Price({ price, salePrice }) {
  if (salePrice != null) {
    return (
      <p className="mt-1 flex items-center gap-2 text-[13px]">
        <span className="text-stone-400 line-through">${price.toFixed(2)}</span>
        <span className="font-semibold text-[#B3502E]">
          ${salePrice.toFixed(2)}
        </span>
      </p>
    );
  }
  return <p className="mt-1 text-[13px] text-stone-500">${price.toFixed(2)}</p>;
}

function Swatches({ colors }) {
  if (!colors?.length) return null;
  return (
    <div className="mt-2 flex items-center gap-1.5">
      {colors.map((c, i) => (
        <span
          key={i}
          className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

/* ---------------- Product card ---------------- */
function WishlistCard({ item, onRemove, onQuickView, onAddToCart, dense }) {
  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-[6px] bg-stone-100">
        {item.badge && (
          <span
            className={classNames(
              "absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white",
              item.badge.startsWith("-") ? "bg-[#B3502E]" : "bg-[#20343a]",
            )}
          >
            {item.badge}
          </span>
        )}

        <button
          onClick={() => onRemove(item.id)}
          aria-label="Remove from wishlist"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-sm transition hover:bg-[#B3502E] hover:text-white"
        >
          <Trash2 size={14} />
        </button>

        <img
          src={item.img}
          alt={item.name}
          className={classNames(
            "w-full object-cover transition duration-500 group-hover:scale-105",
            dense ? "aspect-[4/5]" : "aspect-[3/4]",
          )}
        />

        {item.sizes?.length > 0 && (
          <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[11px] font-medium tracking-wide text-white opacity-0 transition group-hover:opacity-100">
            {item.sizes.join(" · ")}
          </p>
        )}

        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full flex-col gap-2 p-3 transition duration-300 group-hover:translate-y-0 md:flex">
          <button
            onClick={() => onQuickView(item)}
            className="flex items-center justify-center gap-2 rounded-full bg-white py-2 text-[12px] font-medium tracking-wide text-stone-800 shadow hover:bg-stone-900 hover:text-white"
          >
            Quick View <Eye size={14} />
          </button>
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#20343a] py-2 text-[12px] font-medium tracking-wide text-white shadow hover:bg-[#16262b]"
          >
            Add to Cart <ShoppingCart size={14} />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-serif text-[15px] leading-snug text-stone-900">
          {item.name}
        </h3>
        <Price price={item.price} salePrice={item.salePrice} />
        <Swatches colors={item.swatches} />
      </div>
    </div>
  );
}

/* ---------------- Cart line item ---------------- */
function CartLine({ item, onQty, onRemove }) {
  const unit = item.salePrice ?? item.price;
  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 border-b border-stone-200 py-4">
      <img
        src={item.img}
        alt={item.name}
        className="h-24 w-20 rounded-md object-cover"
      />
      <div>
        <h4 className="font-serif text-[15px] text-stone-900">{item.name}</h4>
        <p className="mt-0.5 text-[12px] text-stone-500">{item.variant}</p>
        <Price price={item.price} salePrice={item.salePrice} />

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-stone-300">
            <button
              onClick={() => onQty(item.id, Math.max(1, item.qty - 1))}
              className="flex h-7 w-7 items-center justify-center text-stone-600 hover:text-stone-900"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-[13px] tabular-nums">
              {item.qty}
            </span>
            <button
              onClick={() => onQty(item.id, item.qty + 1)}
              className="flex h-7 w-7 items-center justify-center text-stone-600 hover:text-stone-900"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[12px] text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-[#B3502E]"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="col-span-2 -mt-2 text-right text-[12px] text-stone-400">
        subtotal ${(unit * item.qty).toFixed(2)}
      </div>
    </div>
  );
}

/* ---------------- Accordion (footer, mobile) ---------------- */
function FooterAccordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200 py-4 md:border-none md:py-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left md:pointer-events-none"
      >
        <h5 className="font-serif text-[15px] text-stone-900">{title}</h5>
        <ChevronDown
          size={16}
          className={classNames(
            "text-stone-500 transition-transform md:hidden",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={classNames(
          open ? "mt-3 block" : "hidden",
          "md:mt-4 md:block",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- Main page ---------------- */
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [cart, setCart] = useState(INITIAL_CART);
  const [gridDensity, setGridDensity] = useState(3);
  const [page, setPage] = useState(1);

  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = useMemo(
    () => cart.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.qty, 0),
    [cart],
  );
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  const flash = (msg) => {
    setToast(msg);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setToast(null), 2200);
  };

  const removeFromWishlist = (id) => {
    const item = wishlist.find((w) => w.id === id);
    setWishlist((w) => w.filter((x) => x.id !== id));
    if (item) flash(`Removed "${item.name}" from wishlist`);
  };

  const addToCart = (item) => {
    setCart((c) => {
      const existing = c.find((x) => x.name === item.name);
      if (existing) {
        return c.map((x) =>
          x.id === existing.id ? { ...x, qty: x.qty + 1 } : x,
        );
      }
      return [
        ...c,
        {
          id: `c-${item.id}-${Date.now()}`,
          name: item.name,
          variant: item.sizes?.[0] || "Default",
          price: item.price,
          salePrice: item.salePrice,
          qty: 1,
          img: item.img,
        },
      ];
    });
    flash(`Added "${item.name}" to cart`);
    setCartOpen(true);
  };

  const updateQty = (id, qty) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    flash("You're on the list — 10% off code is on its way.");
    setEmail("");
  };

  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  }[gridDensity];

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-sans text-stone-900 antialiased">
      <style>{FONT_IMPORT}</style>
      <style>{`
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      {/* ---------------- Top bar ---------------- */}
      {/* <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#F6F3ED]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <button
            className="text-stone-800 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <a href="#!" className="flex items-center gap-2">
            <span className="font-serif text-[22px] font-medium tracking-tight text-stone-900">
              Mishu
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.25em] text-stone-500 sm:inline">
              Sleep Co.
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href="#!"
                className="text-[13px] font-medium tracking-wide text-stone-700 transition hover:text-[#20343a]"
              >
                {c}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-stone-800">
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={19} />
            </button>
            <button
              aria-label="Account"
              onClick={() => setAccountOpen(true)}
              className="hidden md:block"
            >
              <User size={19} />
            </button>
            <a
              href="#!"
              className="relative hidden md:block"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[9px] text-white">
                {wishlist.length}
              </span>
            </a>
            <button
              aria-label="Cart"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={19} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B3502E] text-[9px] text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header> */}

      {/* ---------------- Banner ---------------- */}
      <div className="relative overflow-hidden bg-[#20343a] py-16 text-center text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${seedImg("mishu-banner-hero")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
            Saved for later
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">
            Your Wishlist
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[13px] text-white/70">
            Everything you've tucked away for a better night's sleep.
          </p>
        </div>
      </div>

      {/* ---------------- Toolbar ---------------- */}
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-2 pt-8 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="text-[13px] text-stone-500">
          {wishlist.length} item{wishlist.length !== 1 && "s"} saved
        </p>
        <div className="flex items-center gap-1 self-end rounded-full border border-stone-300 bg-white p-1">
          {GRID_OPTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setGridDensity(key)}
              title={label}
              aria-label={label}
              className={classNames(
                "flex h-8 w-8 items-center justify-center rounded-full transition",
                gridDensity === key
                  ? "bg-[#20343a] text-white"
                  : "text-stone-500 hover:bg-stone-100",
              )}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Grid ---------------- */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 py-24 text-center">
            <Heart className="text-stone-300" size={40} />
            <p className="mt-4 font-serif text-lg text-stone-700">
              Your wishlist is empty
            </p>
            <p className="mt-1 text-[13px] text-stone-500">
              Items you save will show up here.
            </p>
          </div>
        ) : (
          <div className={classNames("grid gap-x-5 gap-y-8", gridColsClass)}>
            {wishlist.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                dense={gridDensity === 4}
                onRemove={removeFromWishlist}
                onQuickView={setQuickView}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {wishlist.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={classNames(
                  "flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition",
                  page === p
                    ? "bg-[#20343a] text-white"
                    : "text-stone-600 hover:bg-stone-200",
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => p + 1)}
              className="ml-1 rounded-full px-4 py-2 text-[12px] font-medium tracking-wide text-stone-600 hover:bg-stone-200"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* ---------------- Perks strip ---------------- */}
      <div className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 md:px-8">
          {[
            {
              icon: Truck,
              title: "Free shipping",
              copy: "On every U.S. order, no minimum.",
            },
            {
              icon: Headphones,
              title: "Support 24/7",
              copy: "Real humans, day or night.",
            },
            {
              icon: RefreshCcw,
              title: "100-night trial",
              copy: "Sleep on it, then decide.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="mt-0.5 text-[#20343a]" size={22} />
              <div>
                <h6 className="text-[13px] font-semibold tracking-wide text-stone-900">
                  {title}
                </h6>
                <p className="text-[12px] text-stone-500">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Footer ---------------- */}
      {/* <footer className="bg-[#F1EDE4]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="grid grid-cols-1 gap-x-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <span className="font-serif text-xl text-stone-900">
                Mishu Sleep Co.
              </span>
              <p className="mt-4 text-[13px] leading-relaxed text-stone-500">
                Plot no. 911, Alang Road, Opposite Pooja Weigh Bridge, Trapaj,
                <br /> Bhavnagar, Gujarat 364150
              </p>
              <p className="mt-2 text-[13px] text-stone-500">
                info@mishumattress.com
              </p>
              <p className="text-[13px] text-stone-500">+91 63521 09065</p>
            </div>

            <FooterAccordion title="Help">
              <ul className="space-y-2 text-[13px] text-stone-500">
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Returns &amp; Exchanges
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    FAQs
                  </a>
                </li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Company">
              <ul className="space-y-2 text-[13px] text-stone-500">
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Store Locator
                  </a>
                </li>
                <li>
                  <a href="#!" className="hover:text-stone-900">
                    Contact
                  </a>
                </li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Newsletter" defaultOpen>
              <p className="mb-3 text-[13px] text-stone-500">
                Get 10% off your first order.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-[13px] outline-none focus:border-[#20343a]"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-[#20343a] px-4 py-2 text-[12px] font-medium text-white hover:bg-[#16262b]"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-[12px] text-[#3C6E58]">
                  Thanks — check your inbox.
                </p>
              )}
            </FooterAccordion>
          </div>
        </div>

        <div className="border-t border-stone-300/70">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[12px] text-stone-500 sm:flex-row md:px-8">
            <p>
              © {new Date().getFullYear()} Mishu Sleep Co. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#!" className="hover:text-stone-900">
                Shop
              </a>
              <a href="#!" className="hover:text-stone-900">
                About
              </a>
              <a href="#!" className="hover:text-stone-900">
                Contact
              </a>
              <a href="#!" className="hover:text-stone-900">
                Blog
              </a>
            </div>
          </div>
        </div>
      </footer> */}

      {/* ---------------- Mobile bottom nav ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-stone-200 bg-white py-2 lg:hidden">
        {[
          { icon: Menu, label: "Shop", onClick: () => setMenuOpen(true) },
          {
            icon: Heart,
            label: "Wishlist",
            onClick: () => {},
            badge: wishlist.length,
          },
          {
            icon: ShoppingCart,
            label: "Cart",
            onClick: () => setCartOpen(true),
            badge: cartCount,
          },
          { icon: User, label: "Account", onClick: () => setAccountOpen(true) },
          { icon: Search, label: "Search", onClick: () => setSearchOpen(true) },
        ].map(({ icon: Icon, label, onClick, badge }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-1 text-stone-700"
          >
            <span className="relative">
              <Icon size={19} />
              {!!badge && (
                <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#B3502E] text-[8px] text-white">
                  {badge}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* ================= Overlays ================= */}

      {/* Backdrop */}
      {(cartOpen || accountOpen || menuOpen || searchOpen || quickView) && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-[1px]"
          onClick={() => {
            setCartOpen(false);
            setAccountOpen(false);
            setMenuOpen(false);
            setSearchOpen(false);
            setQuickView(null);
          }}
        />
      )}

      {/* Cart drawer */}
      <aside
        className={classNames(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm transform flex-col bg-white shadow-2xl transition-transform duration-300",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h5 className="font-serif text-[16px] uppercase tracking-wide">
            Shopping Cart
          </h5>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {remainingForFreeShip > 0 ? (
          <div className="border-b border-stone-200 bg-[#F6F3ED] px-5 py-3 text-[13px]">
            Add{" "}
            <span className="font-semibold text-[#B3502E]">
              ${remainingForFreeShip.toFixed(2)}
            </span>{" "}
            more for <span className="font-semibold">free shipping</span>
          </div>
        ) : (
          <div className="border-b border-stone-200 bg-[#3C6E58]/10 px-5 py-3 text-[13px] text-[#3C6E58]">
            You've unlocked free shipping 🎉
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5">
          {cart.length === 0 ? (
            <p className="py-12 text-center text-[13px] text-stone-500">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <CartLine
                key={item.id}
                item={item}
                onQty={updateQty}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-serif text-[16px]">Subtotal</span>
              <span className="font-serif text-[16px]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="mb-3 text-[12px] text-stone-500">
              Taxes and shipping calculated at checkout.
            </p>
            <div className="flex flex-col gap-2">
              <button className="rounded-full border border-stone-800 py-2.5 text-[12px] font-semibold uppercase tracking-widest hover:bg-stone-100">
                View Cart
              </button>
              <button className="rounded-full bg-[#20343a] py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-[#16262b]">
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Account drawer */}
      <aside
        className={classNames(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm transform flex-col bg-white shadow-2xl transition-transform duration-300",
          accountOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h5 className="font-serif text-[16px] uppercase tracking-wide">
            Sign In
          </h5>
          <button
            onClick={() => setAccountOpen(false)}
            aria-label="Close account panel"
          >
            <X size={20} />
          </button>
        </div>
        <form
          className="flex flex-col gap-4 px-5 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            flash("Signed in (demo only)");
            setAccountOpen(false);
          }}
        >
          <div>
            <label className="mb-1 block text-[12px] font-medium text-stone-700">
              Email <span className="text-[#B3502E]">*</span>
            </label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-[13px] outline-none focus:border-[#20343a]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-medium text-stone-700">
              Password <span className="text-[#B3502E]">*</span>
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-[13px] outline-none focus:border-[#20343a]"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#20343a] py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-[#16262b]"
          >
            Sign In
          </button>
          <p className="text-[12px] text-stone-500">
            New here?{" "}
            <a href="#!" className="text-stone-900 underline">
              Create an account
            </a>
          </p>
        </form>
      </aside>

      {/* Mobile menu drawer */}
      <aside
        className={classNames(
          "fixed left-0 top-0 z-50 flex h-full w-full max-w-xs transform flex-col bg-white shadow-2xl transition-transform duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <span className="font-serif text-[16px]">Menu</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col divide-y divide-stone-100 overflow-y-auto">
          {CATEGORIES.map((c) => (
            <a
              key={c}
              href="#!"
              className="px-5 py-4 text-[14px] text-stone-800 hover:bg-stone-50"
            >
              {c}
            </a>
          ))}
          <a
            href="#!"
            className="px-5 py-4 text-[14px] text-stone-800 hover:bg-stone-50"
          >
            Sleep Advice
          </a>
          <a
            href="#!"
            className="px-5 py-4 text-[14px] text-stone-800 hover:bg-stone-50"
          >
            Find a Showroom
          </a>
          <a
            href="#!"
            className="px-5 py-4 text-[14px] text-stone-800 hover:bg-stone-50"
          >
            Blog
          </a>
        </nav>
      </aside>

      {/* Search overlay */}
      <div
        className={classNames(
          "fixed left-0 right-0 top-0 z-50 origin-top transform bg-white shadow-xl transition-all duration-300",
          searchOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-6">
          <Search size={20} className="text-stone-400" />
          <input
            autoFocus={searchOpen}
            type="text"
            placeholder="Search for mattresses, pillows, bedding…"
            className="w-full border-none text-[16px] outline-none placeholder:text-stone-400"
          />
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Quick view modal */}
      {quickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative grid w-full max-w-2xl grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-2xl sm:grid-cols-2">
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-4 top-4 text-stone-500 hover:text-stone-900"
              aria-label="Close quick view"
            >
              <X size={20} />
            </button>
            <img
              src={quickView.img}
              alt={quickView.name}
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-stone-900">
                {quickView.name}
              </h3>
              <Price price={quickView.price} salePrice={quickView.salePrice} />
              <Swatches colors={quickView.swatches} />
              {quickView.sizes?.length > 0 && (
                <p className="mt-3 text-[13px] text-stone-500">
                  Sizes: {quickView.sizes.join(", ")}
                </p>
              )}
              <button
                onClick={() => {
                  addToCart(quickView);
                  setQuickView(null);
                }}
                className="mt-6 rounded-full bg-[#20343a] py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-[#16262b]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        className={classNames(
          "fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-stone-900 px-5 py-2.5 text-[12px] text-white shadow-lg transition-all duration-300 lg:bottom-6",
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {toast}
      </div>
    </div>
  );
}
