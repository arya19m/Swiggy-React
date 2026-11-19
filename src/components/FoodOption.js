import { imageGridCards } from "../utils/FoodData";
import Foodcard from "./FoodCard";

export default function FoodOption() {
  return <section className="pt-12 sm:pt-16"><div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#fc5b20]">Find your craving</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">What's on your mind?</h2></div><span className="hidden text-sm text-slate-400 sm:block">A little something for every mood</span></div><div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">{imageGridCards.map(foodData=><Foodcard key={foodData.id} foodData={foodData}/>)}</div></section>;
}
