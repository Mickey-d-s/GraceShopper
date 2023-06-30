export async function fetchAllInventories() {
  try {
    const response = await fetch("/api/inventories");
    const result = await response.json();
    console.log("result in fetch all inventories", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
