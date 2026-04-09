export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  materialName: string;
  thickness: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

const CART_KEY = "besikita_cart";

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // silent fail — localStorage tidak tersedia (SSR / private browsing)
  }
}

export function addToCart(item: Omit<CartItem, "subtotal">): void {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (c) =>
      c.productId === item.productId &&
      c.materialName === item.materialName &&
      c.thickness === item.thickness
  );

  if (existingIndex !== -1) {
    const existing = cart[existingIndex];
    const newQuantity = existing.quantity + item.quantity;
    cart[existingIndex] = {
      ...existing,
      quantity: newQuantity,
      subtotal: existing.pricePerUnit * newQuantity,
    };
  } else {
    cart.push({
      ...item,
      subtotal: item.pricePerUnit * item.quantity,
    });
  }

  saveCart(cart);
}

export function removeFromCart(id: string): void {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function clearCart(): void {
  saveCart([]);
}

export function updateQuantity(id: string, newQuantity: number): CartItem[] {
  if (newQuantity < 1) return getCart();

  const cart = getCart().map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: newQuantity,
        subtotal: item.pricePerUnit * newQuantity,
      };
    }
    return item;
  });

  saveCart(cart);
  return cart;
}
