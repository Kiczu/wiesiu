import React from "react";
import { FaFilter } from "react-icons/fa";
import SortingSelect from "../../../components/Selects/SortingSelects/SortingSelect";
import "./Filters.scss";
import classNames from "classnames";

const Filters = ({
  activeCategory,
  categories,
  isFilterMenuOpen,
  products,
  handleCategoryClick,
  handleSelectChange,
  setProducts,
  toggleMenu,
}) => {

  const filtersMenuToggle = classNames("categories-filter", {
    "active": isFilterMenuOpen,
    "inactive": !isFilterMenuOpen,
  });

  return (
    <div className="product-filters">
      <button className="filter-button" onClick={toggleMenu}>
        Filtry{" "}
        <i>
          <FaFilter />
        </i>
      </button>
      <div
        className={filtersMenuToggle}
      >
        <p className="categories-filter-title">Kategorie</p>
        {categories.map((category) => (
          <button
            className={`categories-filter-button ${
              activeCategory === category.id ? "active-category-filter" : ""}`}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
        <div className="sorting-filter-mobile">
          <SortingSelect
            onChange={handleSelectChange}
            products={products}
            setProducts={setProducts}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
