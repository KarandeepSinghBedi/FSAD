export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error("API Error:", error.response.data);
        alert(error.response.data.message || "An error occurred.");
    } else if (error.request) {
        // Request was made, but no response received
        console.error("Network Error:", error.request);
        alert("Network error. Please check your connection.");
    } else {
        // Something happened during setup
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
    }
};
