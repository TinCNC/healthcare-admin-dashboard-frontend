import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  useOne,
  DeleteOneResponse,
  BaseRecord,
} from "@pankod/refine-core";

import {
  EditButton,
  ShowButton,
  DateField,
  Checkbox,
} from "@pankod/refine-mui";

import { Stack, Typography, styled } from "@mui/material";

import { I3DObject, IMaterial, IOrder } from "interfaces";
import { DeleteButton } from "components/buttons/delete";

import { Token } from "@mui/icons-material";

type CartItemProps = {
  item?: IOrder;
  onSelect?:
    | ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  checked?: boolean;
  onDelete?: ((value: DeleteOneResponse<BaseRecord>) => void) | undefined;
};

const CartImg = styled("img")(({ theme }) => ({
  height: 192,
  width: 192,
}));

// export interface IOrder {
//   id: number;
//   product_id: number;
//   laboratory: number;
//   material: number;
//   delivery_time: number;
//   status: "Not Send" | "Pending" | "Printed" | "Product Arrived";
//   quantity: number;
//   created_at: string;
// }

type CartInfoDisplayComponentProps = {
  label: any;
  isDate?: boolean;
  children: any;
};

const CartInfoDisplayComponent: React.FC<CartInfoDisplayComponentProps> = ({
  label,
  isDate = false,
  children,
}) => {
  return (
    <Stack direction="row">
      <Typography paddingRight="4px" variant="subtitle1">
        {label}:
      </Typography>
      {!isDate ? (
        <Typography variant="subtitle1">{children}</Typography>
      ) : (
        <DateField variant="subtitle1" format="LLL" value={children} />
      )}
    </Stack>
  );
};

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onSelect,
  checked,
  onDelete,
}) => {
  const t = useTranslate();
  const { data: cartItemInfo, isLoading: cartItemInfoLoading } =
    useOne<I3DObject>({
      resource: "3d_objects",
      id: item?.object_id || "",
      queryOptions: {
        enabled: !!item?.object_id,
      },
    });

  const { data: laboratoryInfo, isLoading: laboratoryInfoLoading } =
    useOne<I3DObject>({
      resource: "laboratories",
      id: item?.laboratory || "",
      queryOptions: {
        enabled: !!item?.object_id,
      },
    });

  const { data: materialInfo, isLoading: materialInfoLoading } =
    useOne<IMaterial>({
      resource: "materials",
      id: item?.material || "",
      queryOptions: {
        enabled: !!item?.object_id,
      },
    });
  return (
    <Stack display="flex" direction="row">
      <Stack direction="row" gap={2}>
        <Checkbox checked={checked} onChange={onSelect}></Checkbox>
      </Stack>
      <Stack width="55%" direction="row" gap={2}>
        <CartImg
          src={
            cartItemInfo?.data?.cover ||
            "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
          }
        />
        <Stack>
          <CartInfoDisplayComponent label={t("orders.fields.name")}>
            {cartItemInfo?.data.name}
          </CartInfoDisplayComponent>
          <CartInfoDisplayComponent label={t("orders.fields.laboratory")}>
            {laboratoryInfo?.data.name}
          </CartInfoDisplayComponent>
          <CartInfoDisplayComponent label={t("orders.fields.material")}>
            {materialInfo?.data.material_name}
          </CartInfoDisplayComponent>
          <CartInfoDisplayComponent label={t("orders.fields.delivery_time")}>
            {item?.delivery_time}
          </CartInfoDisplayComponent>
          <CartInfoDisplayComponent label={t("orders.fields.status")}>
            {item?.status}
          </CartInfoDisplayComponent>
          <CartInfoDisplayComponent label={t("3d_objects.fields.size")}>
            {cartItemInfo?.data.size_x_mm}x{cartItemInfo?.data.size_y_mm}x
            {cartItemInfo?.data.size_z_mm}
          </CartInfoDisplayComponent>
        </Stack>
      </Stack>
      <Stack width="15%">{item?.manufacturing_cost || "TBA"}</Stack>
      <Stack width="15%">{item?.quantity}</Stack>
      <Stack width="15%">
        <Stack direction="row" spacing={1}>
          <ShowButton
            size="small"
            resourceNameOrRouteName="3d_objects"
            hideText
            recordItemId={item?.id}
          />
          <EditButton size="small" hideText recordItemId={item?.id} />
          <DeleteButton
            onSuccess={onDelete}
            size="small"
            hideText
            recordItemId={item?.id}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
