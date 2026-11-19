import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Search, MapPin, SlidersHorizontal } from "lucide-react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

export default function Restaurant() {
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to load restaurants");
        const data = await response.json();
        const cards = data?.data?.cards || [];
        const restaurants = cards.flatMap(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
        if (active) setRestData(restaurants);
      } catch (err) {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchData();
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => restData.filter(item => `${item?.info?.name || ""} ${(item?.info?.cuisines || []).join(" ")}`.toLowerCase().includes(query.toLowerCase())), [restData, query]);
  return <main className="min-h-screen bg-[#fafafa]"><div className="border-b border-slate-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-[#fc5b20]"><ArrowLeft size={18}/> Home</Link><span className="text-xl font-black tracking-tight text-slate-900">swiggy<span className="text-[#fc5b20]">.</span></span><span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin size={14} className="text-[#fc5b20]"/> Delhi</span></div></div><section className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#fc5b20]">Made for your cravings</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Restaurants near you</h1><p className="mt-2 text-sm text-slate-500">Discover delicious food from the best places in Delhi.</p></div><div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:max-w-sm"><Search size={18} className="shrink-0 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search restaurants or cuisines" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"/><SlidersHorizontal size={17} className="text-slate-400"/></div></div><div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-4"><p className="text-sm font-bold text-slate-800">{loading ? "Finding great places…" : `${filtered.length} restaurants to explore`}</p><span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#e94d17]">Popular near Delhi</span></div>{loading ? <Shimmer/> : error ? <div className="mt-12 rounded-3xl border border-orange-100 bg-white p-8 text-center"><h2 className="text-xl font-extrabold text-slate-900">Restaurants couldn't be loaded</h2><p className="mt-2 text-sm text-slate-500">Swiggy's public endpoint may block browser requests. Please try again later.</p><button onClick={()=>window.location.reload()} className="mt-5 rounded-xl bg-[#fc5b20] px-5 py-3 text-sm font-bold text-white">Try again</button></div> : filtered.length ? <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(item=><RestCard key={item?.info?.id} restInfo={item}/>)}</div> : <p className="py-16 text-center text-slate-500">No restaurants match that search. Try another name or cuisine.</p>}</section></main>;
}
