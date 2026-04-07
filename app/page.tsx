import MainSlider from "./Components/sliders-comps/MainSlider";
import CategorySlider from "./Components/sliders-comps/CategorySlider";
import CategorySliderComp from "./Components/sliders-comps/CategorySliderComp";
import { getCategories } from "./actions/categories.action";
import { getProducts } from "./actions/products.action";
import ProductsGridSystem from "./Components/products-comps/ProductsGridSystem";

export default async function Home() {

  const response = await getCategories();
  const data = response?.data;

  // const { data: products } = await getProducts();

  const productsResponse = await getProducts();
  const productsData = productsResponse.data ?? [];






  return (
    <>
      <h1 className="text-3xl text-center">Home Page</h1>

      <MainSlider />
      {/* <CategorySlider /> */}

      <div className="my-5">
        <CategorySliderComp category={data} />
      </div>


      <ProductsGridSystem products={productsData} />


    </>
  );
}
