import axios from "axios";

export async function fetchCompanies() {
  try {
    const response = await axios.get("/companies.json");
    return response.data;
  } catch (error) {
    throw new Error("Failed to load companies");
  }
}
