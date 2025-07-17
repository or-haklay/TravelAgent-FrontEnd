import { useFormik, FieldArray, FormikProvider, getIn } from "formik";
import PageHeader from "../../components/common/pageHeader.jsx";
import Input from "../../components/common/input.jsx";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import ordersService from "../../services/ordersServices.js";
import useAuth from "../../context/auth.context.jsx";

// פונקציית עזר להמרת שגיאות Joi למבנה שגיאות מקונן של Formik
const joiToFormikErrors = (joiError) => {
  if (!joiError) {
    return {};
  }

  const errors = {};
  joiError.details.forEach((detail) => {
    let current = errors;
    const path = detail.path;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key]) {
        current[key] = typeof path[i + 1] === "number" ? [] : {};
      }
      current = current[key];
    }
    current[path[path.length - 1]] = detail.message;
  });
  return errors;
};

function MakeNewOrder() {
  const { userData } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const passengerSchema = Joi.object({
    firstName: Joi.string().required().trim().min(2).label("First Name"),
    lastName: Joi.string().required().trim().min(2).label("Last Name"),
    passportNumber: Joi.string()
      .required()
      .trim()
      .min(5)
      .label("Passport Number"),
    nationality: Joi.string()
      .required()
      .trim()
      .length(2)
      .label("Nationality Code"),
    dateOfBirth: Joi.date().required().max("now").label("Date Of Birth"),
    gender: Joi.string()
      .valid("Male", "Female", "Other")
      .required()
      .label("Gender"),
    passportDate: Joi.date()
      .required()
      .min("now")
      .label("Passport Expiry Date"),
  });

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    initialValues: {
      flight: {
        flightFrom: "",
        flightTo: "",
        flightDate: "",
      },
      returnFlight: {
        flightFrom: "",
        flightTo: "",
        flightDate: "",
      },
      Passengers: [
        {
          firstName: "",
          lastName: "",
          passportNumber: "",
          nationality: "",
          dateOfBirth: "",
          gender: "",
          passportDate: "",
        },
      ],
      notes: "",
    },
    validate: (values) => {
      const schema = Joi.object({
        flight: Joi.object({
          flightFrom: Joi.string()
            .required()
            .trim()
            .label("Flight From")
            .min(2),
          flightTo: Joi.string().required().trim().label("Flight To"),
          flightDate: Joi.date().required().min("now").label("Flight Date"),
        })
          .required()
          .label("Flight Details"),
        returnFlight: Joi.object({
          flightFrom: Joi.string()
            .trim()
            .label("Return Flight From")
            .optional()
            .allow(""),
          flightTo: Joi.string()
            .trim()
            .label("Return Flight To")
            .optional()
            .allow(""),
          flightDate: Joi.date()
            .label("Return Flight Date")
            .min("now")
            .optional()
            .allow(""),
        })
          .optional()
          .label("Return Flight Details"),

        Passengers: Joi.array()
          .items(passengerSchema)
          .min(1)
          .required()
          .label("Passengers"),

        notes: Joi.string().trim().max(500).allow("").label("Notes"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      return joiToFormikErrors(error);

      /*  if (!error) {
        return {};
      }

      const errors = {};
      for (const detail of error.details) {
        const path = detail.path.join(".");
        errors[path] = detail.message;
      }
      return errors; */
    },

    onSubmit: async (values) => {
      values.user = userData;
      setServerError("");

      try {
        console.log("Form values before sending to services:", values);
        const response = await ordersService.createNewOrder(values);
        toast.success("New order created successfully!");
        navigate("/ordersUser");
      } catch (err) {
        console.error("Failed to make new order:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError("An unexpected error occurred.");
        }
        toast.error("Failed to create order.");
      }
    },
  });

  console.log("Formik errors:", formik.errors);
  console.log("Formik touched:", formik.touched);

  const getNestedError = (path) => {
    const isTouched = getIn(formik.touched, path);
    const error = getIn(formik.errors, path);
    return isTouched && error ? error : null;
  };

  return (
    <div className="container">
      <PageHeader
        title="Create New Order"
        description={"Fill out the form to create a new flight order."}
      />
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3 container flex-fill mx-auto justify-content-center my-5"
        >
          <h4>Flight Details</h4>
          <div className="d-flex flex-column flex-md-row gap-2 align-items-center justify-content-around flex-wrap">
            <Input
              {...formik.getFieldProps("flight.flightFrom")}
              label="Flight From"
              type="text"
              error={getNestedError("flight.flightFrom")}
              placeholder="TLV"
              width="col-md-3 col-12"
              required
            />

            <Input
              {...formik.getFieldProps("flight.flightTo")}
              label="Flight To"
              type="text"
              error={getNestedError("flight.flightTo")}
              placeholder="JFK"
              width="col-md-3 col-12"
              required
            />
            <Input
              {...formik.getFieldProps("flight.flightDate")}
              label="Flight Date"
              type="date"
              error={getNestedError("flight.flightDate")}
              width="col-md-3 col-12"
              required
            />
          </div>

          <hr />
          <h4>Return Flight (Optional)</h4>
          <div className="d-flex flex-column flex-md-row gap-2 flex-wrap align-items-center justify-content-around">
            <Input
              {...formik.getFieldProps("returnFlight.flightFrom")}
              label="Return Flight From"
              type="text"
              error={getNestedError("returnFlight.flightFrom")}
              placeholder="JFK"
              width="col-md-3 col-12"
            />
            <Input
              {...formik.getFieldProps("returnFlight.flightTo")}
              label="Return Flight To"
              type="text"
              error={getNestedError("returnFlight.flightTo")}
              placeholder="TLV"
              width="col-md-3 col-12"
            />
            <Input
              {...formik.getFieldProps("returnFlight.flightDate")}
              label="Return Flight Date"
              type="date"
              error={getNestedError("returnFlight.flightDate")}
              width="col-md-3 col-12"
            />
          </div>

          <hr />
          <h4>Passengers</h4>
          <FieldArray name="Passengers">
            {({ push, remove }) => (
              <div>
                {formik.values.Passengers.map((passenger, index) => (
                  <div key={index} className="border p-5 mb-3 rounded row">
                    <h5>Passenger #{index + 1}</h5>
                    <div className="d-flex flex-column flex-md-row gap-3">
                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].firstName`
                        )}
                        label="First Name"
                        type="text"
                        error={getNestedError(`Passengers[${index}].firstName`)}
                        placeholder="Bob"
                        width="col-md-4"
                        required
                      />

                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].lastName`
                        )}
                        label="Last Name"
                        type="text"
                        error={getNestedError(`Passengers[${index}].lastName`)}
                        placeholder="Marly"
                        width="col-md-4"
                        required
                      />
                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].passportNumber`
                        )}
                        label="Passport Number"
                        type="text"
                        error={getNestedError(
                          `Passengers[${index}].passportNumber`
                        )}
                        placeholder="123456789"
                        width="col-md-4"
                        required
                      />
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-3 mt-2">
                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].nationality`
                        )}
                        label="Nationality (2-letter code)"
                        type="text"
                        error={getNestedError(
                          `Passengers[${index}].nationality`
                        )}
                        placeholder="IL"
                        width="col-md-4"
                        required
                      />
                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].dateOfBirth`
                        )}
                        label="Date Of Birth"
                        type="date"
                        error={getNestedError(
                          `Passengers[${index}].dateOfBirth`
                        )}
                        width="col-md-4"
                        required
                      />
                      <div className="form-group mb-3 col-md-4">
                        <label
                          htmlFor={`Passengers[${index}].gender`}
                          className="form-label"
                        >
                          Gender
                        </label>
                        <span className="text-danger ms-1">*</span>
                        <select
                          className="form-control"
                          {...formik.getFieldProps(
                            `Passengers[${index}].gender`
                          )}
                          id={`Passengers[${index}].gender`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {getNestedError(`Passengers[${index}].gender`) && (
                          <div className="text-danger">
                            {getNestedError(`Passengers[${index}].gender`)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row gap-3 mt-2">
                      <Input
                        {...formik.getFieldProps(
                          `Passengers[${index}].passportDate`
                        )}
                        label="Passport Expiry Date"
                        type="date"
                        error={getNestedError(
                          `Passengers[${index}].passportDate`
                        )}
                        width="col-md-4"
                        required
                      />

                      {formik.values.Passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="btn btn-danger align-self-end mb-3"
                          title="Remove Passenger"
                        >
                          <i className="bi bi-dash-circle"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      firstName: "",
                      lastName: "",
                      passportNumber: "",
                      nationality: "",
                      dateOfBirth: "",
                      gender: "",
                      passportDate: "",
                    })
                  }
                  className="btn btn-secondary mt-3"
                  title="Add Passenger"
                >
                  <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            )}
          </FieldArray>

          <hr />
          <h4>Additional Notes</h4>
          <Input
            {...formik.getFieldProps("notes")}
            name="notes"
            label="Notes (Optional)"
            type="textarea"
            error={getNestedError("notes")}
            placeholder="Any special requests or information..."
            rows="3"
          />

          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}

          <div className="my-2">
            <button
              disabled={!formik.isValid}
              type="submit"
              className="btn btn-success col-8 col-md-4 mx-auto d-block"
            >
              Create Order
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

export default MakeNewOrder;
