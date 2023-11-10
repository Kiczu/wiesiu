import { useState, useEffect, useMemo } from "react";
import woocommerceServices from "../../services/woocommerceService";

const sortFunctions = {
  price_down: (a, b) => a.price - b.price,
  price_up: (a, b) => b.price - a.price,
  popularity: (a, b) => b.total_sales - a.total_sales,
  date_created_oldest: (a, b) =>
    new Date(a.date_created) - new Date(b.date_created),
  date_created_newest: (a, b) =>
    new Date(b.date_created) - new Date(a.date_created),
};

const useShopData = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [activeSort, setActiceSort] = useState("date_created_newest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await woocommerceServices.getProducts();
        setProducts(data);
        setProductsByCategory(sortProductsByCategory(data));
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await woocommerceServices.getCategories();
        const filteredCategories = data.filter(
          (category) => category.count !== 0
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  const sortProductsByCategory = (products) => {
    const sortedProducts = {};
    products.forEach((product) => {
      const { categories } = product;
      categories.forEach((category) => {
        if (!sortedProducts[category.id]) {
          sortedProducts[category.id] = [];
        }
        sortedProducts[category.id].push(product);
      });
    });
    return sortedProducts;
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setProducts(productsByCategory[categoryId]);
  };

  const handleSelectChange = (selectedSort) => {
    setActiceSort(selectedSort);
  };

  const visibleProducts = useMemo(() => {
    if (activeSort) {
      return [...products].sort(sortFunctions[activeSort]);
    }

    return products;
  }, [activeSort, products]);

  return {
    activeCategory,
    categories,
    handleCategoryClick,
    handleSelectChange,
    products,
    setProducts,
    visibleProducts,
    toggleMenu,
    isMenuOpen
  };
};

export default useShopData;