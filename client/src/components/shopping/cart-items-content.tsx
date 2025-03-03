import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  CartProduct,
  deleteCartItem,
  updateCartQuantity,
} from "../../store/shop/cart-slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";

function UserCartItemsContent({ cartItem }: { cartItem: CartProduct }) {
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.shopCart);
  const { productList } = useAppSelector((state) => state.shopProduct);
  const dispatch = useAppDispatch();

  function handleUpdateQuantity(
    getCartItem: CartProduct,
    typeOfAction: "plus" | "minus"
  ) {
    if (typeOfAction == "plus") {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        console.log(productList);

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > Number(getTotalStock)) {
            toast.error(
              `Only ${getQuantity} quantity can be added for this item`
            );

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id ?? "",
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.error("Cart item is updated successfully");
      }
    });
  }

  function handleCartItemDelete(getCartItem: CartProduct) {
    dispatch(
      deleteCartItem({
        userId: user?.id ?? "",
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.error("Cart item is deleted successfully");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (Number(cartItem?.salePrice) > 0
              ? Number(cartItem?.salePrice)
              : Number(cartItem?.price)) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
