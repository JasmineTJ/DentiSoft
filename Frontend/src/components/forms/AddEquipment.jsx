import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';

const AddEquipmentForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const equipmentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    supplier: yup.string().required("Supplier is required"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number"),
    manufacturer: yup.string().required("Manufacturer is required"),
    purchaseDate: yup.date().required("Purchase date is required"),
    cost: yup
      .number()
      .required("Cost is required")
      .positive("Cost must be a positive number"),
    description: yup.string().required("Description is required"),
  });

  const initialValues = {
    name: "",
    supplier: "",
    quantity: "",
    manufacturer: "",
    purchaseDate: "",
    cost: "",
    description: "",
  };

  const handleFormSubmit = async (values) => {
    try {
      const itemValues = {
        Name: values.name,
        Supplier: values.supplier,
        Manufacturer: values.manufacturer,
        Description: values.description,
        Quantity: Number(values.quantity),
        PurchaseDate: values.purchaseDate,
        Cost: Number(values.cost),
      };
      await axios.post('http://localhost:3001/admin/items', itemValues);
      alert('Item and associated purchase details created successfully.');
    } catch (error) {
      console.error('An error occurred while creating item and purchase details:', error);
      alert('An error occurred while creating item and purchase details.');
    }
  };
  
  return (
    <Box m="20px">
      <Header
        title="Add Equipment"
        subtitle={"Add Equipment Info for Inventory"}
      />

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
                fullWidth
                variant="filled"
                label="Quantity"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
              />
              <TextField
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
              <TextField
                fullWidth
                variant="filled"
                label="Purchase Date"
                type="date"
                name="purchaseDate"
                value={values.purchaseDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.purchaseDate && !!errors.purchaseDate}
                helperText={touched.purchaseDate && errors.purchaseDate}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Cost"
                type="number"
                name="cost"
                value={values.cost}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cost && !!errors.cost}
                helperText={touched.cost && errors.cost}
              />{" "}
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                Add Equipment
              </Button>{" "}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEquipmentForm;
