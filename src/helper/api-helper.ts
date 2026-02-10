/**
 * API Helper Functions
 * 
 * This file contains helper functions for API interactions.
 * Add specific helper methods as needed for data transformations,
 * formatting, or other API-related utilities.
 */

// Placeholder for future API helper functions
export const formatApiError = (error: any): string => {
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }
    if (error?.message) {
        return error.message;
    }
    return "An unexpected error occurred";
};

export const buildQueryString = (params: Record<string, any>): string => {
    return Object.keys(params)
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
};
