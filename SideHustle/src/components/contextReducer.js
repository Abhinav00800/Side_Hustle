// contextReducer.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const STORAGE_KEY = "app_cart_v1";

// helper: allow action.payload or action.{field}
const getField = (action, field) => {
  if (!action) return undefined;
  if (action.payload && action.payload[field] !== undefined) return action.payload[field];
  return action[field];
};

function cartReducer(state, action) {
  const id = getField(action, "id");
  const size = getField(action, "size") ?? "";
  const qty = getField(action, "qty");
  const price = getField(action, "price");
  const name = getField(action, "name");
  const img = getField(action, "img");

  switch (action.type) {
    case "INIT":
      return Array.isArray(action.payload) ? action.payload : state;

    case "ADD": {
      if (id === undefined) return state;
      // find same id+size (normalize to strings)
      const idx = state.findIndex(
        (it) => String(it.id) === String(id) && String(it.size) === String(size)
      );
      if (idx >= 0) {
        const newState = [...state];
        newState[idx] = {
          ...newState[idx],
          qty: Number(newState[idx].qty) + Number(qty ?? 1),
          // store unit price (you can change to total price if preferred)
          price: price ?? newState[idx].price,
        };
        return newState;
      }
      // add new item
      return [
        ...state,
        {
          id,
          name: name ?? "",
          size,
          qty: Number(qty ?? 1),
          price: Number(price ?? 0),
          img: img ?? "",
        },
      ];
    }

    case "UPDATE": {
      if (id === undefined) return state;
      const idx = state.findIndex(
        (it) => String(it.id) === String(id) && String(it.size) === String(size)
      );
      if (idx < 0) return state;
      const newState = [...state];
      const newQty = Number(qty ?? newState[idx].qty);
      newState[idx] = { ...newState[idx], qty: newQty, price: price ?? newState[idx].price };
      // remove if qty <= 0
      if (newState[idx].qty <= 0) {
        newState.splice(idx, 1);
      }
      return newState;
    }

    case "REMOVE": {
      if (id === undefined) return state;
      // if size provided, remove only that size; otherwise remove all items with matching id
      if (size !== undefined && String(size) !== "") {
        return state.filter(
          (it) => !(String(it.id) === String(id) && String(it.size) === String(size))
        );
      }
      return state.filter((it) => String(it.id) !== String(id));
    }

    case "CLEAR":
      return [];

    default:
      console.warn("Unknown cart action:", action);
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  // Init from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      dispatch({ type: "INIT", payload: Array.isArray(parsed) ? parsed : [] });
    } catch (e) {
      console.error("Failed to init cart from storage:", e);
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save cart to storage:", e);
    }
  }, [state]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function useDispatchCart() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined) throw new Error("useDispatchCart must be used within CartProvider");
  return ctx;
}
