import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Product, ProductItem } from "../interfaces";
import ImageInput from "./ImageInput";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface WeightTabsProps {
  productItems: ProductItem[];
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  data: Product;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WeightTabs({
  productItems,
  setProduct,
}: WeightTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(productItems);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productItemId: number
  ) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        productItems: productItems.map((item) =>
          item.id === productItemId ? { ...item, [name]: value } : item
        ),
      };
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {productItems.map((productItem, index) => (
            <Tab
              label={productItem.weight + productItem.weightUnit}
              {...a11yProps(index)}
              key={index}
              sx={{ textTransform: "none" }}
            />
          ))}
        </Tabs>
      </Box>
      {productItems.map((productItem, index) => (
        <TabPanel value={value} index={index} key={index}>
          <input
            type="number"
            name="origPrice"
            placeholder="Preço Original"
            value={productItem.origPrice}
            required
            onChange={(e) => handleChange(e, productItem.id)}
          />
          <input
            type="number"
            name="salePrice"
            placeholder="Preço de Oferta"
            value={productItem.salePrice}
            required
            onChange={(e) => handleChange(e, productItem.id)}
          />
          <input
            type="number"
            name="stockQty"
            placeholder="Qtde em estoque"
            value={productItem.stockQty}
            required
            onChange={(e) => handleChange(e, productItem.id)}
          />
          {productItem.images.map((image, index) => (
            <ImageInput
              setProduct={setProduct}
              productItemId={productItem.id}
              imageId={index + 1}
              defaultImage={image.preview}
            />
          ))}
        </TabPanel>
      ))}
    </Box>
  );
}
