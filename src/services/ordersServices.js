import httpServices from "./httpServices";

async function getAllOrders() {
  const response = await httpServices.get("/orders");
  return response.data;
}

async function getAllMyOrders() {
  const response = await httpServices.get("/orders/my-orders");
  return response.data;
}

async function getOrderById(id) {
  const response = await httpServices.get(`/orders/${id}`);
  return response.data;
}

async function createNewOrder(formData) {
  console.log("Form Data in createNewOrder:", formData);
  const newOrder = {
    customer: {
      name: formData.user.name.first + " " + formData.user.name.last,
      email: formData.user.email,
      phone: formData.user.phone,
      number: formData.user._id,
    },
    flight: {
      flightFrom: formData.flight.flightFrom,
      flightTo: formData.flight.flightTo,
      flightDate: formData.flight.flightDate,
      flightTime: formData.flight.flightTime,
      flightNumber: formData.flight.flightNumber,
    },

    returnFlight:
      formData.returnFlight && formData.returnFlight.flightFrom
        ? {
            flightFrom: formData.returnFlight.flightFrom,
            flightTo: formData.returnFlight.flightTo,
            flightDate: formData.returnFlight.flightDate,
            flightTime: formData.returnFlight.flightTime,
            flightNumber: formData.returnFlight.flightNumber,
          }
        : undefined,

    Passengers: formData.Passengers.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      passportNumber: passenger.passportNumber,
      nationality: passenger.nationality,
      dateOfBirth: passenger.dateOfBirth,
      gender: passenger.gender,
      passportDate: passenger.passportDate,
      passportCountry: passenger.passportCountry,
    })),

    notes: formData.notes || "",
  };

  console.log("Order object to be sent to backend:", newOrder);

  const response = await httpServices.post("/orders", newOrder);
  return response.data;
}

async function updateOrder(_id, formData) {
  const updatedOrderPayload = {
    flight: {
      flightFrom: formData.flight.flightFrom ?? undefined,
      flightTo: formData.flight.flightTo ?? undefined,
      flightDate: formData.flight.flightDate ?? undefined,
      flightTime: formData.flight.flightTime ?? undefined,
      flightNumber: formData.flight.flightNumber ?? undefined,
    },

    returnFlight:
      formData.returnFlight && formData.returnFlight.flightFrom
        ? {
            flightFrom: formData.returnFlight.flightFrom ?? undefined,
            flightTo: formData.returnFlight.flightTo ?? undefined,
            flightDate: formData.returnFlight.flightDate ?? undefined,
            flightTime: formData.returnFlight.flightTime ?? undefined,
            flightNumber: formData.returnFlight.flightNumber ?? undefined,
          }
        : undefined,

    Passengers: formData.Passengers.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      passportNumber: passenger.passportNumber,
      nationality: passenger.nationality,
      dateOfBirth: passenger.dateOfBirth,
      gender: passenger.gender,
      passportDate: passenger.passportDate,
    })),
    orderStatus: formData.status || undefined,
    price: formData.price || 0,
    notes: formData.notes || "",
  };

  const response = await httpServices.patch(
    `/orders/${_id}`,
    updatedOrderPayload
  );
  return response.data;
}

function deleteOrder(id) {
  return httpServices.delete(`/orders/${id}`);
}

async function setAgent(_id, agent) {
  let response;
  if (agent) {
    console.log("Setting agent for order:", _id, "with agent:", agent);
    const request = {
      agent: {
        name: agent.name?.first + " " + agent.name?.last,
        email: agent.email,
        phone: agent.phone,
        number: agent._id,
      },
    };
    response = await httpServices.patch(`/orders/set-agent/${_id}`, request);
    console.log("Set Agent Response:", response.data);
  } else {
    console.error("No agent provided for setting agent on order:", _id);
    response = await httpServices.patch(`/orders/set-agent/${_id}`, {
      agent: null,
    });
  }

  return response.data;
}

async function ApproveOrder(_id, value) {
  const response = await httpServices.patch(`/orders/set-status/${_id}`, {
    orderStatus: value,
  });
  return response.data;
}

const ordersService = {
  getAllOrders,
  getAllMyOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
  setAgent,
  ApproveOrder,
};

export default ordersService;
