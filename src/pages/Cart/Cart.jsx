import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,addToCart } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Total</p>
          <p></p>
          <p>Quantity</p>
          <p></p>

        </div>
        <br />
        <hr />
        {food_list &&
          food_list.length > 0 &&
          food_list.map((item) => {
            if (cartItems[item._id] && cartItems[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className="cart-items-title cart-items-item"
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_URL}/images/${item.image}`}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button className="btn-cart" onClick={()=> removeFromCart(item._id)}>-</button>
                  <p>{cartItems[item._id]}</p>
                  <button className="btn-cart" onClick={()=> addToCart(item._id)}>+</button>
                </div>
              );
            }
            return null;
          })}
        <hr />
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, please enter it</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
