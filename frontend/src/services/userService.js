import api from "./api.js";

const userService = {
  getDoctors: async () => {
    const response = await api.get("/users/doctors");
    return response.data;
  },
  getPatients: async () => {
    const response = await api.get("/users/patients");
    return response.data;
  },
};

export default userService;
