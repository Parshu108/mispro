import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtocards } from "../cartslice";
import { FaRupeeSign, FaShoppingCart, FaEye } from "react-icons/fa";

/* ---------------------------------------------------------
   Same design tokens as the Wishlist page — Mishu, a bedding
   & sleep-goods label. Linen background, deep ink, a quiet
   "sleep teal" accent, warm clay for price/sale emphasis.
   Display face: Fraunces. Body: Inter.
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
`;

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const Shop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      setLoading(true);
      const api = "http://localhost:3000/product2";
      const response = await axios.get(api);
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const product = (id) => {
    navigate(`/Productdisplays/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED] pb-16 font-sans text-stone-900 antialiased">
      <style>{FONT_IMPORT}</style>
      <style>{`
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      {/* Banner */}
      <div className="relative overflow-hidden bg-[#20343a] py-16 text-center text-white">
        <div className="relative">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            Mishu Collections
          </span>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl">
            Explore Premium Mattresses
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-[13px] text-white/70">
            Discover engineered orthocare, memory foam, and cooling hybrid
            mattresses tailored for your best night's rest.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="p-16 text-center text-stone-500">
            <div className="mb-3 inline-block h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-[#20343a]"></div>
            <p className="text-sm font-semibold">Loading mattress catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <div key={item.id} className="group flex flex-col">
                {/* Image & Quick View */}
                <div
                  className="relative cursor-pointer overflow-hidden rounded-[6px] bg-stone-100"
                  onClick={() => product(item.id)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300";
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[#20343a]/0 transition group-hover:bg-[#20343a]/20" />

                  <div className="absolute inset-x-0 bottom-0 hidden translate-y-full flex-col gap-2 p-3 transition duration-300 group-hover:translate-y-0 md:flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        product(item.id);
                      }}
                      className="flex items-center justify-center gap-2 rounded-full bg-white py-2 text-[12px] font-medium tracking-wide text-stone-800 shadow hover:bg-stone-900 "
                    >
                      View Mattress <FaEye size={13} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#20343a]/70">
                      Ortho Comfort
                    </span>
                    <h3 className="mt-1 line-clamp-1 font-serif text-[16px] leading-snug text-stone-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 flex items-center text-[15px] font-semibold text-[#B3502E]">
                      <FaRupeeSign className="text-[13px]" />
                      {(Number(item.prize) || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(
                        addtocards({
                          id: item.id,
                          name: item.name,
                          img: item.img,
                          prize: item.prize,
                        }),
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[12px] font-medium uppercase tracking-widest bg-[#00ADB5] hover:bg-[#009299] text-[#222831] transition hover:shadow-md"
                  >
                    Add to Cart <FaShoppingCart size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
