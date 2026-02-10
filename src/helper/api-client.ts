import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { DataBaseUrl } from "../constants/base-url";

// Defining Axios defaults
axios.defaults.baseURL = DataBaseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

// Intercepting requests to add the Authorization header
axios.interceptors.request.use(
    (config: any) => {
        const state = store.getState();
        const accessToken = state.user.accessToken;

        // Do not add Authorization header for login/register endpoints
        if (
            accessToken &&
            !config.url?.includes("/auth/login") &&
            !config.url?.includes("/auth/register")
        ) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Function to set Authorization header
const setAuthorization = (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Intercepting to capture errors and handle token refresh
axios.interceptors.response.use(
    (response) => response?.data,
    async (error: any) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            toast.warning("Session timed out, please login and try again", { autoClose: 2000 });
            localStorage.clear();
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);

class APIClient {
    get = async <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
        const queryString = params
            ? Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent((params as any)[key])}`)
                .join("&")
            : "";
        // Ensure the path part is properly encoded but leave already-encoded sequences alone
        // encodeURI preserves valid URI characters like :// and /, while encoding spaces and others
        const encodedPath = encodeURI(url);
        const fullUrl = `${encodedPath}${queryString ? `?${queryString}` : ""}`;
        try {
            const result = await axios.get(fullUrl);
            return result as unknown as T;
        } catch (error: any) {
            // Attach more context for easier debugging upstream
            const status = error?.response?.status;
            const data = error?.response?.data;
            console.error("API GET Error", { url: fullUrl, status, data, message: error?.message });
            // Throw an Error with useful debug information attached
            const message = data?.Message || data?.message || error?.message || "Unknown error occurred";
            const err: any = new Error(`${message}`);
            err.status = status;
            err.data = data;
            throw err;
        }
    };

    create = async <T = any>(url: string, data: any): Promise<T> => {
        try {
            const response = await axios.post(url, data);
            return response as unknown as T;
        } catch (error: any) {
            const status = error?.response?.status;
            const respData = error?.response?.data;
            const message = respData?.Message || respData?.message || error.message || "Unknown error occurred";
            console.error("API Client Create Error:", { url, status, data: respData, message: error?.message });
            const err: any = new Error(message);
            err.status = status;
            err.data = respData;
            throw err;
        }
    };

    update = async <T = any>(url: string, data: any): Promise<T> => {
        const response = await axios.patch(url, data);
        return response as unknown as T;
    };

    put = async <T = any>(url: string, data: any): Promise<T> => {
        const response = await axios.put(url, data);
        return response as unknown as T;
    };

    delete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await axios.delete(url, config);
        return response as unknown as T;
    };
}

export { APIClient, setAuthorization };
