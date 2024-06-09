import { mockEquipmentData } from "../../data/mockData";
import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Header from "../../components/Header";
import ItemCard from "../ItemCard";
import axios from "axios";

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [items, setItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpdate = async (updatedItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    
    setItems(updatedItems);
    setIsPopupOpen(false);
  };

  const handleDelete = React.useCallback(
    (id) => {
      setTimeout(() => {
        setItems((items) =>
          items.filter((item) => item['Item ID'] !== id)
        );
      });
    },
    [setItems]
  );

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box m="30px">
      <Header title="Equipment" subtitle={"Manage Your Inventory Items"} />
      <Stack
        gap={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentItems.map((item, index) => (
          <ItemCard key={index} item={item} handleDelete={handleDelete} handleUpdate={handleUpdate} refreshItems={fetchItems} />
        ))}
      </Stack>{" "}
      <Stack mt={"100px"} alignItems={"center"}>
        {items.length > itemsPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(items.length / itemsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />        
        )}
      </Stack>
    </Box>
  );
};

export default Inventory;
