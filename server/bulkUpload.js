import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dummyProducts = [
  {
    _id: "1",
    title: "Spicy Chicken Curry",
    images: ['product_1.png', 'product_5.png', 'product_4.png', 'product_8.png'],
    price: { H: 5, F: 10 },
    description:
      "Our Spicy Chicken Curry, made with tender chicken pieces cooked in a flavorful blend Enjoy of spices.",
    category: "Curry",
    type: "Chicken Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "2",
    title: "Vegetarian Chickpea Curry",
    images: ['product_2.png'],
    price: { H: 10, F: 20 },
    description:
      "Our Vegetarian Chickpea Curry is a hearty dish made with tender chickpeas simmered in a rich tomato-based sauce.",
    category: "Curry",
    type: "Vegetable Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "3",
    title: "Beef Vindaloo",
    images: ['product_3.png'],
    price: { H: 20, F: 30 },
    description:
      "Experience the fiery taste of our Beef Vindaloo, a traditional Goan dish with a spicy and tangy sauce.",
    category: "Curry",
    type: "Beef Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "4",
    title: "Creamy Paneer Butter Masala",
    images: ['product_4.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Creamy Paneer Butter Masala features soft paneer cubes cooked in a rich and creamy tomato gravy.",
    category: "Curry",
    type: "Vegetable Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "5",
    title: "Lamb Rogan Josh",
    images: ['product_5.png'],
    price: { H: 5, F: 10 },
    description:
      "Try our Lamb Rogan Josh, a traditional Kashmiri dish with tender lamb in a fragrant curry sauce.",
    category: "Curry",
    type: "Beef Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "6",
    title: "Fish Curry with Coconut Milk",
    images: ['product_6.png'],
    price: { H: 10, F: 20 },
    description:
      "Delight in our Fish Curry, made with fresh fish fillets simmered in a creamy coconut milk sauce.",
    category: "Curry",
    type: "Fish Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "7",
    title: "Egg Curry with Spices",
    images: ['product_7.png'],
    price: { H: 5, F: 10 },
    description:
      "Our Egg Curry is a simple yet flavorful dish, featuring boiled eggs cooked in a spiced gravy.",
    category: "Curry",
    type: "Vegetable Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "8",
    title: "Mutton Korma",
    images: ['product_8.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor our Mutton Korma, a royal dish made with tender mutton pieces in a rich, creamy sauce.",
    category: "Curry",
    type: "Beef Curry",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },

  // Pizza Products
  {
    _id: "9",
    title: "Margherita Pizza",
    images: ['product_9.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Our Margherita Pizza is a classic, topped with fresh mozzarella, tomatoes, and basil.",
    category: "Pizza",
    type: "Margherita",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "10",
    title: "Pepperoni Pizza",
    images: ['product_10.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Enjoy our Pepperoni Pizza, loaded with spicy pepperoni slices on a bed of melted cheese.",
    category: "Pizza",
    type: "Pepperoni",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "11",
    title: "BBQ Chicken Pizza",
    images: ['product_11.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Try our BBQ Chicken Pizza, topped with tender chicken pieces, BBQ sauce, and red onions.",
    category: "Pizza",
    type: "BBQ Chicken",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "12",
    title: "Vegetarian Pizza",
    images: ['product_12.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Our Vegetarian Pizza is a colorful mix of bell peppers, onions, mushrooms, and olives on a cheese base.",
    category: "Pizza",
    type: "Veggie",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "13",
    title: "Hawaiian Pizza",
    images: ['product_13.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Savor the sweet and savory taste of our Hawaiian Pizza, topped with ham and pineapple.",
    category: "Pizza",
    type: "Veggie",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "14",
    title: "Four Cheese Pizza",
    images: ['product_14.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Indulge in our Four Cheese Pizza, featuring a blend of mozzarella, cheddar, parmesan, and blue cheese.",
    category: "Pizza",
    type: "Four Cheese",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "15",
    title: "Spicy Sausage Pizza",
    images: ['product_15.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Our Spicy Sausage Pizza is topped with hot sausage, peppers, and onions for a fiery kick.",
    category: "Pizza",
    type: "Pepperoni",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "16",
    title: "Mushroom Truffle Pizza",
    images: ['product_16.png'],
    price: { S: 30, M: 35, L: 40, XL: 45 },
    description:
      "Experience the earthy flavors of our Mushroom Truffle Pizza, topped with sautéed mushrooms and truffle oil.",
    category: "Pizza",
    type: "Veggie",
    sizes: ["S", "M", "L", "XL"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },

  // Rice Products
  {
    _id: "17",
    title: "Chicken Biryani",
    images: ['product_17.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Chicken Biryani is a fragrant rice dish, made with tender chicken pieces and aromatic spices.",
    category: "Rice",
    type: "Biryani",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "18",
    title: "Vegetable Fried Rice",
    images: ['product_18.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy our Vegetable Fried Rice, a mix of rice, fresh vegetables, and soy sauce for a tasty meal.",
    category: "Rice",
    type: "Fried Rice",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "19",
    title: "Prawn Pilaf",
    images: ['product_19.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor our Prawn Pilaf, a flavorful rice dish with prawns cooked in a fragrant broth.",
    category: "Rice",
    type: "Pulao",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "20",
    title: "Beef Pulao",
    images: ['product_20.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Beef Pulao is a hearty dish, featuring tender beef pieces cooked with aromatic basmati rice.",
    category: "Rice",
    type: "Pulao",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "21",
    title: "Mutton Biryani",
    images: ['product_21.png'],
    price: { H: 15, F: 20 },
    description:
      "Try our Mutton Biryani, a rich and flavorful rice dish made with tender mutton and spices.",
    category: "Rice",
    type: "Biryani",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "22",
    title: "Egg Fried Rice",
    images: ['product_22.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Egg Fried Rice is a simple yet delicious dish, made with scrambled eggs and seasoned rice.",
    category: "Rice",
    type: "Fried Rice",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "23",
    title: "Lemon Rice",
    images: ['product_23.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy the tangy taste of our Lemon Rice, made with fresh lemon juice, turmeric, and aromatic spices.",
    category: "Rice",
    type: "Steamed Rice",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "24",
    title: "Shrimp Fried Rice",
    images: ['product_24.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Shrimp Fried Rice is a tasty dish, featuring juicy shrimp stir-fried with seasoned rice.",
    category: "Rice",
    type: "Fried Rice",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },

  // Deserts Products
  {
    _id: "25",
    title: "Classic Chocolate Cake with Rich Ganache",
    images: ['product_25.png'],
    price: { H: 15, F: 20 },
    description:
      "Indulge in our Classic Chocolate Cake, made with layers of moist chocolate sponge and rich ganache.",
    category: "Deserts",
    type: "Cakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "26",
    title: "Creamy Cheesecake with Fresh Berry Topping",
    images: ['product_26.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor our Creamy Cheesecake, topped with a medley of fresh berries for a delightful finish.",
    category: "Deserts",
    type: "Cakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "27",
    title: "Warm Apple Pie with Flaky Crust",
    images: ['product_27.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy our Warm Apple Pie, filled with spiced apples and encased in a flaky, buttery crust.",
    category: "Deserts",
    type: "Pastries",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "28",
    title: "Decadent Chocolate Brownie with Fudge Center",
    images: ['product_28.png'],
    price: { H: 15, F: 20 },
    description:
      "Treat yourself to our Decadent Chocolate Brownie, featuring a rich, fudgy center.",
    category: "Deserts",
    type: "Brownies",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "29",
    title: "Light Lemon Tart with Buttery Crust",
    images: ['product_29.png'],
    price: { H: 15, F: 20 },
    description:
      "Relish our Light Lemon Tart, offering a tangy lemon filling in a crisp, buttery crust.",
    category: "Deserts",
    type: "Pastries",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "30",
    title: "Velvety Chocolate Mousse with Whipped Cream",
    images: ['product_30.png'],
    price: { H: 15, F: 20 },
    description:
      "Experience the smooth texture of our Velvety Chocolate Mousse, topped with fresh whipped cream.",
    category: "Deserts",
    type: "Cakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "31",
    title: "Creamy Panna Cotta with Berry Compote",
    images: ['product_31.png'],
    price: { H: 15, F: 20 },
    description:
      "Delight in our Creamy Panna Cotta, served with a luscious berry compote.",
    category: "Deserts",
    type: "Pastries",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "32",
    title: "Traditional Tiramisu with Mascarpone Cream",
    images: ['product_32.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor the flavors of Italy with our Traditional Tiramisu, layered with rich mascarpone cream.",
    category: "Deserts",
    type: "Cakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  // Drinks Products
  {
    _id: "33",
    title: "Chilled Lemonade with Fresh Mint",
    images: ['product_33.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy our Chilled Lemonade, infused with fresh mint for a refreshing twist on a classic drink.",
    category: "Drinks",
    type: "Fresh Juices",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "34",
    title: "Smooth Vanilla Milkshake",
    images: ['product_34.png'],
    price: { H: 15, F: 20 },
    description:
      "Indulge in our Smooth Vanilla Milkshake, made with creamy vanilla ice cream and fresh milk.",
    category: "Drinks",
    type: "Milkshakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "35",
    title: "Tangy Orange Juice",
    images: ['product_35.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor the taste of our Tangy Orange Juice, freshly squeezed from ripe oranges.",
    category: "Drinks",
    type: "Fresh Juices",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "36",
    title: "Rich Chocolate Milk",
    images: ['product_36.png'],
    price: { H: 15, F: 20 },
    description:
      "Treat yourself to our Rich Chocolate Milk, a perfect blend of cocoa and milk for a creamy delight.",
    category: "Drinks",
    type: "Milkshakes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "37",
    title: "Fruity Mango Smoothie",
    images: ['product_37.png'],
    price: { H: 15, F: 20 },
    description:
      "Relish our Fruity Mango Smoothie, made with fresh mangoes and yogurt for a healthy treat.",
    category: "Drinks",
    type: "Smoothies",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "38",
    title: "Refreshing Iced Tea",
    images: ['product_38.png'],
    price: { H: 15, F: 20 },
    description:
      "Experience the cool and refreshing taste of our Iced Tea, brewed with a hint of lemon.",
    category: "Drinks",
    type: "Soft Drinks",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "39",
    title: "Creamy Coffee Latte",
    images: ['product_39.png'],
    price: { H: 15, F: 20 },
    description:
      "Delight in our Creamy Coffee Latte, made with rich espresso and steamed milk.",
    category: "Drinks",
    type: "Coffee",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "40",
    title: "Zesty Ginger Ale",
    images: ['product_40.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor the spicy and refreshing taste of our Zesty Ginger Ale, perfect for any time of day.",
    category: "Drinks",
    type: "Soft Drinks",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },

  // Fruits Products
  {
    _id: "41",
    title: "Fresh Strawberries",
    images: ['product_41.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy the sweet and juicy taste of our Fresh Strawberries, handpicked for your delight.",
    category: "Fruits",
    type: "Strawberries",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "42",
    title: "Crisp Green Apples",
    images: ['product_42.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor the tart and refreshing taste of our Crisp Green Apples, perfect for snacking.",
    category: "Fruits",
    type: "Apples",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "43",
    title: "Tropical Pineapple Chunks",
    images: ['product_43.png'],
    price: { H: 15, F: 20 },
    description:
      "Delight in our Tropical Pineapple Chunks, bursting with sweet and tangy flavors.",
    category: "Fruits",
    type: "Grapes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "44",
    title: "Juicy Watermelon Slices",
    images: ['product_44.png'],
    price: { H: 15, F: 20 },
    description:
      "Cool down with our Juicy Watermelon Slices, perfect for a refreshing summer treat.",
    category: "Fruits",
    type: "Oranges",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "45",
    title: "Sweet Red Grapes",
    images: ['product_45.png'],
    price: { H: 15, F: 20 },
    description:
      "Indulge in our Sweet Red Grapes, packed with natural sweetness and flavor.",
    category: "Fruits",
    type: "Grapes",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "46",
    title: "Freshly Peeled Oranges",
    images: ['product_46.png'],
    price: { H: 15, F: 20 },
    description:
      "Enjoy the convenience of our Freshly Peeled Oranges, ready to eat and full of juicy goodness.",
    category: "Fruits",
    type: "Oranges",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "47",
    title: "Ripe Banana Bunch",
    images: ['product_47.png'],
    price: { H: 15, F: 20 },
    description:
      "Our Ripe Banana Bunch is perfect for a quick snack or a healthy addition to your meals.",
    category: "Fruits",
    type: "Bananas",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "48",
    title: "Exotic Mango Slices",
    images: ['product_48.png'],
    price: { H: 15, F: 20 },
    description:
      "Savor the rich and juicy taste of our Exotic Mango Slices, a perfect tropical treat.",
    category: "Fruits",
    type: "Bananas",
    sizes: ["H", "F"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
];

cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET,
});

async function bulkUpload() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/FoodieFiesta`);

        for(const prod of dummyProducts) {
            const imagesUrl = await Promise.all(
                prod.images.map(async (fileName) => {
                    const filePath = path.join(__dirname, "images", fileName);
                    const result = await cloudinary.uploader.upload(filePath, {
                        resource_type: "image",
                    });
                    return result.secure_url;
                })
            );

            await Product.create({
                title: prod.title,
                description: prod.description,
                price: prod.price,
                sizes: prod.sizes,
                images: imagesUrl,
                category: prod.category,
                type: prod.type,
                popular: prod.popular,
                inStock: prod.inStock,
            });

            console.log(`Uploaded: ${prod.title}`)
        }

        console.log("All products uploaded successfully!");
    } catch (error) {
        console.error("Error: ", error)
    } finally {
        mongoose.disconnect();
    }
}

bulkUpload();