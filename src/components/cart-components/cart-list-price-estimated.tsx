import React, { useState, useEffect } from "react";
import { CartItem } from "./cart-item";
import { Stack, Box, Divider, Typography, Checkbox } from "@mui/material";
import { GetListResponse, useTranslate } from "@pankod/refine-core";
import { IOrder } from "interfaces";
import { List } from "components/crud/list";

type CartListPriceEstimatedProps = {
  response?: GetListResponse<IOrder>;
  onDelete?: () => any;
};

export const CartListPriceEstimated: React.FC<CartListPriceEstimatedProps> = ({
  response,
  onDelete,
}) => {
  const t = useTranslate();
  const [checked, setChecked] = useState<boolean[] | undefined>();

  const handleSelectionChange = (idx: number, c: boolean) => {
    const temp: boolean[] = [...(checked as boolean[])];
    temp[idx] = c;
    setChecked(temp as boolean[]);
  };

  const handleAllSelectionChange = (c: boolean) => {
    const temp: boolean[] = [...(checked as boolean[])];
    temp.fill(c);
    setChecked(temp as boolean[]);
  };

  useEffect(() => {
    // console.log(checked);
    if (response) {
      if (response.total > 0) {
        setChecked(Array(response.total).fill(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  console.log(checked);

  return (
    <List title="Queued Order">
      <Stack display="flex" direction="row">
        {/* <Checkbox checked={checked[0]} onChange={handleChange2} /> */}
        <Checkbox
          checked={checked ? checked.every((x) => x) : false}
          indeterminate={
            checked ? checked.some((x) => x) && !checked.every((x) => x) : false
          }
          onChange={(_, c) => {
            handleAllSelectionChange(c);
          }}
        />
        <Typography variant="h6" width="55%">
          {t("orders.fields.product")}
        </Typography>
        <Typography variant="h6" width="15%">
          {t("orders.fields.price")}
        </Typography>
        <Typography variant="h6" width="15%">
          {t("orders.fields.quantity")}
        </Typography>
        <Typography variant="h6" width="15%">
          {t("table.actions")}
        </Typography>
      </Stack>
      <Divider
        flexItem
        sx={{
          borderWidth: "1px",
          width: "100%",
          borderColor: "primary.main",
        }}
      />
      <Box paddingTop="12px">
        {response !== undefined && response.total > 0 ? (
          <Stack
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {response?.data.map((item: IOrder, idx: number) => {
              return (
                <CartItem
                  checked={checked !== undefined ? checked[idx] : false}
                  key={item.id}
                  onSelect={(_, checked) => handleSelectionChange(idx, checked)}
                  onDelete={onDelete}
                  item={item}
                ></CartItem>
              );
            })}
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "middle",
              height: "calc(100vh - (340px))",
            }}
          >
            Cart is empty
          </Box>
        )}
      </Box>
    </List>
  );
};
