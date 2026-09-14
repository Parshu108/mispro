import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { removefromwishlist } from "../wishlistslice";
import { addtocards } from "../cartslice";

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

// Price for real catalog items — uses your app's ₹ "prize" field.
function Price({ prize }) {
  return (
    <p className="mt-1 text-[13px] font-semibold text-[#B3502E]">
      ₹{(Number(prize) || 0).toLocaleString("en-IN")}
    </p>
  );
}

// Price for the demo cart drawer, which still uses $ price/salePrice.
function CartPrice({ price, salePrice }) {
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

/* ---------------- Product card ---------------- */
function WishlistCard({ item, onRemove, onQuickView, onAddToCart, dense }) {
  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-[6px] bg-stone-100">
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
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400";
          }}
          className={classNames(
            "w-full object-cover transition duration-500 group-hover:scale-105",
            dense ? "aspect-[4/5]" : "aspect-[3/4]",
          )}
        />

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
        <Price prize={item.prize} />
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
        <CartPrice price={item.price} salePrice={item.salePrice} />

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
  const dispatch = useDispatch();

  // Real wishlist, populated by the heart icon on the product page.
  const wishlist = useSelector((state) => state.mywishlist.wishlist);

  // Demo cart drawer UI kept as-is (visual only) — real "Add to Cart"
  // clicks below also dispatch to the actual app cart via addtocards.
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
    dispatch(removefromwishlist({ id }));
    if (item) flash(`Removed "${item.name}" from wishlist`);
  };

  const addToCart = (item) => {
    // Real app cart
    dispatch(
      addtocards({
        id: item.id,
        name: item.name,
        img: item.img,
        prize: item.prize,
      }),
    );

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
              Tap the heart icon on any product to save it here.
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
              copy: "On every order, no minimum.",
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
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400";
              }}
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-stone-900">
                {quickView.name}
              </h3>
              <Price prize={quickView.prize} />
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
