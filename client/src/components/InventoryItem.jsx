import { useState } from "react";

const InventoryItem = (props) => {
  const { product } = props;
  console.log("product", product);
  const [quantity, setQuantity] = useState("");
  console.log("quantity", quantity);

  async function handleUpdateProduct(e) {
    e.preventDefault();
    console.log("CLICK!");
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

  return (
    <div key={product.product_id} className="inventories">
      <p>Inventory ID: {product.inventory_id}</p>
      <p>Product: {product.product_name}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <form
        onSubmit={(e) => {
          handleUpdateProduct(
            e
            // product_id,
            // product_name,
            // price,
            // description,
            // category
          );
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
        value={product.product_id}
        onClick={(e) => {
          handledelete(e, product.product_id, product.inventory_id);
        }}
      >
        delete {product.product_name}?
      </button>
    </div>
  );
};

export default InventoryItem;
