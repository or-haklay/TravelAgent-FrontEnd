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
  const newOrder = {
    flight: {
      flightFrom: formData.flightFrom,
      flightTo: formData.flightTo,
      flightDate: formData.flightDate,
      flightTime: formData.flightTime || "",
      flightNumber: formData.flightNumber || "",
    },

    returnFlight: formData.returnFlightFrom
      ? {
          flightFrom: formData.returnFlightFrom,
          flightTo: formData.returnFlightTo,
          flightDate: formData.returnFlightDate,
          flightTime: formData.returnFlightTime || "",
          flightNumber: formData.returnFlightNumber || "",
        }
      : undefined,

    price: formData.price,

    Passengers: formData.passengersArray.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      passportNumber: passenger.passportNumber,
      nationality: passenger.nationality,
      dateOfBirth: passenger.dateOfBirth,
      gender: passenger.gender,
    })),

    notes: formData.notes || "",
  };
  const response = await httpServices.post("/orders", newOrder);
  return response.data;
}
async function updateOrderByUser(orderId, formData) {
  const updatedOrderPayload = {};
  const flightFields = {};
  if (formData.flightFrom !== undefined)
    flightFields.flightFrom = formData.flightFrom;
  if (formData.flightTo !== undefined)
    flightFields.flightTo = formData.flightTo;
  if (formData.flightDate !== undefined)
    flightFields.flightDate = formData.flightDate;
  if (formData.flightTime !== undefined)
    flightFields.flightTime = formData.flightTime;
  if (formData.flightNumber !== undefined)
    flightFields.flightNumber = formData.flightNumber;

  if (Object.keys(flightFields).length > 0) {
    updatedOrderPayload.flight = flightFields;
  }

  const returnFlightFields = {};
  if (formData.returnFlightFrom !== undefined)
    returnFlightFields.returnFlightFrom = formData.returnFlightFrom;
  if (formData.returnFlightTo !== undefined)
    returnFlightFields.returnFlightTo = formData.returnFlightTo;
  if (formData.returnFlightDate !== undefined)
    returnFlightFields.returnFlightDate = formData.returnFlightDate;
  if (formData.returnFlightTime !== undefined)
    returnFlightFields.returnFlightTime = formData.returnFlightTime;
  if (formData.returnFlightNumber !== undefined)
    returnFlightFields.returnFlightNumber = formData.returnFlightNumber;

  if (Object.keys(returnFlightFields).length > 0) {
    updatedOrderPayload.returnFlight = returnFlightFields;
  }

  if (
    formData.passengersArray !== undefined &&
    Array.isArray(formData.passengersArray)
  ) {
    updatedOrderPayload.Passengers = formData.passengersArray.map(
      (passenger) => ({
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        passportNumber: passenger.passportNumber,
        nationality: passenger.nationality,
        dateOfBirth: passenger.dateOfBirth,
        gender: passenger.gender,
      })
    );
  }

  if (formData.notes !== undefined) {
    updatedOrderPayload.notes = formData.notes;
  }

  if (formData.price !== undefined) {
    updatedOrderPayload.price = formData.price;
  }

  const response = await httpServices.patch(
    `/orders/${orderId}`,
    updatedOrderPayload
  );
  return response.data;
}

const ordersService = {
  getAllOrders,
  getAllMyOrders,
  getOrderById,
  createNewOrder,
  updateOrderByUser,
};

export default ordersService;
