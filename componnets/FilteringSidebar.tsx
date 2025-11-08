// "use client";

// export default function Sidebar() {
//   return (
//     <aside className="w-full space-y-10 px-4">
//       {/* === Filter By Price === */}
//       <div>
//         <h3 className="mb-3 text-lg font-bold">FILTER BY PRICE</h3>
//         <div className="border-t border-gray-200 pt-4">
//           <input type="range" min="20" max="300" className="w-full" />
//           <p className="mt-2 text-sm text-gray-600">Price : $120 - $280</p>
//           <button className="mt-3 bg-green-600 px-4 py-2 text-sm font-semibold text-white">
//             FILTER
//           </button>
//         </div>
//       </div>

//       {/* === Categories === */}
//       <div>
//         <h3 className="mb-3 text-lg font-bold">CATEGORIES</h3>
//         <ul className="space-y-2 border-t border-gray-200 pt-4 text-sm">
//           {[
//             "ACCESSORIES",
//             "GYM SUPPLEMENT",
//             "MAN GYM",
//             "FITNESS GYM",
//             "WEIGHT LOSS",
//           ].map((item, i) => (
//             <li
//               key={i}
//               className="flex cursor-pointer justify-between transition hover:text-green-600"
//             >
//               <span className="flex items-center gap-2">
//                 <span className="h-2 w-2 rounded-full bg-green-600"></span>{" "}
//                 {item}
//               </span>
//               <span>»</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* === Latest Products === */}
//       <div>
//         <h3 className="mb-3 text-lg font-bold">LATEST PRODUCTS</h3>
//         <div className="space-y-4 border-t border-gray-200 pt-4">
//           {[1, 2, 3].map((_, i) => (
//             <div key={i} className="flex items-center gap-3">
//               {/* Product Image */}
//               <div className="h-16 w-16 bg-gray-100"></div>

//               <div>
//                 {/* Rating */}
//                 <div className="text-xs text-yellow-400">★★★★★</div>
//                 <p className="text-sm font-semibold">PRODUCT NAME</p>
//                 <p className="text-sm font-semibold text-green-600">$29.00</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* === Product Tags === */}
//       <div>
//         <h3 className="mb-3 text-lg font-bold">PRODUCT TAGS</h3>
//         <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
//           {[
//             "Bone Support",
//             "Energy Support",
//             "Hair",
//             "Multivitamins",
//             "Pre-Workout",
//             "Protein",
//             "Skin & Nails",
//           ].map((tag, i) => (
//             <span
//               key={i}
//               className="cursor-pointer rounded bg-gray-100 px-3 py-1 text-sm transition hover:bg-green-600 hover:text-white"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

export default function Sidebar({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
}: {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}) {
  const categories = [
    "Fat Burners",
    "Nutrition",
    "Body & Fit",
    "Protein",
    "WEIGHT LOSS",
  ];

  return (
    <aside className="w-full space-y-10 px-4">
      {/* FILTER BY PRICE */}
      <div>
        <h3 className="mb-3 text-lg font-bold">FILTER BY PRICE</h3>
        <div className="border-t border-gray-200 pt-4">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
          <p className="mt-2 text-sm text-gray-600">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>
      </div>

      {/* CATEGORIES */}
      <div>
        <h3 className="mb-3 text-lg font-bold">CATEGORIES</h3>
        <ul className="space-y-2 border-t border-gray-200 pt-4 text-sm">
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() =>
                setSelectedCategory(cat === selectedCategory ? null : cat)
              }
              className={`flex cursor-pointer justify-between transition ${
                selectedCategory === cat ? "font-semibold text-green-600" : ""
              }`}
            >
              <span>{cat}</span>
              <span>»</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
