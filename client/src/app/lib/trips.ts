import api from "./axios";

export async function getTrip(id: string) {
  try {
    console.log("Fetching trip with ID:", id); // is this 'undefined'? a number? a string?

    const res = await api.get(`/trips/details/${id}`, { withCredentials: false });
    return res.data;
  } catch (error) {
    if (typeof error === "object" && error !== null && "response" in error) {
      type ErrorResponse = { response: { status: number; data: unknown } };
      const err = error as ErrorResponse;
      console.error("Backend responded with status:", err.response.status);
      console.error("Response data:", err.response.data);
    } else if (error instanceof Error) {
      console.error("Error sending request:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }

    return null;
  }
}
