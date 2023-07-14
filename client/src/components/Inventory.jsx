import { useState, useEffect } from "react";

// // import { useNavigate } from "react-router-dom";
import {
  deleteProducts,
  fetchAllInventories,
  createProduct,
  updateProductQuantity,
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
  const [updatedQuantity, setUpdatedQuantity] = useState("");

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
      return addedinventoryfromDB;
    } catch (error) {
      throw error;
    }
  }

  async function handleUpdateQuantity(productID) {
    const newQuantity = setUpdatedQuantity[productID];
    try {
      await updateProductQuantity(productID, newQuantity);
      const updatedProducts = products.map((product) => {
        if (product.product_id === productID) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      setProducts(updatedProducts);
      recalculateTotalQuantity(); // Recalculates total quantities
    } catch (error) {
      console.error(error);
    }
  }

  const handleQuantityChange = (productID, newQuantity) => {
    setUpdatedQuantity((prevState) => ({
      ...prevState,
      [productID]: newQuantity,
    }));
  };
  const recalculateTotalQuantity = () => {
    const updatedInventories = inventories.map((inventory) => {
      const product = products.find(
        (product) => product.inventory_id === inventory.inventory_id
      );
      if (product) {
        const productQuantity =
          updatedQuantity[product.product_id] || product.quantity;
        return { ...inventory, quantity: productQuantity };
      }
      return inventory;
    });
    setInventories(updatedInventories);
  };

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
          id="inventoryID"
          placeholder="inventoryID"
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
        const updateProductQuantity =
          updatedQuantity[product.product_id] || product.quantity;
        return (
          <div key={product.product_id} className="inventories">
            <p>Inventory ID: {product.inventory_id}</p>
            <p>Product: {product.product_name}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {totalQuantity}</p>
            <input
              type="number"
              id={`quantity_${product.product_id}`}
              placeholder={"quantity"}
              value={updatedQuantity[product.product_id] || ""}
              onChange={(e) =>
                handleQuantityChange(product.product_id, e.target.value)
              }
            />
            <button onClick={() => handleUpdateQuantity(product.product_id)}>
              Update Quantity
            </button>
            {/* <button
              value={inventory.inventory_id}
              onClick={(e) => {
                handledelete(e, inventory.inventory_id);
              }}
            >
              delete {inventory.product.product_name}?
            </button> */}
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
     