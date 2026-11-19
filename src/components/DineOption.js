import { dineoutRestaurants } from "../utils/DineData";
import DineCard from "./DineCard";

export default function DineOption() {
  return <section className="mt-14 sm:mt-20"><div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#fc5b20]">Make a night of it</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Discover restaurants for every occasion</h2><p className="mt-2 text-sm text-slate-500">Great tables, good company, unforgettable bites.</p></div><div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">{dineoutRestaurants.map(restData=><DineCard key={restData?.info?.id} RestData={restData}/>)}</div></section>;
}
