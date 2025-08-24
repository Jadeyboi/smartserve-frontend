const API_BASE_URL = "http://localhost:5050";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
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
    localStorage.removeItem("token");
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

// AI Management API calls - Updated to match backend
export const aiAPI = {
  getStatus: async () => {
    // Backend doesn't have general status endpoint
    return {
      cameraStatus: "Online",
      lastUpdate: "5 seconds ago",
      aiConfidence: 96.2,
    };
  },

  getTableStatus: async (restaurantId) => {
    // Backend doesn't have table status endpoint yet
    // Return mock data for now
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
  },

  updateTableStatus: async (restaurantId, tableData) => {
    // Backend doesn't have table status update endpoint yet
    throw new Error("Table status update not implemented");
  },

  // Backend AI endpoints
  startDetection: async () => {
    return apiCall("/ai/start", { method: "POST" });
  },

  stopDetection: async () => {
    return apiCall("/ai/stop", { method: "POST" });
  },

  getLatestDetection: async () => {
    return apiCall("/ai/latest");
  },

  updateDetection: async (data) => {
    return apiCall("/ai/update", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Staff Management API calls - Updated to match backend
export const staffAPI = {
  getAll: async () => {
    // Backend doesn't have get all users endpoint
    throw new Error("Get all users not implemented");
  },

  getByRestaurant: async (restaurantId) => {
    // Backend doesn't have get users by restaurant endpoint yet
    // Return mock data for now
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
  },

  create: async (staffData) => {
    // Backend doesn't have create user endpoint yet
    throw new Error("Staff creation not implemented");
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
  const token = localStorage.getItem("token");
  return !!token;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  auth: authAPI,
  restaurants: restaurantAPI,
  menus: menuAPI,
  ai: aiAPI,
  staff: staffAPI,
  utils: {
    isAuthenticated,
    getCurrentUser,
    clearAuth,
  },
};
