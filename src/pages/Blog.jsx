import React from "react";

const sliderPosts = [
  {
    id: 1,
    img: "public/images/blog-page/blog-slide-01.jpg",
    author: "admin",
    categories: ["Beauty", "Fashion"],
    title: "Spring – Summer Trending 2020",
    date: "April 6, 2020",
    link: "#",
  },
  {
    id: 2,
    img: "public/images/blog-page/blog-slide-02.jpg",
    author: "admin",
    categories: ["Life Style", "Travel"],
    title: "The Easiest Way to Break Out on Top",
    date: "April 6, 2020",
    link: "#",
  },
  {
    id: 3,
    img: "public/images/blog-page/blog-slide-03.jpg",
    author: "admin",
    categories: ["Fashion", "Travel"],
    title: "Style for couple in Weeding season",
    date: "April 6, 2020",
    link: "#",
  },
  {
    id: 4,
    img: "public/images/blog-page/blog-slide-04.jpg",
    author: "admin",
    categories: ["Food", "Life Style"],
    title: "Cool Spring Street Style Looks",
    date: "April 6, 2020",
    link: "#",
  },
  {
    id: 5,
    img: "public/images/blog-page/blog-slide-05.jpg",
    author: "admin",
    categories: ["Fashion", "Life Style", "Travel"],
    title: "Style Advice All Men Should Hear",
    date: "April 6, 2020",
    link: "#",
  },
  {
    id: 6,
    img: "public/images/blog-page/blog-slide-06.jpg",
    author: "admin",
    categories: ["Beauty", "Food"],
    title: "101 Beauty Tips Every Girl Should Know",
    date: "April 6, 2020",
    link: "#",
  },
];

const blogPosts = sliderPosts; // using same demo posts

const categoriesList = [
  { name: "Life Style", count: 10 },
  { name: "Electric", count: 7 },
  { name: "Electric", count: 6 },
];

const recentPosts = [
  {
    id: 1,
    img: "public/images/blog-page/blog-thumbnail-01.jpg",
    title: "Spring – Summer Trending 2020",
    date: "April 6, 2020",
  },
  {
    id: 2,
    img: "public/images/blog-page/blog-thumbnail-02.jpg",
    title: "The Easiest Way to Break Out on Top",
    date: "April 6, 2020",
  },
  {
    id: 3,
    img: "public/images/blog-page/blog-thumbnail-03.jpg",
    title: "Style for couple in Weeding season",
    date: "April 6, 2020",
  },
];

const instagramImages = [
  "public/images/instagram/ins1_1.jpg",
  "public/images/instagram/ins1_8.jpg",
  "public/images/instagram/ins1_4.jpg",
  "public/images/instagram/ins1_5.jpg",
  "public/images/instagram/ins1_6.jpg",
  "public/images/instagram/ins1_7.jpg",
  "public/images/instagram/ins1_8.jpg",
  "public/images/instagram/ins1_13.jpg",
  "public/images/instagram/ins1_14.jpg",
];

const saleProducts = [
  {
    id: 1,
    img: "public/images/blog-page/pr-thumbnail-01.jpg",
    title: "Analogue Resin Strap",
    price: "$30.00",
  },
  {
    id: 2,
    img: "public/images/blog-page/pr-thumbnail-02.jpg",
    title: "Ridley High Waist",
    price: "$36.00",
  },
  {
    id: 3,
    img: "public/images/blog-page/pr-thumbnail-03.jpg",
    title: "Blush Beanie",
    price: "$15.00",
  },
];

const blogTags = [
  { name: "Beauty", count: 3 },
  { name: "Fashion", count: 5 },
  { name: "Food", count: 3 },
  { name: "Life", count: 1 },
  { name: "Life Style", count: 5 },
  { name: "Travel", count: 5 },
];

