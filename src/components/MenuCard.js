import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import RestInfo from "./RestInfo";

export default function MenuCard({ menuItems }) {
  const [isOpen, setIsOpen] = useState(true);
  if ("categories" in menuItems) return <section className="mb-5 rounded-2xl border border-slate-100 bg-white p-4 sm:p-6"><h2 className="text-lg font-black text-slate-900">{menuItems.title}</h2><div className="mt-2">{menuItems.categories.map(items=><MenuCard key={items?.title} menuItems={items}/>)}</div></section>;
  return <section className="mb-4 overflow-hidden rounded-2xl border border-slate-100 bg-white"><button onClick={()=>setIsOpen(!isOpen)} className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-6"><span className="text-base font-black text-slate-900 sm:text-lg">{menuItems?.title} <span className="ml-1 text-sm font-medium text-slate-400">({menuItems?.itemCards?.length || 0})</span></span>{isOpen ? <ChevronUp className="text-slate-500"/> : <ChevronDown className="text-slate-500"/>}</button>{isOpen && <div className="px-4 pb-3 sm:px-6">{menuItems?.itemCards?.map(item=><RestInfo key={item?.card?.info?.id} restData={item?.card?.info}/>)}</div>}</section>;
}
