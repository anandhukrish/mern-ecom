import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type FormDataType = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: string;
  type?: string;
  options?: Options[];
  id?: string;
};

type Options = Record<string, string>;
type FormValue = string | number | undefined | null;

type CommonForm<T extends Record<string, FormValue>> = {
  formData: T;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formControls: FormDataType[];
  setFormData: Dispatch<SetStateAction<T>>;
  buttonText?: string;
  isBtnDisabled?: boolean;
};
const CommonForm = <T extends Record<string, FormValue>>({
  formData,
  onSubmit,
  formControls,
  setFormData,
  buttonText,
  isBtnDisabled,
}: CommonForm<T>) => {
  const renderInputsByComponentType = (getControlItem: FormDataType) => {
    let element: null | React.ReactElement = null;
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={typeof value === "string" ? value : ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
export default CommonForm;
