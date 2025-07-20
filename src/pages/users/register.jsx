import { useFormik } from "formik";
import PageHeader from "../../components/common/pageHeader.jsx";
import Input from "../../components/common/input.jsx";
import Joi from "joi";
import { useState } from "react";
import useAuth from "../../context/auth.context.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { countries } from "../../data/countries.js";

function Register() {
  const { register } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const validCountryNames = countries.flatMap((country) => [
    country.countryCode,
    country.countryCode.toLowerCase(),
  ]);
  const { getFieldProps, isValid, handleSubmit, errors, touched } = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      country: "",
      state: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      passportNumber: "",
      passportDate: "",
      passportCountry: "",
    },
    validate: (values) => {
      const schema = Joi.object({
        firstName: Joi.string().required().min(2).max(256).label("First Name"),
        lastName: Joi.string().required().min(2).max(256).label("Last Name"),
        phone: Joi.string().required().min(9).max(12).label("Phone Number"),
        email: Joi.string()
          .required()
          .min(5)
          .email({ tlds: false })
          .label("Email"),
        password: Joi.string().min(6).max(20).label("Password").required(),
        country: Joi.string().min(2).max(256).label("Country").required(),
        state: Joi.string().min(2).max(256).label("State"),
        city: Joi.string().min(2).max(256).label("City").required(),
        street: Joi.string().min(2).max(256).label("Street").required(),
        houseNumber: Joi.number()
          .min(0)
          .max(256)
          .label("House Number")
          .required(),
        zip: Joi.number().label("Zip Code").required(),
        passportNumber: Joi.string().label("Passport Number"),
        passportDate: Joi.date().label("Passport Date Expiry"),
        passportCountry: Joi.string()
          .label("Passport Country")
          .valid(...validCountryNames)
          .uppercase()
          .messages({ "any.only": "Invalid passport country" }),
      });

      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }

      const errors = {};

      for (let index = 0; index < error.details.length; index++) {
        const element = error.details[index];

        errors[element.path[0]] = element.message;
      }

      return errors;
    },

    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await register(values);
        console.log(response.data);
        navigate("/");
        toast.success("Registration successful! Please sign in.");
      } catch (err) {
        console.log(err);
        if (err.status === 409) {
          toast.error("User already exists. Please try a different email.");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    },
  });

  return (
    <div className="container">
      <PageHeader
        title="Register"
        description={"This Page Is For Registering New User"}
      />
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column  gap-1 container flex-fill mx-auto justify-content-center my-5"
      >
        <div className="d-flex flex-column flex-md-row gap-2">
          <Input
            {...getFieldProps("firstName")}
            name="firstName"
            label="First Name"
            type="text"
            error={touched.firstName && errors.firstName}
            placeholder="Israel"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("lastName")}
            name="lastName"
            label="Last Name"
            type="text"
            error={touched.lastName && errors.lastName}
            placeholder="Israeli"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("phone")}
            name="phone"
            label="Phone Number"
            type="tel"
            error={touched.phone && errors.phone}
            placeholder="055-555-5555"
            width="col-md-4"
            required
          />
        </div>
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center">
          <Input
            {...getFieldProps("email")}
            name="email"
            label="Email"
            type="email"
            error={touched.email && errors.email}
            placeholder="name@domain.com"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("password")}
            name="password"
            label="Password"
            type="password"
            error={touched.password && errors.password}
            width="col-md-4"
            required
          />
        </div>
        <hr />
        <div className=" d-flex flex-column flex-md-row gap-3">
          <Input
            {...getFieldProps("country")}
            name="country"
            label="Country"
            type="text"
            error={touched.country && errors.country}
            placeholder="Israel"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("state")}
            name="state"
            label="State"
            type="text"
            error={touched.country && errors.country}
            placeholder=""
            width="col-md-4"
          />
          <Input
            {...getFieldProps("city")}
            name="city"
            label="City"
            type="text"
            error={touched.city && errors.city}
            placeholder="Tel-Aviv"
            width="col-md-4"
            required
          />
        </div>
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-end">
          <Input
            {...getFieldProps("street")}
            name="street"
            label="Street"
            type="text"
            error={touched.street && errors.street}
            placeholder="Rothschild"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("houseNumber")}
            name="houseNumber"
            label="House Number"
            type="number"
            error={touched.houseNumber && errors.houseNumber}
            placeholder="123"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("zip")}
            name="zip"
            label="Zip Code"
            type="number"
            error={touched.zip && errors.zip}
            placeholder="11223344"
            width="col-md-4"
            required
          />
        </div>
        <hr />
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-end">
          <Input
            {...getFieldProps("passportNumber")}
            name="passportNumber"
            label="Passport Number"
            type="text"
            error={touched.passportNumber && errors.passportNumber}
            placeholder="123456789"
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("passportDate")}
            name="passportDate"
            label="Passport Date Expiry"
            type="date"
            error={touched.passportDate && errors.passportDate}
            width="col-md-4"
            required
          />
          <Input
            {...getFieldProps("passportCountry")}
            name="passportCountry"
            label="Passport Country Code"
            type="text"
            error={touched.passportCountry && errors.passportCountry}
            placeholder="IL"
            width="col-md-4"
            required
          />
        </div>
        <div className="my-2">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success col-8 col-md-4 mx-auto d-block"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
