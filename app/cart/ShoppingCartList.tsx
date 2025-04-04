"use client";

import { useState } from "react";
import { Product } from "../product-data";
import Link from "next/link";

export default function ShoppingCartList({
  initialCartProducts,
}: {
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  async function removeFromCart(productId: string) {
    const response = await fetch("http://localhost:3000/api/users/2/cart", {
      method: "DELETE",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }
  return (
    <>
      <h1>Shopping Cart</h1>
      {cartProducts.map((product) => (
        <Link key={product.id} href={"/products/" + product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button
              onClick={(e) => {
                e.preventDefault();
                removeFromCart(product.id);
              }}
            >
              Remove from Cart
            </button>
        </Link>
      ))}
    </>
  );
}
