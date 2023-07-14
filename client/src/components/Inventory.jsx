import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
import {
  fetchAllInventories,
  createProduct,
  updateInventories,
  updateProducts,
  deleteProducts,
} from "../api/inventory";
import { fetchAllProducts } from "../api/menu";
import { Outlet } from "react-router-dom";

export default function allInventories() {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryID, setInventoryID] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    async function fetchInventories() {
      try {
        const fetchedInventories = await fetchAllInventories();
        setInventories(fetchedInventories);
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInventories();
  }, []);
  async function handledelete(e, inventory_id) {
    e.preventDefault();
    try {
      const deleteproductsfromDB = await deleteProducts(inventory_id);
      return deleteproductsfromDB;
    } catch (error) {
      throw error;
    }
  }
  async function handleAdd(e) {
    e.preventDefault();
    console.log(
      "LIST OF STUFF",
      product_name,
      price,
      description,
      inventoryID,
      category
    );
    try {
      const addedinventoryfromDB = await createProduct({
        product_name,
        price,
        description,
        inventory_id: inventoryID,
        category,
      });
      console.log("AddedinventoryfromDB:", addedinventoryfromDB);
      alert("Product added to Inventory!");
      return addedinventoryfromDB;
    } catch (error) {
      throw error;
    }
  }
  async function handleUpdateProduct(e) {
    e.preventDefault();
    try {
      const updatedProductfromDB = await updateProducts({
        product_id,
        product_name,
        price,
        description,
        category,
      });
      console.log("updatedproductfromdb:", updatedProductfromDB);

      return updatedProductfromDB;
    } catch (error) {
      throw error;
    }
  }
  async function handleUpdateInventories(e, product_id, quantity) {
    e.preventDefault();
    try {
      const updatedInventoryfromDB = await updateInventories({
        product_id,
        quantity,
      });
      console.log("updatedInventoryfromDB:", updatedInventoryfromDB);
      return updatedInventoryfromDB;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <h2>Inventory</h2>
      <form
        onSubmit={(e) =>
          handleAdd(e, product_name, price, description, inventoryID, category)
        }
        className="addProduct"
      >
        <label>Create New Product</label>
        <input
          type="text"
          id="product_name"
          placeholder="product name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          id="inventory_id"
          placeholder="inventory_id"
          value={inventoryID}
          onChange={(e) => setInventoryID(e.target.value)}
        />
        <input
          type="number"
          id="price"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          id="category"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      {products.map((product) => {
        const productInventories = inventories.filter(
          (inventory) => inventory.inventory_id === product.inventory_id
        );
        const totalQuantity = productInventories.reduce(
          (sum, inventory) => sum + inventory.quantity,
          0
        );
        return (
          <div key={product.product_id} className="inventories">
            <p>Inventory ID: {product.inventory_id}</p>
            <p>Product: {product.product_name}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {totalQuantity}</p>
            <form
              onSubmit={(e) => {
                handleUpdateProduct(
                  e,
                  product_id,
                  product_name,
                  price,
                  description,
                  category
                );
              }}
            >
              <input
                type="text"
                id="product_name"
                placeholder="product name"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="number"
                id="price"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                id="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                id="category"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <button type="submit">Update Product</button>
            </form>
            <form
              onSubmit={(e) => {
                handleUpdateInventories(e, quantity);
              }}
            >
              <input
                type="number"
                id="quantity"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="submit">Update Quantity</button>
            </form>
            <button
              className="shoppingButtons"
              value={product.inventory_id}
              onClick={(e) => {
                handledelete(e, product.inventory_id);
              }}
            >
              delete {product.product_name}?
            </button>
          </div>
        );
      })}
      <Outlet />
    </div>
  );
}

{
  /* <button
              value={inventory.inventory_id}
              onClick={(e) => {
                handledelete(e, inventory.inventory_id);
              }}
            >
              delete {inventory.product.product_name}?
            </button> */
}
