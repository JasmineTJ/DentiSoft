import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const EditItem = ({ item, handleUpdate, handleClose, refreshItems }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const equipmentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    supplier: yup.string().required("Supplier is required"),
    manufacturer: yup.string().required("Manufacturer is required"),
    description: yup.string().required("Description is required"),
  });

  const initialValues = {
    name: item ? item['Item Name'] : "",
    supplier: item ? item.Supplier : "",
    manufacturer: item ? item.Manufacturer : "",
    description: item ? item.Description : "",
  };
  
const handleFormSubmit = async (values) => {
  const { name, supplier, manufacturer, description } = values;
  
  try {
    // Convert the Item ID to an integer
    const itemId = parseInt(item['Item ID'], 10);

    const response = await axios.put(`http://localhost:3001/admin/items/${itemId}`, {
      Name: name,
      Supplier: supplier,
      Manufacturer: manufacturer,
      Description: description
    });

    if (response.data.message) {
      alert(response.data.message);
    }

    handleUpdate(response.data.item);
    refreshItems();
  } catch (error) {
    console.error("An error occurred while updating item:", error);
    if (error.response && error.response.data && error.response.data.error) {
      alert(`Server error: ${error.response.data.error}`);
    } else {
      alert(`An error occurred while updating item: ${error.message}`);
    }
  }
};
    
  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        validationSchema={equipmentSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                sx={{ gridColumn: "span 2" }}
                fullWidth
                variant="filled"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                sx={{ gridColumn: "span 2" }}
                fullWidth
                variant="filled"
                label="Supplier"
                name="supplier"
                value={values.supplier}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.supplier && !!errors.supplier}
                helperText={touched.supplier && errors.supplier}
              />
              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={4}
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                sx={{ gridColumn: "span 4" }}
                fullWidth
                variant="filled"
                label="Manufacturer"
                name="manufacturer"
                value={values.manufacturer}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.manufacturer && !!errors.manufacturer}
                helperText={touched.manufacturer && errors.manufacturer}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                Apply
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditItem;
