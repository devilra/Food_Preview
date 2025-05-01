import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaTags,
  FaUser,
} from "react-icons/fa";

const foodCategories = [
  "Poori",
  "Chappathi",
  "Biriyani",
  "Dosa",
  "Idli",
  "Pongal",
  "Fried Rice",
  "Noodles",
  "Parotta",
  "Upma",
  "Vada",
  "Sambar Rice",
  "Curd Rice",
  "Lemon Rice",
  "Kichadi",
  "Appam",
  "Kesari",
  "Puttu",
  "Bajji",
  "Paniyaram",
];

const randomIngredients = [
  "Onion",
  "Tomato",
  "Chili",
  "Ginger",
  "Garlic",
  "Ghee",
  "Mustard",
  "Coriander",
  "Curry Leaves",
  "Pepper",
];

const hotels = [
  "Hotel Tamil Nadu",
  "Annapoorna",
  "Saravana Bhavan",
  "A2B",
  "Sangeetha",
  "Sri Krishna Bhavan",
];
const randomUsers = [
  "Arun",
  "Kavi",
  "Raj",
  "Divya",
  "Mohan",
  "Sita",
  "Prakash",
  "Jaya",
];
const sampleComments = [
  "Delicious and satisfying!",
  "Could be better, but decent.",
  "Loved the flavor and texture.",
  "Too spicy for my taste.",
  "Perfectly cooked and seasoned!",
  "Not what I expected.",
  "Absolutely amazing experience!",
  "Will definitely order again.",
];

const getRandomIngredients = () =>
  Array.from(
    { length: 3 },
    () =>
      randomIngredients[Math.floor(Math.random() * randomIngredients.length)]
  ).join(", ");

const generateComments = () =>
  Array.from({ length: Math.floor(Math.random() * 6 + 2) }, () => ({
    user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
    text: sampleComments[Math.floor(Math.random() * sampleComments.length)],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 1000000000)
    ).toLocaleDateString(),
  }));

const allMenus = Array.from({ length: 1000 }, (_, index) => {
  const category =
    foodCategories[Math.floor(Math.random() * foodCategories.length)];
  const price = (50 + Math.floor(Math.random() * 150)).toFixed(0);
  const hasDiscount = Math.random() > 0.6;
  const discount = hasDiscount
    ? `${Math.floor(Math.random() * 30) + 10}% OFF`
    : null;
  const isVeg = Math.random() > 0.3;
  const isAvailable = Math.random() > 0.2;
  const rating = (3 + Math.random() * 2).toFixed(1);
  const totalReviews = Math.floor(Math.random() * 500 + 10);
  const createdAt = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toLocaleDateString();
  const hotelName = hotels[Math.floor(Math.random() * hotels.length)];

  return {
    id: `item-${index + 1}`,
    hotelName,
    category,
    name: `${category} Special ${index + 1}`,
    description: `This is a special ${category} item number ${
      index + 1
    }. Delicious and tasty.`,
    price,
    discount,
    ingredients: getRandomIngredients(),
    isVeg,
    isAvailable,
    rating,
    totalReviews,
    createdAt,
    comments: generateComments(),
  };
});

function FoodStats({ items, onFilter }) {
  const availableCount = items.filter((i) => i.isAvailable).length;
  const notAvailableCount = items.length - availableCount;

  return (
    <div className="flex flex-wrap justify-center gap-6 py-3 sticky top-[3.5rem] bg-white z-10 shadow-sm">
      <button
        onClick={() => onFilter("available")}
        className="text-green-600 font-semibold hover:underline">
        Available: {availableCount}
      </button>
      <button
        onClick={() => onFilter("not-available")}
        className="text-red-500 font-semibold hover:underline">
        Not Available: {notAvailableCount}
      </button>
      <button
        onClick={() => onFilter("all")}
        className="text-blue-600 font-semibold hover:underline">
        Total: {items.length}
      </button>
    </div>
  );
}