export default function BlogPage() {
  return (
    <div id="nt_content" className="w-full">
      {/* ========================= */}
      {/* TOP SLIDER SECTION */}
      {/* ========================= */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <div className="flex min-w-full gap-4 px-4 py-4">
            {sliderPosts.map((post) => (
              <div
                key={post.id}
                className="relative h-[320px] min-w-[280px] flex-1 overflow-hidden rounded-xl sm:min-w-[360px] lg:min-w-[420px]"
              >
                <a href={post.link} className="block h-full w-full">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.img})` }}
                  />
                </a>

                {/* overlay card */}
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 px-4 py-4 text-center">
                  <div className="text-xs text-white/70">
                    <span>
                      By <span className="text-white">{post.author}</span>
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      In{" "}
                      {post.categories.map((cat, i) => (
                        <a
                          key={i}
                          href="#!"
                          className="text-white hover:underline"
                        >
                          {cat}
                          {i !== post.categories.length - 1 ? ", " : ""}
                        </a>
                      ))}
                    </span>
                  </div>

                  <h2 className="mt-2 text-sm font-semibold uppercase text-white">
                    <a href={post.link} className="hover:underline fs-lg">
                      {post.title}
                    </a>
                  </h2>

                  <time className="mt-1 block text-xs text-white/70">
                    {post.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT: BLOG GRID */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {blogPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.link}
                    className="group block overflow-hidden rounded-xl"
                  >
                    <div className="overflow-hidden rounded-xl">
                      <div
                        className="h-[400px] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.img})` }}
                      />
                    </div>

                    <div className="py-4">
                      <p className="text-sm text-gray-500">
                        By <span className="text-gray-900">{post.author}</span>{" "}
                        on <span className="text-gray-900">{post.date}</span>
                      </p>
                      <h6 className="mt-1 text-base font-semibold text-gray-900">
                        {post.title}
                      </h6>
                    </div>
                  </a>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="mt-6 flex justify-center">
                <ul className="flex items-center gap-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="font-semibold text-red-500 hover:underline"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      3
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:underline">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <aside className="lg:col-span-3 space-y-10">
              {/* BLOG CATEGORIES */}
              <div>
                <h5 className="text-lg font-medium text-gray-900">
                  Blog Categories
                </h5>
                <div className="mt-3 h-[2px] w-full bg-gray-200" />

                <ul className="mt-4 space-y-3">
                  {categoriesList.map((cat, i) => (
                    <li key={i}>
                      <a
                        href="#!"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
                      >
                        <span className="inline-block rotate-45 text-lg font-bold">
                          +
                        </span>
                        {cat.name} ({cat.count})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RECENT POSTS */}
              <div>
                <h5 className="text-lg font-medium text-gray-900">Recent Post</h5>
                <div className="mt-3 h-0.5 w-full bg-gray-200" />

                <div className="mt-4 space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <h6 className="text-sm font-medium text-gray-900">
                          {post.title}
                        </h6>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INSTAGRAM */}
              <div>
                <h5 className="text-lg font-medium text-gray-900">Instagram</h5>
                <div className="mt-3 h-[2px] w-full bg-gray-200" />

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {instagramImages.map((img, i) => (
                    <a
                      key={i}
                      href="#!"
                      className="group relative overflow-hidden rounded-md"
                    >
                      <img
                        src={img}
                        alt="Instagram"
                        className="h-20 w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <span className="text-white text-xl">⌁</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* SALE PRODUCTS */}
              <div>
                <h5 className="text-lg font-medium text-gray-900">
                  Sale Products
                </h5>
                <div className="mt-3 h-[2px] w-full bg-gray-200" />

                <div className="mt-4 space-y-4">
                  {saleProducts.map((p) => (
                    <div key={p.id} className="flex gap-3">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <h6 className="text-sm font-medium text-gray-900">
                          {p.title}
                        </h6>
                        <p className="text-xs text-gray-500">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLOG TAGS */}
              <div>
                <h5 className="text-lg font-medium text-gray-900">Blog Tags</h5>
                <div className="mt-3 h-[2px] w-full bg-gray-200" />

                <div className="mt-4 flex flex-wrap gap-2">
                  {blogTags.map((tag, i) => (
                    <button
                      key={i}
                      className="rounded-full border border-gray-900 px-3 py-1 text-xs font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition"
                    >
                      {tag.name} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
