import { useState, useEffect, useMemo } from "react";
import woocommerceServices from "../../services/woocommerceService";
import { SORTING_OPTION } from "../../components/Selects/SortingSelects/SortingSelect";

const sortFunctions = {
  [SORTING_OPTION.PRICE_DOWN]: (a, b) => a.price - b.price,
  [SORTING_OPTION.PRICE_UP]: (a, b) => b.price - a.price,
  [SORTING_OPTION.POPULARITY]: (a, b) => b.total_sales - a.total_sales,
  [SORTING_OPTION.THE_OLDEST]: (a, b) =>
    new Date(a.date_created) - new Date(b.date_created),
  [SORTING_OPTION.THE_NEWEST]: (a, b) =>
    new Date(b.date_created) - new Date(a.date_created),
};

const useShopData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [activeSort, setActiveSort] = useState("dateCreatedNewest");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const toggleMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await woocommerceServices.getProducts();
        setProducts(data);
        setProductsByCategory(sortProductsByCategory(data));
        setIsLoadingProducts(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const data = await woocommerceServices.getProducts();
        setAllProducts(data);
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
        const allCategory = { id: "all", name: "Wszystko", slug: "all" };

        setCategories([allCategory, ...filteredCategories]);
        setIsLoadingCategories(false);
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

    if (categoryId === "all") {
      setProducts(allProducts);
    } else {
      setProducts(productsByCategory[categoryId]);
    }
  };

  const handleSelectChange = (selectedSort) => {
    setActiveSort(selectedSort);
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
    isFilterMenuOpen,
    isLoadingProducts,
    isLoadingCategories,
  };
};

export default useShopData;
