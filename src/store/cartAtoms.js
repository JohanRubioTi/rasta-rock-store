import { atom } from 'jotai';

export const cartAtom = atom([]);

export const addToCartAtom = atom(
  null,
  (get, set, item) => {
    const cart = get(cartAtom);
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.variant === item.variant
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      set(cartAtom, updatedCart);
    } else {
      set(cartAtom, [...cart, item]);
    }
  }
);

export const removeFromCartAtom = atom(
  null,
  (get, set, { id, variant }) => {
    const cart = get(cartAtom);
    set(cartAtom, cart.filter(item => 
      !(item.id === id && item.variant === variant)
    ));
  }
);

export const updateQuantityAtom = atom(
  null,
  (get, set, { id, variant, quantity }) => {
    const cart = get(cartAtom);
    const updatedCart = cart.map(item => {
      if (item.id === id && item.variant === variant) {
        return { ...item, quantity };
      }
      return item;
    });
    set(cartAtom, updatedCart);
  }
);
