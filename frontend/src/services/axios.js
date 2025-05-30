import axios from "axios";

// create axios instance
const randomUserAPI = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const mainAPI = axios.create({
  baseURL: "http://localhost:4000/api", //
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  add auth token to requests
mainAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mainAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
     
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const studentService = {
  async fetchStudents(count = 20) {
    try {
      const response = await randomUserAPI.get("", {
        params: {
          results: count,
          nat: "us,gb,ca,au",
          inc: "name,email,picture,cell,location,dob,login",
          noinfo: true,
        },
      });

      return response.data.results.map((user, index) => {
        const tracks = ["Full Stack Software Engineering", "UI/UX Design"];
        const track = tracks[Math.floor(Math.random() * tracks.length)];

        const cohortNumber = Math.floor(Math.random() * 10) + 20;
        const cohortDisplay =
          track === "Full Stack Software Engineering"
            ? `FSE ${cohortNumber}`
            : `UI/UX ${cohortNumber}`;

        const username = user.login.username;

        return {
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          track: track,
          avatar: user.picture.large,
          status: Math.random() > 0.2 ? "active" : "inactive",
          cohort: cohortNumber.toString(),
          cohortDisplay: cohortDisplay,
          linkedinUrl: `https://linkedin.com/in/${username}`,
          githubUrl: `https://github.com/${username}`,
          phone: user.cell,
          location: `${user.location.city}, ${user.location.country}`,
          age: user.dob.age,
        };
      });
    } catch (error) {
      throw new Error("Failed to fetch student data");
    }
  },

  searchStudents(students, query) {
    if (!query) return students;

    const searchTerm = query.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.track.toLowerCase().includes(searchTerm) ||
        student.location.toLowerCase().includes(searchTerm)
    );
  },

  filterByTrack(students, track) {
    if (!track) return students;
    return students.filter((student) => student.track === track);
  },
};

export const authService = {
  async login(credentials) {
    try {
      const response = await mainAPI.post("/auth/login", credentials);

      if (response.data.success && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async logout() {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      throw new Error("Logout failed");
    }
  },

  async getProfile() {
    try {
      const response = await mainAPI.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get profile");
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

 
};

export { randomUserAPI, mainAPI };
