import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Copy,
  Check,
  LocateFixed,
  X,
  ChevronRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Showroom Locator — Mishu Sleep Co.
   Same token system as the wishlist page: linen background,
   deep teal ink, clay accent, Fraunces + Inter type pairing.
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
`;

const REGIONS = ["All", "West", "North", "South", "East"];

const SHOWROOMS = [
  {
    id: "s1",
    name: "Mishu Flagship — Bhavnagar",
    region: "West",
    state: "Gujarat",
    address:
      "Plot No. 911, Alang Road, Opp. Pooja Weigh Bridge, Trapaj, Bhavnagar 364150",
    phone: "+91 63521 09065",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM",
    lat: 21.7645,
    lng: 72.1519,
    img: "https://picsum.photos/seed/mishu-showroom-bhavnagar/700/500",
  },
  {
    id: "s2",
    name: "Mishu Studio — Ahmedabad",
    region: "West",
    state: "Gujarat",
    address: "2nd Floor, SG Highway, Bodakdev, Ahmedabad 380054",
    phone: "+91 79 4011 2244",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM",
    lat: 23.0225,
    lng: 72.5714,
    img: "https://picsum.photos/seed/mishu-showroom-ahmedabad/700/500",
  },
  {
    id: "s3",
    name: "Mishu Sleep Lab — Mumbai",
    region: "West",
    state: "Maharashtra",
    address: "Ground Floor, Linking Road, Bandra West, Mumbai 400050",
    phone: "+91 22 6612 8890",
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    lat: 19.076,
    lng: 72.8777,
    img: "https://picsum.photos/seed/mishu-showroom-mumbai/700/500",
  },
  {
    id: "s4",
    name: "Mishu Studio — Pune",
    region: "West",
    state: "Maharashtra",
    address: "Koregaon Park Annexe, Pune 411001",
    phone: "+91 20 4123 5567",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM",
    lat: 18.5204,
    lng: 73.8567,
    img: "https://picsum.photos/seed/mishu-showroom-pune/700/500",
  },
  {
    id: "s5",
    name: "Mishu Sleep Lab — Delhi",
    region: "North",
    state: "Delhi",
    address: "DLF Promenade, Vasant Kunj, New Delhi 110070",
    phone: "+91 11 4900 3321",
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    lat: 28.6139,
    lng: 77.209,
    img: "https://picsum.photos/seed/mishu-showroom-delhi/700/500",
  },
  {
    id: "s6",
    name: "Mishu Studio — Jaipur",
    region: "North",
    state: "Rajasthan",
    address: "C-Scheme, Ashok Marg, Jaipur 302001",
    phone: "+91 141 456 7812",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM",
    lat: 26.9124,
    lng: 75.7873,
    img: "https://picsum.photos/seed/mishu-showroom-jaipur/700/500",
  },
  {
    id: "s7",
    name: "Mishu Sleep Lab — Bengaluru",
    region: "South",
    state: "Karnataka",
    address: "Indiranagar 100 Ft Road, Bengaluru 560038",
    phone: "+91 80 4155 9987",
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    lat: 12.9716,
    lng: 77.5946,
    img: "https://picsum.photos/seed/mishu-showroom-bengaluru/700/500",
  },
  {
    id: "s8",
    name: "Mishu Studio — Kolkata",
    region: "East",
    state: "West Bengal",
    address: "Park Street, Kolkata 700016",
    phone: "+91 33 2229 4456",
    hours: "Mon–Sat: 10:00 AM – 8:00 PM · Sun: 11:00 AM – 6:00 PM",
    lat: 22.5726,
    lng: 88.3639,
    img: "https://picsum.photos/seed/mishu-showroom-kolkata/700/500",
  },
];

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// Haversine distance in km
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function mapsEmbedSrc(showroom) {
  const q = encodeURIComponent(`${showroom.name}, ${showroom.address}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

