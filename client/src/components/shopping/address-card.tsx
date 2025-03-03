import { Address } from "../../store/shop/address-slice";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction } from "react";

type AddressCardProps = {
  setCurrentSelectedAddress: Dispatch<SetStateAction<Address | null>>;
  selectedId: Address;
  addressInfo: Address;
  handleDeleteAddress: (addressInfo: Address) => void;
  handleEditAddress: (addressInfo: Address) => void;
};

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}: AddressCardProps) {
  return (
    <Card
      onClick={() => setCurrentSelectedAddress?.(addressInfo)}
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
