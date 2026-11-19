import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import MenuCard from "./MenuCard";

export default function RestaurantMenu() {
  const { id } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const url = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to load menu");
        const data = await response.json();
        const cards = data?.data?.cards || [];
        const details = cards.find(card => card?.card?.card?.info)?.card?.card?.info;
        const grouped = cards.find(card => card?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
        const categories = grouped.filter(item => item?.card?.card?.title);
        if (active) { setRestaurant(details || null); setMenuData(categories); }
      } catch (err) { if (active) setError(true); }
      finally { if (active) setLoading(false); }
    }
    fetchData();
    return () => { active = false; };
  }, [id]);
  return <main className="min-h-screen bg-[#fafafa]"><div className="border-b border-slate-100 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"><Link to="/restaurant" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#fc5b20]"><ArrowLeft size={18}/> Restaurants</Link><Link to="/" className="text-xl font-black text-slate-900">swiggy<span className="text-[#fc5b20]">.</span></Link><span className="flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin size={14} className="text-[#fc5b20]"/> Delhi</span></div></div><div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-5"><div className="mb-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#fc5b20]">Restaurant menu</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{restaurant?.name || "Explore the menu"}</h1>{restaurant?.cuisines && <p className="mt-2 text-sm text-slate-500">{restaurant.cuisines.join(" · ")}</p>}</div>{loading ? <div className="space-y-4">{[1,2,3,4].map(i=><div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200"/>)}</div> : error ? <div className="rounded-3xl border border-orange-100 bg-white p-8 text-center"><h2 className="text-xl font-extrabold text-slate-900">Menu unavailable right now</h2><p className="mt-2 text-sm text-slate-500">Swiggy's menu service may block browser requests. Please try again later.</p><button onClick={()=>window.location.reload()} className="mt-5 rounded-xl bg-[#fc5b20] px-5 py-3 text-sm font-bold text-white">Try again</button></div> : menuData.length ? <><div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400"><Search size={17}/> Browse delicious picks and bestsellers</div>{menuData.map(item=><MenuCard key={item?.card?.card?.title} menuItems={item?.card?.card}/>)}</> : <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No menu categories were returned for this restaurant.</p>}</div></main>;
}