function mapsDirectionsUrl(showroom) {
  const q = encodeURIComponent(`${showroom.name}, ${showroom.address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

function ShowroomCard({ showroom, active, distance, onSelect }) {
  return (
    <button
      onClick={() => onSelect(showroom)}
      className={classNames(
        "w-full rounded-xl border px-4 py-4 text-left transition",
        active
          ? "border-[#20343a] bg-[#20343a] text-white shadow-md"
          : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className={classNames(
              "font-serif text-[15px]",
              active ? "text-white" : "text-stone-900",
            )}
          >
            {showroom.name}
          </h3>
          <p
            className={classNames(
              "mt-1 text-[12px]",
              active ? "text-white/70" : "text-stone-500",
            )}
          >
            {showroom.state}
          </p>
        </div>
        {distance != null && (
          <span
            className={classNames(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide",
              active ? "bg-white/15 text-white" : "bg-[#F6F3ED] text-[#20343a]",
            )}
          >
            {distance < 1 ? "<1 km" : `${distance.toFixed(0)} km`}
          </span>
        )}
      </div>
      <p
        className={classNames(
          "mt-3 flex items-start gap-2 text-[12px] leading-relaxed",
          active ? "text-white/80" : "text-stone-500",
        )}
      >
        <MapPin size={13} className="mt-0.5 shrink-0" />
        {showroom.address}
      </p>
      <div
        className={classNames(
          "mt-3 flex items-center gap-1 text-[12px] font-medium",
          active ? "text-white" : "text-[#20343a]",
        )}
      >
        View details <ChevronRight size={13} />
      </div>
    </button>
  );
}

export default function ShowroomLocator() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selectedId, setSelectedId] = useState(SHOWROOMS[0].id);
  const [userCoords, setUserCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    let list = SHOWROOMS.filter((s) => {
      const matchesRegion = region === "All" || s.region === region;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });

    if (userCoords) {
      list = list
        .map((s) => ({
          ...s,
          _dist: distanceKm(userCoords.lat, userCoords.lng, s.lat, s.lng),
        }))
        .sort((a, b) => a._dist - b._dist);
    }
    return list;
  }, [query, region, userCoords]);

  const selected = useMemo(
    () =>
      SHOWROOMS.find((s) => s.id === selectedId) || filtered[0] || SHOWROOMS[0],
    [selectedId, filtered],
  );

  const selectedDistance =
    userCoords && selected
      ? distanceKm(userCoords.lat, userCoords.lng, selected.lat, selected.lng)
      : null;

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocateError("Geolocation isn't supported by this browser.");
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocateError(
          "Couldn't get your location. Check permissions and try again.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${selected.name} — ${selected.address}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED] font-sans text-stone-900 antialiased">
      <style>{FONT_IMPORT}</style>
      <style>{`
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-serif { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      {/* Header */}
      <div className="border-b border-stone-200 bg-[#20343a] py-14 text-center text-white">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
          Come lie down
        </p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl">
          Find a Showroom
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] text-white/70">
          Try before you buy at one of our {SHOWROOMS.length} studios across
          India.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, state, or name"
              className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-9 text-[13px] outline-none focus:border-[#20343a]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-white p-1">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={classNames(
                    "rounded-full px-3 py-1.5 text-[12px] font-medium transition",
                    region === r
                      ? "bg-[#20343a] text-white"
                      : "text-stone-600 hover:bg-stone-100",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleLocate}
              disabled={locating}
              className="flex items-center gap-1.5 rounded-full bg-[#B3502E] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#9a4126] disabled:opacity-60"
            >
              <LocateFixed
                size={14}
                className={locating ? "animate-pulse" : ""}
              />
              {locating ? "Locating…" : "Use my location"}
            </button>
          </div>
        </div>

        {locateError && (
          <p className="mt-3 text-[12px] text-[#B3502E]">{locateError}</p>
        )}

        {/* Body: list + detail */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          {/* List */}
          <div className="flex max-h-[720px] flex-col gap-3 overflow-y-auto pr-1 lg:max-h-[640px]">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 py-16 text-center">
                <MapPin className="mx-auto text-stone-300" size={28} />
                <p className="mt-3 text-[13px] text-stone-500">
                  No showrooms match your search.
                </p>
              </div>
            ) : (
              filtered.map((s) => (
                <ShowroomCard
                  key={s.id}
                  showroom={s}
                  active={selected?.id === s.id}
                  distance={s._dist}
                  onSelect={(sr) => setSelectedId(sr.id)}
                />
              ))
            )}
          </div>

          {/* Detail panel */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="relative">
              <img
                src={selected.img}
                alt={selected.name}
                className="h-52 w-full object-cover sm:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h2 className="font-serif text-xl sm:text-2xl">
                  {selected.name}
                </h2>
                {selectedDistance != null && (
                  <p className="mt-1 text-[12px] text-white/80">
                    {selectedDistance < 1
                      ? "Less than 1 km away"
                      : `${selectedDistance.toFixed(1)} km away`}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#20343a]"
                  />
                  <div>
                    <p className="text-[13px] text-stone-700">
                      {selected.address}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-[#20343a] hover:underline"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied" : "Copy address"}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-[#20343a]" />
                  <a
                    href={`tel:${selected.phone.replace(/\s/g, "")}`}
                    className="text-[13px] text-stone-700 hover:text-[#20343a]"
                  >
                    {selected.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-[#20343a]" />
                  <p className="text-[13px] text-stone-700">{selected.hours}</p>
                </div>

                <a
                  href={mapsDirectionsUrl(selected)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#20343a] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-widest text-white hover:bg-[#16262b]"
                >
                  <Navigation size={13} />
                  Get Directions
                </a>
              </div>

              <div className="overflow-hidden rounded-xl border border-stone-200">
                <iframe
                  title={`Map for ${selected.name}`}
                  src={mapsEmbedSrc(selected)}
                  className="h-56 w-full sm:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
