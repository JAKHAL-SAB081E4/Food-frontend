import React, { useContext, useEffect, useRef } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, search } = useContext(StoreContext);
  const foodRef = useRef(null);

 useEffect(() => {
  if (search.trim().length < 2) return;

  const timer = setTimeout(() => {
    foodRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 500); // waits 0.5 sec after typing stops

  return () => clearTimeout(timer);
}, [search]);



  const filteredFood = food_list.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="food-display" id="food-display" ref={foodRef}>
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {filteredFood.length === 0 ? (
          <p className="no-food">No food found 😢</p>
        ) : (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
