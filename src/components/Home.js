import Header from "./Header";
import FoodOption from "./FoodOption";
import GroceryOption from "./GroceryOption";
import DineOption from "./DineOption";

export default function Home() {
  return <main className="min-h-screen bg-white"><Header/><div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8"><FoodOption/><GroceryOption/><DineOption/></div><footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400"><span className="font-black text-white">swiggy<span className="text-[#fc5b20]">.</span></span><p className="mt-2">Made for good food and great moments.</p></footer></main>;
}
