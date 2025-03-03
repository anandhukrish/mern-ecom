import { toast } from "sonner";
import ProductDetailsDialog from "../../components/shopping/product-details";
import ShoppingProductTile from "../../components/shopping/product-tile";
import { Input } from "../../components/ui/input";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { fetchProductDetails } from "../../store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "../../store/shop/search-slice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.shopSearch);
  const { productDetails } = useAppSelector((state) => state.shopProduct);

  const { user } = useAppSelector((state) => state.auth);

  const { cartItems } = useAppSelector((state) => state.shopCart);
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId: string, getTotalStock: number) {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (Number(getQuantity) + 1 > getTotalStock) {
          toast(`Only ${getQuantity} quantity can be added for this item`);

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id ?? "",
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id ?? ""));
        toast("Product is added to cart");
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId: string) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
