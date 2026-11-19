import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import RestaurantMenu from "./components/RestaurantMenu";
import { ShoppingBag } from "lucide-react";

function NotFound() {
  return <main className="min-h-screen grid place-items-center px-6 text-center"><div><ShoppingBag className="mx-auto mb-4 text-orange-500" size={42}/><h1 className="text-3xl font-black text-slate-900">Page not found</h1><p className="mt-2 text-slate-500">The page you're looking for doesn't exist.</p><a href="/" className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">Back to home</a></div></main>;
}

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/restaurant" element={<Restaurant/>}/><Route path="/city/delhi/:id" element={<RestaurantMenu/>}/><Route path="*" element={<NotFound/>}/></Routes></BrowserRouter>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
