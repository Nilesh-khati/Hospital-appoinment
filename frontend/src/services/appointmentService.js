import api from "./api.js";

const appointmentService = {
  getAppointments: async () => {
    const response = await api.get("/appointments");
    return response.data;
  },
  bookAppointment: async (data) => {
    const response = await api.post("/appointments/book", data);
    return response.data;
  },
  cancelAppointment: async (id) => {
    const response = await api.put(`/appointments/cancel/${id}`);
    return response.data;
  },
};

export default appointmentService;
