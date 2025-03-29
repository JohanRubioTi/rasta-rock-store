import { atom } from 'jotai';

// Product state
export const productsAtom = atom([]);

// Category state
export const categoriesAtom = atom([]);

// Image state with stable IDs
export const imagesAtom = atom([]);

// Drag state management
export const dragStateAtom = atom({
  draggableId: null,
  sourceIndex: -1,
  targetIndex: -1
});

// User authentication state
export const userAtom = atom(null);
export const isAuthenticatedAtom = atom(false);

// Admin state
export const adminStateAtom = atom({
  isAdmin: false,
  // ... other admin related state
});

// HandleRemoveImage atom
export const handleRemoveImageAtom = atom(null);

// Image upload state
export const selectedImageFileAtom = atom(null);
export const uploadProgressAtom = atom(0);
export const isUploadingAtom = atom(false);
