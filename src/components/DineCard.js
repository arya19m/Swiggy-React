import { Star } from "lucide-react";

export default function DineCard({ RestData }) {
  const info = RestData?.info || {};
  const image = info?.mediaFiles?.[0]?.url;
  return <a target="_blank" rel="noreferrer" href={RestData?.cta?.link || "https://www.swiggy.com/dineout"} className="group w-64 flex-none overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-80"><div className="relative"><img className="aspect-[1.65/1] w-full object-cover transition duration-500 group-hover:scale-105" src={image ? `https://media-assets.swiggy.com/swiggy/image/upload/${image}` : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700"} alt={info?.name || "Restaurant"} loading="lazy"/><div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"/><p className="absolute bottom-3 left-4 right-4 truncate text-lg font-extrabold text-white">{info?.name}</p></div><div className="flex items-center justify-between px-4 py-3"><span className="text-sm text-slate-500">Explore dining</span><span className="flex items-center gap-1 text-sm font-bold text-slate-800"><Star size={15} className="fill-amber-400 text-amber-400"/>{info?.rating?.value || "New"}</span></div></a>;
}
