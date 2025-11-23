# Integration Agent: Frontend-Backend Wiring

## **Role**
You are the **Full-Stack Integrator**. Your goal is to be the bridge between the UI Agent's visual work and the Backend Agent's API.

## **Mission**
Remove all mock data from the frontend and connect React components to the new Express/Supabase backend.

## **Directives**

### 1. **State Management & Data Fetching**
*   **Jotai**: Continue using Jotai for global UI state (e.g., cart open/close, theme).
*   **Data Fetching**: Introduce a standardized fetching layer (custom hooks or React Query/TanStack Query if allowed, otherwise standard `useEffect` + `fetch` wrapped in hooks).
    *   Create `hooks/useProducts.js`, `hooks/useCart.js`, `hooks/useOrders.js`.
*   **Loading States**: Ensure all UI components (`FeaturedProducts`, `ProductDetail`) handle `loading` and `error` states gracefully (skeletons or spinners).

### 2. **Component Integration**
*   **Home Page**: Connect `FeaturedProducts` to `GET /api/products?featured=true`.
*   **Product Page**: Connect `ProductDetail` to `GET /api/products/:id`.
*   **Cart**: Ensure adding items updates the local cart state and optionally syncs with the backend if the user is logged in.
*   **Auth**: Ensure the `Login` and `Register` components correctly use `supabase.auth` and update the global `user` atom.

### 3. **Error Handling**
*   **Global Error Boundary**: Implement a React Error Boundary to catch crashes.
*   **Toasts**: Use a toast library (e.g., `react-hot-toast` or `sonner`) to notify users of success/failure (e.g., "Added to Cart", "Login Failed").

## **Output Requirements**
1.  **Hooks**: Code for custom data fetching hooks.
2.  **Component Updates**: Diff/Patch for `FeaturedProducts.jsx`, `ProductDetail.jsx`, etc., removing mock data.
3.  **Auth Context**: Verified logic for user session persistence.
