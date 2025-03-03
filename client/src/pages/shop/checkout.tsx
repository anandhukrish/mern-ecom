import Address from "../../components/shopping/address";
// import img from "../../assets/account.jpg";
import UserCartItemsContent from "../../components/shopping/cart-items-content";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { createNewOrder } from "../../store/shop/order-slice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { Address as AddressType } from "../../store/shop/address-slice";

function ShoppingCheckout() {
  const { cartItems } = useAppSelector((state) => state.shopCart);
  const { user } = useAppSelector((state) => state.auth);
  const { approvalURL } = useAppSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState<AddressType | null>(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useAppDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (Number(currentItem?.salePrice) > 0
              ? Number(currentItem?.salePrice)
              : Number(currentItem?.price)) *
              Number(currentItem?.quantity),
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (Object.keys(cartItems).length === 0) {
      toast("Your cart is empty. Please add items to proceed");

      return;
    }
    if (currentSelectedAddress === null) {
      toast("Please select one address to proceed.");

      return;
    }

    const orderData = {
      userId: user?.id ?? "",
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          Number(singleCartItem?.salePrice) > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={undefined}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress!}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.productId} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
