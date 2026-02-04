// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   // const url = "http://localhost:4000";
//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);
//   const [search,setSearch]=useState("");

//     const addToCart = async (itemId) => {
//       if (!cartItems[itemId]) {
//         setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//       } else {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//       }
//       if (token) {
//         await axios.post(
//           `${import.meta.env.VITE_REACT_URL}/api/cart/add`,
//           { itemId },
//           { headers: { token } },
//         );
//       }
//     };


//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       await axios.post(
//         `${import.meta.env.VITE_REACT_URL}/api/cart/remove`,
//         { itemId },
//         { headers: { token } },
//       );
//     }
//   };

//     // const getTotalCartAmount = () => {
//     //   let totalAmount = 0;

//     //   if (!food_list.length) return 0;
//     //   for (const item in cartItems) {
//     //     if (cartItems[item] > 0) {
//     //       let itemInfo = food_list.find(product => product._id.toString() === item);
//     //       totalAmount += itemInfo.price * cartItems[item];
//     //       if (itemInfo) {
//     //         totalAmount += itemInfo.price * cartItems[item];
//     //       }
//     //     }
//     //   }
//     //   return totalAmount;
//     // };
// const getTotalCartAmount = () => {
//   if (!food_list || !cartItems) return 0;

//   let totalAmount = 0;

//   for (const item in cartItems) {
//     if (cartItems[item] > 0) {
//       const itemInfo = food_list.find(
//         (product) => product._id === item
//       );

//       if (itemInfo) {
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//   }
//   console.log(totalAmount)
//   useEffect(()=>{

//   },[totalAmount])

// };




//   const fetchFoodList = async () => {
//     const response = await axios.get(`${import.meta.env.VITE_REACT_URL}/api/food/list`);
//     setFoodList(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_REACT_URL}/api/cart/get`,
//       {},
//       { headers: { token } },
//     );
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         await loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     token,
//     setToken,
//     search,
//     setSearch,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };
// export default StoreContextProvider;


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${import.meta.env.VITE_REACT_URL}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      await axios.post(
        `${import.meta.env.VITE_REACT_URL}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (!food_list.length) return 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === itemId
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_URL}/api/food/list`
    );
    setFoodList(res.data.data);
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_URL}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };

  useEffect(() => {
    fetchFoodList();
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadCartData(savedToken);
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        search,
        setSearch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
