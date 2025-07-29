import { toast } from "react-hot-toast";
import { useFormik, FieldArray, FormikProvider } from "formik";
import Input from "../common/input";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router";

import ordersServices from "../../services/ordersServices";
import useAuth from "../../context/auth.context";

import PageHeader from "../common/pageHeader";

function UpdateOrder({
  selectedPassengerIndex,
  orderUpdateStatus,
  setOrderUpdateStatus,
  orderData,
}) {
  if (!orderUpdateStatus) return null;
  const { user } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const flightDetailsSchema = Joi.object({
    flightFrom: Joi.string().trim().required().label("Flight From"),
    flightTo: Joi.string().trim().required().label("Flight To"),
    flightDate: Joi.date().required().label("Flight Date"),
    flightTime: Joi.string().trim().label("Flight Time").allow(""),
    flightNumber: Joi.string().trim().label("Flight Number").allow(""),
  });

  const returnFlightDetailsSchema = Joi.object({
    flightFrom: Joi.string().trim().allow("").label("Return Flight From"),
    flightTo: Joi.string().trim().allow("").label("Return Flight To"),
    flightDate: Joi.date().allow("").label("Return Flight Date"),
    flightTime: Joi.string().trim().label("Return Flight Time").allow(""),
    flightNumber: Joi.string().trim().label("Return Flight Number").allow(""),
  });

  const passengerSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .min(2)
      .label("First Name")
      .allow(""),
    lastName: Joi.string()
      .required()
      .trim()
      .min(2)
      .label("Last Name")
      .allow(""),
    passportNumber: Joi.string()
      .required()
      .trim()
      .allow("")
      .min(5)
      .label("Passport Number"),
    nationality: Joi.string()
      .required()
      .trim()
      .allow("")
      .length(2)
      .label("Nationality Code"),
    dateOfBirth: Joi.date()
      .required()
      .max("now")
      .allow("")
      .label("Date Of Birth"),
    gender: Joi.string()
      .valid("Male", "Female", "Other")
      .required()
      .allow("")
      .label("Gender"),
    passportDate: Joi.date()
      .required()
      .min("now")
      .allow("")
      .label("Passport Expiry Date"),
  });

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      flight: {
        flightFrom: orderData.flight?.flightFrom || "",
        flightTo: orderData.flight?.flightTo || "",
        flightDate: orderData.flight?.flightDate
          ? new Date(orderData.flight.flightDate).toISOString().split("T")[0]
          : "",
        flightTime: orderData.flight?.flightTime || "",
        flightNumber: orderData.flight?.flightNumber || "",
      },
      returnFlight: {
        flightFrom: orderData?.returnFlight?.flightFrom || "",
        flightTo: orderData?.returnFlight?.flightTo || "",
        flightDate: orderData?.returnFlight?.flightDate
          ? new Date(orderData.returnFlight.flightDate)
              .toISOString()
              .split("T")[0]
          : "",
        flightTime: orderData.returnFlight?.flightTime || "",
        flightNumber: orderData.returnFlight?.flightNumber || "",
      },
      editedPassenger: {
        firstName:
          orderData.Passengers[selectedPassengerIndex]?.firstName || "",
        lastName: orderData.Passengers[selectedPassengerIndex]?.lastName || "",
        passportNumber:
          orderData.Passengers[selectedPassengerIndex]?.passportNumber || "",
        nationality:
          orderData.Passengers[selectedPassengerIndex]?.nationality || "",
        dateOfBirth: orderData.Passengers[selectedPassengerIndex]?.dateOfBirth
          ? new Date(orderData.Passengers[selectedPassengerIndex].dateOfBirth)
              .toISOString()
              .split("T")[0]
          : "",
        gender: orderData.Passengers[selectedPassengerIndex]?.gender || "",
        passportDate: orderData.Passengers[selectedPassengerIndex]?.passportDate
          ? new Date(orderData.Passengers[selectedPassengerIndex].passportDate)
              .toISOString()
              .split("T")[0]
          : "",
      },
      price: orderData.price || "",
      status: orderData.orderStatus || "",
      notes: orderData.notes || "",
    },
    validate: (values) => {
      let currentSchema;

      if (orderUpdateStatus === "Flights") {
        currentSchema = Joi.object({
          flight: Joi.object({
            flightFrom: Joi.string().trim().label("Flight From"),
            flightTo: Joi.string().trim().label("Flight To"),
            flightDate: Joi.date().required().allow("").label("Flight Date"),
            flightTime: Joi.string()
              .trim()
              .label("Flight Time")
              .allow("")
              .optional(),
            flightNumber: Joi.string()
              .trim()
              .label("Flight Number")
              .allow("")
              .optional(),
          }).label("Flight Details"),
          returnFlight: Joi.object({
            flightFrom: Joi.string()
              .trim()
              .allow("")
              .label("Return Flight From"),
            flightTo: Joi.string().trim().allow("").label("Return Flight To"),
            flightDate: Joi.date().allow("").label("Return Flight Date"),
            flightTime: Joi.string()
              .trim()
              .label("Return Flight Time")
              .allow(""),
            flightNumber: Joi.string()
              .trim()
              .label("Return Flight Number")
              .allow(""),
          })
            .label("Return Flight Details")
            .optional(),

          editedPassenger: passengerSchema.optional(),
          price: Joi.number().allow("").optional().label("Price"),
          status: Joi.string().allow("").optional().label("Status"),
          notes: Joi.string()
            .trim()
            .max(500)
            .allow("")
            .optional()
            .label("Notes"),
        });
      } else if (orderUpdateStatus === "General") {
        currentSchema = Joi.object({
          price: Joi.number().allow("").label("Price"),
          status: Joi.string().label("Status").allow(""),
          notes: Joi.string().trim().max(500).allow("").label("Notes"),
          flight: flightDetailsSchema.optional(),
          returnFlight: returnFlightDetailsSchema.optional(),
          editedPassenger: passengerSchema.optional(),
        });
      } else if (orderUpdateStatus === "Passengers") {
        currentSchema = Joi.object({
          flight: flightDetailsSchema.optional(),
          returnFlight: returnFlightDetailsSchema.optional(),
          editedPassenger: passengerSchema,
          price: Joi.number().allow("").optional().label("Price"),
          status: Joi.string().allow("").optional().label("Status"),
          notes: Joi.string()
            .trim()
            .max(500)
            .allow("")
            .optional()
            .label("Notes"),
        });
      } else {
        currentSchema = Joi.object({
          flight: flightDetailsSchema.optional(),
          returnFlight: returnFlightDetailsSchema.optional(),
          editedPassenger: passengerSchema.optional(),
          price: Joi.number().allow("").optional().label("Price"),
          status: Joi.string().allow("").optional().label("Status"),
          notes: Joi.string()
            .trim()
            .max(500)
            .allow("")
            .optional()
            .label("Notes"),
        });
      }

      const { error } = currentSchema.validate(values, { abortEarly: false });

      if (!error) {
        return {};
      }

      const errors = {};
      for (const detail of error.details) {
        const path = detail.path.join(".");
        errors[path] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      setServerError("");
      try {
        let updatedOrderPayload = { ...orderData };
        const checkIsOrderReady = () => {
          if (!values.price) {
            return false;
          } else if (!values.flight.flightTime || !values.flight.flightNumber) {
            return false;
          } else if (
            values.returnFlight.flightFrom &&
            (!values.returnFlight.flightTime ||
              !values.returnFlight.flightNumber)
          ) {
            return false;
          }
          return true;
        };
        if (orderUpdateStatus === "Flights") {
          updatedOrderPayload.flight = values.flight;
          if (updatedOrderPayload.returnFlight) {
            updatedOrderPayload.returnFlight = values.returnFlight;
          }
        } else if (orderUpdateStatus === "General") {
          if (
            values.price != updatedOrderPayload.price &&
            checkIsOrderReady()
          ) {
            updatedOrderPayload.status = "Pending Customer Approval";
          } else {
            updatedOrderPayload.status = values.status;
          }
          updatedOrderPayload.price = values.price;
          updatedOrderPayload.notes = values.notes;
        } else if (orderUpdateStatus === "Passengers") {
          updatedOrderPayload.Passengers = [
            ...(updatedOrderPayload.Passengers || []),
          ];
          updatedOrderPayload.Passengers[selectedPassengerIndex] =
            values.editedPassenger;
        }

        const response = await ordersServices.updateOrder(
          orderData._id,
          updatedOrderPayload
        );
        toast.success("Order updated successfully!");
        handleClose();
      } catch (err) {
        console.error("Failed to update order:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError("An unexpected error occurred.");
        }
        toast.error("Failed to update order.");
      }
    },
  });

  const getNestedError = (path) => {
    const isTouched = path
      .split(".")
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
        formik.touched
      );
    return isTouched && formik.errors[path] ? formik.errors[path] : null;
  };

  const handleClose = () => {
    setOrderUpdateStatus(null);
  };

  return (
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-body border border-success p-4 rounded shadow-lg"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          width: "600px",
        }}
      >
        <div className="my-0 d-flex align-items-center justify-content-end ">
          <button
            type="button"
            aria-label="Close"
            className="btn btn-success d-block btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <PageHeader title={`Order Update - ${orderUpdateStatus}`} />
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="my-2 d-flex flex-column gap-3 align-items-center
            justify-content-center"
          >
            {orderUpdateStatus === "Flights" && (
              <div className="d-flex col-12 align-items-center justify-content-center gap-3">
                <div className="d-flex flex-column gap-2 align-items-center justify-content-around flex-wrap">
                  <h4>Flight Details</h4>
                  <Input
                    {...formik.getFieldProps("flight.flightFrom")}
                    label="Flight From"
                    type="text"
                    error={getNestedError("flight.flightFrom")}
                    placeholder="TLV"
                    width=" col-12"
                    required
                  />
                  <Input
                    {...formik.getFieldProps("flight.flightTo")}
                    label="Flight To"
                    type="text"
                    error={getNestedError("flight.flightTo")}
                    placeholder="JFK"
                    width="col-12"
                    required
                  />
                  <Input
                    {...formik.getFieldProps("flight.flightDate")}
                    label="Flight Date"
                    type="date"
                    error={getNestedError("flight.flightDate")}
                    width="col-12"
                    required
                  />
                  <Input
                    {...formik.getFieldProps("flight.flightTime")}
                    label="Flight Time"
                    type="time"
                    error={getNestedError("flight.flightTime")}
                    width="col-12"
                  />
                  <Input
                    {...formik.getFieldProps("flight.flightNumber")}
                    label="Flight Number"
                    type="text"
                    error={getNestedError("flight.flightNumber")}
                    width="col-12"
                  />
                </div>

                <div className="d-flex flex-column gap-2 flex-wrap align-items-center justify-content-around">
                  <h4>Return Flight (Optional)</h4>
                  <Input
                    {...formik.getFieldProps("returnFlight.flightFrom")}
                    label="Return Flight From"
                    type="text"
                    error={getNestedError("returnFlight.flightFrom")}
                    placeholder="JFK"
                    width="col-12"
                  />
                  <Input
                    {...formik.getFieldProps("returnFlight.flightTo")}
                    label="Return Flight To"
                    type="text"
                    error={getNestedError("returnFlight.flightTo")}
                    placeholder="TLV"
                    width="col-12"
                  />
                  <Input
                    {...formik.getFieldProps("returnFlight.flightDate")}
                    label="Return Flight Date"
                    type="date"
                    error={getNestedError("returnFlight.flightDate")}
                    width="col-12"
                  />
                  <Input
                    {...formik.getFieldProps("returnFlight.flightTime")}
                    label="Return Flight Time"
                    type="time"
                    error={getNestedError("returnFlight.flightTime")}
                    width="col-12"
                  />
                  <Input
                    {...formik.getFieldProps("returnFlight.flightNumber")}
                    label="Return Flight Number"
                    type="text"
                    error={getNestedError("returnFlight.flightNumber")}
                    width="col-12"
                  />
                </div>
              </div>
            )}
            {orderUpdateStatus === "Passengers" && (
              <div className="d-flex flex-row flex-wrap gap-2 col-12 align-items-center justify-content-center gap-3">
                <Input
                  {...formik.getFieldProps("editedPassenger.firstName")}
                  name="editedPassenger.firstName"
                  label="First Name"
                  type="text"
                  error={getNestedError("editedPassenger.firstName")}
                  width="col-12 col-md-5"
                  required
                />
                <Input
                  {...formik.getFieldProps("editedPassenger.lastName")}
                  name="editedPassenger.lastName"
                  label="Last Name"
                  type="text"
                  error={getNestedError("editedPassenger.lastName")}
                  width="col-12 col-md-5"
                  required
                />
                <Input
                  {...formik.getFieldProps("editedPassenger.passportNumber")}
                  label="Passport Number"
                  type="text"
                  error={getNestedError("editedPassenger.passportNumber")}
                  placeholder="123456789"
                  width="col-12 col-md-5"
                  required
                />
                <Input
                  {...formik.getFieldProps("editedPassenger.nationality")}
                  label="Nationality (2-letter code)"
                  type="text"
                  error={getNestedError("editedPassenger.nationality")}
                  placeholder="IL"
                  width="col-12 col-md-5"
                  required
                />
                <Input
                  {...formik.getFieldProps("editedPassenger.dateOfBirth")}
                  label="Date Of Birth"
                  type="date"
                  error={getNestedError("editedPassenger.dateOfBirth")}
                  width="col-12 col-md-5"
                  required
                />
                <div className="form-group mb-3 col-12 col-md-5">
                  <label
                    htmlFor={`editedPassenger.gender`}
                    className="form-label"
                  >
                    Gender<span className="text-danger ms-1">*</span>
                  </label>
                  <select
                    className="form-control"
                    {...formik.getFieldProps(`editedPassenger.gender`)}
                    id={`gender`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {getNestedError(`editedPassenger.gender`) && (
                    <div className="text-danger">
                      {getNestedError(`editedPassenger.gender`)}
                    </div>
                  )}
                </div>
                <Input
                  {...formik.getFieldProps("editedPassenger.passportDate")}
                  label="Passport Expiry Date"
                  type="date"
                  error={getNestedError("editedPassenger.passportDate")}
                  width="col-12 col-md-5"
                  required
                />
              </div>
            )}
            {orderUpdateStatus === "General" && (
              <div className="d-flex flex-column gap-2 col-12 align-items-center justify-content-center gap-3">
                {user.isAgent ? (
                  <>
                    <Input
                      {...formik.getFieldProps("price")}
                      name="price"
                      label="Price"
                      type="number"
                      error={formik.touched.price && formik.errors.price}
                      placeholder="$"
                      width="col-12"
                      rows="3"
                    />
                    <div className="form-group mb-3 col-12">
                      <label htmlFor={"status"} className="form-label">
                        Status<span className="text-danger ms-1">*</span>
                      </label>
                      <select
                        className="form-control"
                        {...formik.getFieldProps(`status`)}
                      >
                        <option value="">Select Status</option>
                        <option value="Wait For Agent">Wait For Agent</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending Customer Approval">
                          Pending Customer Approval
                        </option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      {getNestedError(`status`) && (
                        <div className="text-danger">
                          {getNestedError(`status`)}
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
                <Input
                  {...formik.getFieldProps("notes")}
                  name="notes"
                  label="Notes (Optional)"
                  type="textarea"
                  error={formik.touched.notes && formik.errors.notes}
                  placeholder="Any special requests or information..."
                  rows="3"
                  width="col-12"
                />
              </div>
            )}
            <div className="d-flex col-12">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-secondary col-5 col-md-4  mx-auto d-block"
              >
                cancel
              </button>
              <button
                disabled={!formik.isValid}
                type="submit"
                className="btn btn-success col-5 col-md-4  mx-auto d-block liveToastBtn"
              >
                Save Changes
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}
export default UpdateOrder;
