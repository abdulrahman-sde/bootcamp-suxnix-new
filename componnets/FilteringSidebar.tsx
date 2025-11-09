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
    <aside className="w-full space-y-10 px-4 md:max-w-[30%]">
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
