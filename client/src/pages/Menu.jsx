import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import SearchInput from "../components/SearchInput";
import { useAppContext } from "../context/AppContext";

const Menu = () => {
  const { products, searchQuery } = useAppContext();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [selectedSort, setSelectedSort] = useState("relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTypes, setAvailableTypes] = useState([]);
  const itemsPerPage = 8;

  // Predefined Categories list
  const allCategories = useMemo(
    () => ["Curry", "Pizza", "Rice", "Deserts", "Drinks", "Fruits"],
    []
  );

  // Reusable Function to toggle filter values
  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Dynamically update types based on selected categories
  useEffect(() => {
    const selectedCat = category.length > 0 ? category : allCategories;
    const filteredProds = products.filter((p) =>
      selectedCat.includes(p.category)
    );
    const typeSet = new Set(filteredProds.map((p) => p.type));
    const newAvailableTypes = [...typeSet].sort();
    setAvailableTypes(newAvailableTypes);

    // remove unavailable types from selection
    setType((prev) => prev.filter((t) => typeSet.has(t)));
  }, [category, products, allCategories]);

  // Apply Filters like search, category, type and inStock
  const applyFilters = () => {
    let filtered = [...products];

    // Product that are inStock
    filtered = filtered.filter((p) => p.inStock);

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }

    if (type.length) {
      filtered = filtered.filter((product) => type.includes(product.type));
    }

    return filtered;
  };

  //Sorting logic based on price or relevance
  const applySorting = (productsList) => {
    switch (selectedSort) {
      case "low":
        return [...productsList].sort(
          (a, b) =>
            Math.min(...Object.values(a.price)) -
            Math.min(...Object.values(b.price))
        );
      case "high":
        return [...productsList].sort(
          (a, b) =>
            Math.min(...Object.values(b.price)) -
            Math.min(...Object.values(a.price))
        );

      default:
        return productsList;
    }
  };

  //Update filtered and sorted products whenever dependencies change
  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [category, type, selectedSort, products, searchQuery]);

  // handle pagination logic
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="max-padd-container !px-0 mt-18">
      {/* Container */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filter options - left side */}
        <div className="min-w-72 bg-white p-4 pl-6 lg:pl-12 rounded-r-xl my-4">
          <SearchInput />
          <div className="px-4 py-3 mt-2 bg-primary rounded-xl">
            <h5 className="mb-4">Sort By Price</h5>
            <select
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border border-slate-900/10 outline-none bg-white text-gray-30 text-sm font-medium h-8 w-full px-2 rounded-md"
            >
              <option value="relevant">Relevant</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="pl-5 py-3 mt-4 bg-primary rounded-xl">
            <h5 className="mb-4">Categories</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {allCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex gap-2 text-sm font-medium text-gray-30"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    value={cat}
                    checked={category.includes(cat)}
                    className="w-3"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="pl-5 py-3 mt-4 bg-primary rounded-xl">
            <h5 className="mb-4">Types</h5>
            <div className="flex flex-col gap-2 text-sm font-light">
              {availableTypes.map((typ) => (
                <label
                  key={typ}
                  className="flex gap-2 text-sm font-medium text-gray-30"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => toggleFilter(e.target.value, setType)}
                    value={typ}
                    checked={type.includes(typ)}
                    className="w-3"
                  />
                  {typ}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* filter products - Right side */}
        <div className="max-sm:px-10 sm:pr-10 bg-white px-4 rounded-l-xl my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product) => (
                <Item key={product._id} product={product} />
              ))
            ) : (
              <p className="capitalize">
                No products found for selected filters.
              </p>
            )}
          </div>
          {/* Pagination */}
          <div className="flexCenter flex flex-wrap mt-14 mb-10 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`btn-solid !py-1 !px-3 ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn-light !py-1 !px-3 ${
                  currentPage === index + 1 && "bg-solidTwo text-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`btn-solid !py-1 !px-3 ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
