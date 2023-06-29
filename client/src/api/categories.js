export async function fetchAllCategories() {
  try {
    const response = await fetch("/api/categories");
    const result = await response.json();
    console.log("result in fetch all categories", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