function CommentSection({ comments }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Reviews</h3>
      {comments.map((comment, idx) => (
        <div key={idx} className="border p-3 rounded-lg mb-2 bg-gray-50">
          <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
            <FaUser /> {comment.user}{" "}
            <span className="text-sm text-gray-500 ml-2">
              {comment.createdAt}
            </span>
          </div>
          <p className="text-gray-600">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredMenus = allMenus.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const availabilityMatch =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && item.isAvailable) ||
      (availabilityFilter === "not-available" && !item.isAvailable);
    const searchMatch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && availabilityMatch && searchMatch;
  });

  return (
    <div className="p-6 space-y-6 my-2">
      <div className="sticky top-0 bg-white z-20 py-4  shadow-sm">
        <div className="overflow-x-scroll my-2 md:flex  flex  gap-3 ">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedItem(null);
            }}
            className={`px-7 my-2 md:my-0 py-2  rounded-md shadow ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-white border border-neutral-400 "
            }`}>
            All
          </button>
          {foodCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedItem(null);
              }}
              className={`px-7  my-2 md:my-0 border border-neutral-400 rounded-md shadow  ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}>
              {category}
            </button>
          ))}
        </div>
        <FoodStats
          items={allMenus.filter(
            (item) =>
              selectedCategory === "All" || item.category === selectedCategory
          )}
          onFilter={setAvailabilityFilter}
        />
        <div className="mt-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full max-w-md px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {!selectedItem ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {filteredMenus.map((item) => (
            <motion.div
              key={item.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer border"
              onClick={() => setSelectedItem(item)}>
              <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="text-lg font-bold text-blue-700 break-words flex-1 min-w-0 truncate">
                  {item.name}
                </h3>
                {item.discount && (
                  <span className="text-sm text-red-600 font-semibold bg-red-100 px-2 py-0.5 rounded whitespace-nowrap">
                    <FaTags className="inline mr-1" /> {item.discount}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-1">{item.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Ingredients: {item.ingredients}
              </p>
              <div className="flex items-center text-sm gap-2 text-green-600">
                ₹ {item.price} ● <FaStar className="text-yellow-500" />{" "}
                {item.rating} ({item.totalReviews})
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  {item.isVeg ? (
                    <FaLeaf className="text-green-500" />
                  ) : (
                    <FaLeaf className="text-red-500 rotate-45" />
                  )}{" "}
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </span>
                <span
                  className={`text-sm ${
                    item.isAvailable ? "text-green-600" : "text-red-500"
                  }`}>
                  <FaCheckCircle className="inline mr-1" />{" "}
                  {item.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 space-y-4">
          <button
            className="text-blue-600 underline mb-4"
            onClick={() => setSelectedItem(null)}>
            ← Back to list
          </button>
          <h1 className="text-2xl font-bold text-blue-800 break-words">
            {selectedItem.name}
          </h1>
          <div className="text-gray-700">
            Hotel:{" "}
            <span className="font-semibold">{selectedItem.hotelName}</span>
          </div>
          {selectedItem.discount && (
            <div className="text-red-600 font-semibold flex items-center gap-2">
              <FaTags /> {selectedItem.discount}
            </div>
          )}
          <p className="text-gray-700">{selectedItem.description}</p>
          <p className="text-sm text-gray-600">
            Ingredients:{" "}
            <span className="inline-block bg-gray-100 px-2 py-1 rounded-full text-gray-700 font-medium">
              {selectedItem.ingredients}
            </span>
          </p>
          <p className="text-xl font-semibold text-green-700">
            ₹ {selectedItem.price}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {selectedItem.rating} (
              {selectedItem.totalReviews})
            </span>
            <span className="flex items-center gap-1">
              <FaLeaf
                className={
                  selectedItem.isVeg
                    ? "text-green-600"
                    : "text-red-500 rotate-45"
                }
              />{" "}
              {selectedItem.isVeg ? "Veg" : "Non-Veg"}
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle
                className={
                  selectedItem.isAvailable ? "text-green-600" : "text-red-500"
                }
              />{" "}
              {selectedItem.isAvailable ? "Available" : "Not Available"}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <FaClock /> Created: {selectedItem.createdAt}
            </span>
          </div>
          <CommentSection comments={selectedItem.comments} />
        </motion.div>
      )}
    </div>
  );
}
