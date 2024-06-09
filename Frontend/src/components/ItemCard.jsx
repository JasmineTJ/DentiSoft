import React from "react";
import { Box, useTheme, Stack, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import NumbersIcon from "@mui/icons-material/Numbers";
import FactoryIcon from "@mui/icons-material/Factory";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DeleteIcon from "@mui/icons-material/Delete";
import EditItemPopUp from "./EditItemPopUp";
import RemoveIcon from "@mui/icons-material/Remove";
import PurchaseItemPopUp from "./PurchaseItemPopUp";
import ItemHistoryPopUp from "./ItemHistoryPopUp";
import axios from "axios";

const ItemCard = ({ item, handleUpdate, refreshItems }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorStyle =
    theme.palette.mode === "dark"
      ? `${colors.blueAccent[700]}`
      : "hsla(0,0%,82%,.3)";
  const shadowBorderColor = theme.palette.mode === "dark" ? "#868dfb" : "black";

  const handleDecrement = async (itemId) => {
    try {
      await axios.patch('http://localhost:3001/admin/items', { itemId });
      alert('Item quantity decremented successfully.');
      refreshItems(); // Refresh the items
    } catch (error) {
      console.error('An error occurred while decrementing item quantity:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred while decrementing item quantity.');
      }
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/admin/items/${itemId}`, { data: { itemId } });
      alert('Item deleted successfully.');
      refreshItems(); // Refresh the items
    } catch (error) {
      console.error('An error occurred while deleting the item:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred while deleting the item.');
      }
    }
  };

  return (
    <Box
      sx={{
        minWidth: "450px",
        maxWidth: "30vw",
        width: "25vw",
        height: "80vh",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colorStyle,
        p: "3% 4% 4% 4%",
        boxShadow: `1px 1px 15px ${shadowBorderColor}`,
        borderRadius: "10px",
        ":hover": {
          transition: "all .3s ease-out",
          transform: "translateY(-10px)",
        },
      }}
    >
      <Stack spacing={2} mb={4}>
        <Typography variant="h4" fontWeight={"bold"}>
          {item['Item Name']}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "start",
            height: "6vh",
          }}
        >
          {item.Description}
        </Typography>
        <Stack flexDirection={"row"} gap={2}>
          <NumbersIcon />
          <Typography variant="h4"> {item['Item ID']}</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <WarehouseIcon />
          <Typography sx={{ display: "flex", alignItems: "start" }}>
            Quantity: {item.Quantity}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} mb={4}>
        <Stack flexDirection={"row"} gap={2}>
          <LocalAtmIcon />
          <Typography>Cost: {item.Cost}</Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <GroupsIcon />
          <Typography sx={{ display: "flex", alignItems: "start" }}>
            Supplier: {item.Supplier}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <FactoryIcon /> Manufacturer: {item.Manufacturer}
          <Typography
            sx={{ display: "flex", alignItems: "start" }}
          ></Typography>
        </Stack>
      </Stack>
      <Stack mt={"-3%"}>
        <Stack display={"flex"} flexDirection={"row"} gap={2}>
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              pr: "2%",
            }}
            onClick={() => {
              handleDelete(item['Item ID']);
            }}
          ></Button>
          <Button
            startIcon={<RemoveIcon />}
            color="error"
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              pr: "2%",
            }}
            onClick={() => {
              handleDecrement(item['Item ID']);
            }}
          ></Button>

          <PurchaseItemPopUp itemId={item['Item ID']} />
          <EditItemPopUp item={item} handleUpdate={handleUpdate} refreshItems={refreshItems} />
          <ItemHistoryPopUp itemId={item['Item ID']} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ItemCard;
