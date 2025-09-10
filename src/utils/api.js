const API_BASE_URL = "http://127.0.0.1:5050";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("idToken");
  console.log(
    "Retrieved token from localStorage:",
    token ? `${token.substring(0, 20)}...` : "No token found"
  );

  if (!token) {
    console.warn("No idToken found in localStorage");
    return {
      "Content-Type": "application/json",
    };
  }

  // Check if token is expired (basic check - you might want to decode and check exp)
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Generic API call function with retry mechanism
const apiCall = async (endpoint, options = {}, retryCount = 0) => {
  const maxRetries = 2;

  try {
    // Check if token is expired before making the call
    if (!isAuthenticated()) {
      console.warn("Token is expired or invalid, redirecting to login");
      // Clear expired auth data
      clearAuth();
      // Redirect to login (you might want to use a router hook here)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Authentication required");
    }

    const headers = getAuthHeaders();
    console.log(
      `Making API call to: ${API_BASE_URL}${endpoint} (attempt ${
        retryCount + 1
      })`
    );
    console.log("Headers:", headers);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        `API call failed with status ${response.status}:`,
        errorData
      );

      // If we get a 401, clear the auth data and redirect
      if (response.status === 401) {
        console.warn("Received 401, clearing auth data");
        clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `API call to ${endpoint} failed (attempt ${retryCount + 1}):`,
      error
    );

    // Handle specific error types
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      // This usually indicates CORS or network issues
      console.warn(
        `CORS or network error for ${endpoint}. This might be due to:`
      );
      console.warn("1. Backend server not running");
      console.warn("2. CORS not configured properly");
      console.warn("3. Network connectivity issues");

      // Retry logic for network issues
      if (retryCount < maxRetries) {
        console.log(`Retrying API call to ${endpoint} in 1 second...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return apiCall(endpoint, options, retryCount + 1);
      }
    }

    throw error;
  }
};

// Authentication API calls - Updated to match backend
export const authAPI = {
  login: async (email, password) => {
    return apiCall("/users/owners/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiCall("/users/owners/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    // Backend doesn't have logout endpoint, just clear local storage
    localStorage.removeItem("idToken");
    localStorage.removeItem("user");
    return { message: "Logged out successfully" };
  },

  refreshToken: async () => {
    // Backend doesn't have refresh endpoint yet
    throw new Error("Token refresh not implemented");
  },
};

// Restaurant API calls - Updated to match backend
export const restaurantAPI = {
  getAll: async () => {
    // Backend has /restaurants/owned for authenticated users
    return apiCall("/restaurants/owned");
  },

  getById: async (id) => {
    const response = await apiCall(`/restaurants/${id}`);
    // Backend returns { restaurant: {...} }
    return response.restaurant || response;
  },

  create: async (restaurantData) => {
    return apiCall("/restaurants/add", {
      method: "POST",
      body: JSON.stringify(restaurantData),
    });
  },

  update: async (id, restaurantData) => {
    // Backend doesn't have update endpoint yet
    throw new Error("Restaurant update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete endpoint yet
    throw new Error("Restaurant delete not implemented");
  },

  // Debug endpoint for development
  debug: async () => {
    return apiCall("/restaurants/debug");
  },
};

// Menu API calls - Updated to match backend
export const menuAPI = {
  getAll: async () => {
    // Backend doesn't have get all menus endpoint
    throw new Error("Get all menus not implemented");
  },

  getByRestaurant: async (restaurantId) => {
    const response = await apiCall(`/menus/${restaurantId}/menu`);
    // Backend returns { success: true, menus: [...] }
    if (response.success) {
      return response.menus;
    }
    throw new Error(response.error || "Failed to fetch menu");
  },

  create: async (menuData) => {
    return apiCall("/menus/add/menu", {
      method: "POST",
      body: JSON.stringify(menuData),
    });
  },

  update: async (id, menuData) => {
    // Backend doesn't have update endpoint yet
    throw new Error("Menu update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete endpoint yet
    throw new Error("Menu delete not implemented");
  },

  getWithDishes: async (menuId) => {
    return apiCall(`/menus/dishes/${menuId}`);
  },
};

// AI Management API calls
export const aiAPI = {
  // Get all AIs for a restaurant
  getAIs: async (restaurantId) => {
    try {
      const response = await apiCall(`/ai/list?restaurantID=${restaurantId}`);
      return response.ais || [];
    } catch (error) {
      console.error("Failed to get AIs:", error);
      throw error;
    }
  },

  // Add new AI
  addAI: async (aiData) => {
    try {
      const response = await apiCall("/ai/add/ai", {
        method: "POST",
        body: JSON.stringify(aiData),
      });
      return response;
    } catch (error) {
      console.error("Failed to add AI:", error);
      throw error;
    }
  },

  // Start AI detection
  startDetection: async (restaurantId, aiId) => {
    try {
      const response = await apiCall("/ai/start", {
        method: "POST",
        body: JSON.stringify({
          restaurantID: restaurantId,
          aiID: aiId,
        }),
      });
      return response;
    } catch (error) {
      console.error("Failed to start AI detection:", error);
      throw error;
    }
  },

  // Test YOLO with live camera
  testCameraDetection: async (restaurantId, cameraIndex = "0") => {
    try {
      const response = await apiCall("/ai/test-camera", {
        method: "POST",
        body: JSON.stringify({
          restaurantID: restaurantId,
          cameraIndex: cameraIndex,
        }),
      });
      return response;
    } catch (error) {
      console.error("Failed to test camera detection:", error);
      throw error;
    }
  },

  // Start camera detection (simple GET endpoint)
  startCameraDetection: async (restaurantId) => {
    try {
      const response = await apiCall(`/ai/start-camera/${restaurantId}`);
      return response;
    } catch (error) {
      console.error("Failed to start camera detection:", error);
      throw error;
    }
  },

  // Stop AI detection
  stopDetection: async (aiId) => {
    try {
      const response = await apiCall(`/ai/stop/${aiId}`, {
        method: "POST",
      });
      return response;
    } catch (error) {
      console.error("Failed to stop AI detection:", error);
      throw error;
    }
  },

  // Get latest detection data
  getLatestDetection: async (restaurantId) => {
    try {
      const response = await apiCall(`/ai/latest/${restaurantId}`);
      return response;
    } catch (error) {
      console.error("Failed to get latest detection:", error);
      // Return fallback data if backend fails
      return {
        chairs: {
          chair_1: "occupied",
          chair_2: "vacant",
          chair_3: "occupied",
          chair_4: "vacant",
        },
        tables: {
          table_1: "occupied",
          table_2: "occupied",
          table_3: "vacant",
          table_4: "occupied",
        },
        time: new Date().toISOString(),
      };
    }
  },

  // Get table status for a restaurant
  getTableStatus: async (restaurantId) => {
    try {
      const response = await apiCall(`/ai/latest/${restaurantId}`);
      return response;
    } catch (error) {
      console.error("Failed to get table status:", error);
      // Return fallback data if backend fails
      return {
        cameraStatus: "Online",
        lastUpdate: "5 seconds ago",
        aiConfidence: 96.2,
        tableStatus: [
          {
            id: 1,
            status: "occupied",
            seats: 4,
            occupiedSeats: 4,
            timeOccupied: "45 min",
          },
          {
            id: 2,
            status: "vacant",
            seats: 6,
            occupiedSeats: 0,
            timeOccupied: "0 min",
          },
        ],
      };
    }
  },

  // Update detection data
  updateDetection: async () => {
    try {
      const response = await apiCall("/ai/update", {
        method: "POST",
      });
      return response;
    } catch (error) {
      console.error("Failed to update detection:", error);
      throw error;
    }
  },

  // Switch camera
  switchCamera: async (aiId, direction) => {
    try {
      const response = await apiCall(`/ai/${direction}/${aiId}`, {
        method: "POST",
      });
      return response;
    } catch (error) {
      console.error("Failed to switch camera:", error);
      throw error;
    }
  },

  // Get video feed URL
  getVideoFeedUrl: (aiId) => {
    return `${API_BASE_URL}/ai/video_feed/${aiId}`;
  },

  // Update AI settings
  updateAI: async (aiId, aiData) => {
    try {
      const response = await apiCall(`/ai/update/${aiId}`, {
        method: "PUT",
        body: JSON.stringify(aiData),
      });
      return response;
    } catch (error) {
      console.error("Failed to update AI:", error);
      throw error;
    }
  },

  // Delete AI
  deleteAI: async (aiId) => {
    try {
      const response = await apiCall(`/ai/delete/${aiId}`, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      console.error("Failed to delete AI:", error);
      throw error;
    }
  },
};

// Reservations API calls - Updated to match backend
export const reservationsAPI = {
  // Get pending reservations for a restaurant
  getPending: async (restaurantId) => {
    try {
      const response = await apiCall(`/reservations/${restaurantId}/pending`);
      return response.pending_reservations || [];
    } catch (error) {
      console.error("Failed to get pending reservations:", error);
      throw error;
    }
  },

  // Get confirmed reservations for a restaurant
  getConfirmed: async (restaurantId) => {
    try {
      const response = await apiCall(`/reservations/${restaurantId}/confirmed`);
      return response.confirmed_reservations || [];
    } catch (error) {
      console.error("Failed to get confirmed reservations:", error);
      throw error;
    }
  },

  // Get rejected reservations for a restaurant
  getRejected: async (restaurantId) => {
    try {
      const response = await apiCall(`/reservations/${restaurantId}/rejected`);
      return response.rejected_reservations || [];
    } catch (error) {
      console.error("Failed to get rejected reservations:", error);
      throw error;
    }
  },

  // Get all reservations for a restaurant
  getAll: async (restaurantId) => {
    try {
      const response = await apiCall(`/reservations/${restaurantId}`);
      return response.reservations || [];
    } catch (error) {
      console.error("Failed to get all reservations:", error);
      throw error;
    }
  },

  // Accept a reservation
  accept: async (reservationId) => {
    try {
      const response = await apiCall(`/reservations/${reservationId}/accept`, {
        method: "PUT",
      });
      return response;
    } catch (error) {
      console.error("Failed to accept reservation:", error);
      throw error;
    }
  },

  // Reject a reservation
  reject: async (reservationId) => {
    try {
      const response = await apiCall(`/reservations/${reservationId}/reject`, {
        method: "PUT",
      });
      return response;
    } catch (error) {
      console.error("Failed to reject reservation:", error);
      throw error;
    }
  },

  // Create a new reservation (for patrons)
  create: async (reservationData) => {
    try {
      const response = await apiCall("/reservations/create/reservation", {
        method: "POST",
        body: JSON.stringify(reservationData),
      });
      return response;
    } catch (error) {
      console.error("Failed to create reservation:", error);
      throw error;
    }
  },

  // Get patron's reservations
  getPatronReservations: async (patronId) => {
    try {
      const response = await apiCall(`/reservations/patrons/${patronId}`);
      return response;
    } catch (error) {
      console.error("Failed to get patron reservations:", error);
      throw error;
    }
  },
};

// Staff Management API calls - Updated to match backend
export const staffAPI = {
  getAll: async () => {
    // Backend doesn't have get all users endpoint
    throw new Error("Get all users not implemented");
  },

  getByRestaurant: async (restaurantId) => {
    try {
      // Try to get staff from backend first
      const response = await apiCall(
        `/users/staffs?restaurantID=${restaurantId}`
      );
      if (response && Array.isArray(response)) {
        return response.map((staff) => ({
          id: staff.id,
          name: `${staff.firstname} ${staff.lastname}`.trim(),
          role: staff.position,
          email: staff.email,
          status: "active", // Backend doesn't have status field yet
          lastLogin: staff.lastLogin || "Never",
        }));
      }
      return [];
    } catch (error) {
      console.warn(
        "Failed to fetch staff from backend, using mock data:",
        error
      );
      // Fallback to mock data if backend call fails
      return [
        {
          id: 1,
          name: "Juan Dela Cruz",
          role: "Chef",
          email: "juan@pizzanapoleon.com",
          status: "active",
        },
        {
          id: 2,
          name: "Ana Rodriguez",
          role: "Cashier",
          email: "ana@pizzanapoleon.com",
          status: "active",
        },
      ];
    }
  },

  create: async (staffData) => {
    try {
      const response = await apiCall("/users/staffs/signup", {
        method: "POST",
        body: JSON.stringify(staffData),
      });
      return response;
    } catch (error) {
      console.error("Failed to create staff member:", error);
      throw error;
    }
  },

  update: async (id, staffData) => {
    // Backend doesn't have update user endpoint yet
    throw new Error("Staff update not implemented");
  },

  delete: async (id) => {
    // Backend doesn't have delete user endpoint yet
    throw new Error("Staff delete not implemented");
  },

  changePassword: async (id, passwordData) => {
    // Backend doesn't have change password endpoint yet
    throw new Error("Password change not implemented");
  },
};

// Utility functions
export const isAuthenticated = () => {
  const token = localStorage.getItem("idToken");
  if (!token) return false;

  try {
    // Basic JWT expiration check (decode without verification for expiration only)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn("Token is expired, clearing auth data");
      clearAuth();
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    clearAuth();
    return false;
  }
};

export const getCurrentUser = () => {
  // Try both possible localStorage keys for user data
  const user =
    localStorage.getItem("currentUser") || localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("user");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isAuthenticated");
};

export default {
  auth: authAPI,
  restaurants: restaurantAPI,
  menus: menuAPI,
  ai: aiAPI,
  staff: staffAPI,
  reservations: reservationsAPI,
  utils: {
    isAuthenticated,
    getCurrentUser,
    clearAuth,
  },
};
