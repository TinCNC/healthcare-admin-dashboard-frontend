import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  HttpError,
  useList,
  GetListResponse,
} from "@pankod/refine-core";
import {
  Paper,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Box,
  Stack,
  Button,
  Typography,
} from "@mui/material";

import { List } from "components/crud/list";

import { CartList } from "components/cart-components";
import { IOrder } from "interfaces";

export const OrderList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderListResponse, setOrderListResponse] =
    useState<GetListResponse<IOrder>>();
  const { refetch: refetchOrders } = useList<IOrder>({
    resource: "orders",
    config: {
      filters: [{ field: "status", operator: "eq", value: "Not Send" }],
      // pagination: { current: 1, pageSize: 10 },
    },
    // config: {
    //   filters: [
    //     { field: "username", operator: "contains", value: userNameSearch },
    //     { field: "first_name", operator: "contains", value: firstNameSearch },
    //     { field: "last_name", operator: "contains", value: lastNameSearch },
    //   ],
    //   // pagination: { current: 1, pageSize: 10 },
    // },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setOrderListResponse(data);
        }
      },
    },
  });

  const [pendingOrderListResponse, setPendingOrderListResponse] =
    useState<GetListResponse<IOrder>>();
  const { refetch: refetchPendingOrders } = useList<IOrder>({
    resource: "orders",
    config: {
      filters: [{ field: "status", operator: "eq", value: "Pending" }],
      // pagination: { current: 1, pageSize: 10 },
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setPendingOrderListResponse(data);
        }
      },
    },
  });

  const [pricedOrderListResponse, setPricedOrderListResponse] =
    useState<GetListResponse<IOrder>>();
  const { refetch: refetchPricedOrders } = useList<IOrder>({
    resource: "orders",
    config: {
      filters: [{ field: "status", operator: "eq", value: "Payment Pending" }],
      // pagination: { current: 1, pageSize: 10 },
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        setIsLoading(false);
        if (data.total > 0) {
          setPricedOrderListResponse(data);
        }
      },
    },
  });

  useEffect(() => {
    setIsLoading(true);
    setOrderListResponse(undefined);
    refetchOrders();
  }, [refetchOrders]);

  useEffect(() => {
    setIsLoading(true);
    setPendingOrderListResponse(undefined);
    refetchPendingOrders();
  }, [refetchPendingOrders]);

  useEffect(() => {
    setIsLoading(true);
    setPricedOrderListResponse(undefined);
    refetchPricedOrders();
  }, [refetchPricedOrders]);

  return (
    <Stack gap={3}>
      <CartList
        onDelete={refetchOrders}
        response={orderListResponse}
        footer={
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button>Request Order</Button>
          </Stack>
        }
      />
      <CartList
        title="Waiting for cost"
        onDelete={refetchPendingOrders}
        response={pendingOrderListResponse}
      />
      <CartList
        title="Priced Order"
        onDelete={refetchPricedOrders}
        response={pricedOrderListResponse}
        footer={
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button>Checkout using Solana Wallet</Button>
          </Stack>
        }
      />
    </Stack>
  );
};
