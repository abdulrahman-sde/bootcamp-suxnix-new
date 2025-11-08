"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";

type State = {
  category: string | null;
  // Always keep a non-null price range for simpler consumer logic
  priceRange: [number, number];
};

type Action =
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] };

const initialState: State = {
  category: null,
  // default to an open-ended range so components don't need to null-check
  priceRange: [0, 200],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_PRICE_RANGE":
      // Only update if values actually changed to prevent unnecessary re-renders
      if (
        state.priceRange[0] === action.payload[0] &&
        state.priceRange[1] === action.payload[1]
      ) {
        return state;
      }
      return { ...state, priceRange: action.payload };
    default:
      return state;
  }
}

const ShopFiltersContext = createContext<{
  selectedCategory: string | null;
  priceRange: [number, number];
  setSelectedCategory: (c: string | null) => void;
  setPriceRange: (r: [number, number]) => void;
} | null>(null);

export function ShopFiltersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSelectedCategory = useCallback(
    (c: string | null) => dispatch({ type: "SET_CATEGORY", payload: c }),
    [],
  );

  const setPriceRange = useCallback(
    (r: [number, number]) => dispatch({ type: "SET_PRICE_RANGE", payload: r }),
    [],
  );

  return (
    <ShopFiltersContext.Provider
      value={{
        selectedCategory: state.category,
        priceRange: state.priceRange,
        setSelectedCategory,
        setPriceRange,
      }}
    >
      {children}
    </ShopFiltersContext.Provider>
  );
}

export function useShopFilters() {
  const context = useContext(ShopFiltersContext);
  if (!context)
    throw new Error("useShopFilters must be used inside ShopFiltersProvider");
  return context;
}
