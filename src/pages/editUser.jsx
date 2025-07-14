import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import Joi from "joi";
import { useFormik } from "formik";
import useAuth from "../context/auth.context";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { countries } from "../data/countries.js";
import LoadingSpinner from "../components/common/loadingSpinners";

function EditUser() {
  const { user, updateUser, userData } = useAuth();
  const navigate = useNavigate();
  const validCountryNames = countries.flatMap((country) => [
    country.countryCode,
    country.countryCode.toLowerCase(),
  ]);
  const { getFieldProps, isValid, handleSubmit, errors, touched } = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: userData?.name?.first,
      lastName: userData?.name?.last,
      phone: userData?.phone,
      country: userData?.address?.country,
      state: userData?.address?.state,
      city: userData?.address?.city,
      street: userData?.address?.street,
      houseNumber: userData?.address?.houseNumber,
      zip: userData?.address?.zip,
      passportNumber: userData?.passport?.passportNumber,
      passportDate: userData.passport?.passportDate
        ? new Date(userData.passport?.passportDate).toISOString().split("T")[0]
        : "",
      passportCountry: userData?.passport?.passportCountry,
    },
    enableReinitialize: true,
    validate: (values) => {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(256).label("First Name"),
        lastName: Joi.string().min(2).max(256).label("Last Name"),
        phone: Joi.string().min(9).max(12).label("Phone Number"),
        email: Joi.string().min(5).email({ tlds: false }).label("Email"),
        password: Joi.string().min(7).max(20).label("Password"),
        country: Joi.string().min(2).max(256).label("Country"),
        state: Joi.string().min(2).max(256).label("State"),
        city: Joi.string().min(2).max(256).label("City"),
        street: Joi.string().min(2).max(256).label("Street"),
        houseNumber: Joi.number().min(0).max(256).label("House Number"),
        zip: Joi.number().label("Zip Code"),
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
      try {
        const response = await updateUser(values, user?._id);
        console.log(response.data);
        navigate("/");
        toast.success("User Updated Successfully");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
  });

  if (!userData) {
    return (
      <div className="container mt-5">
        <PageHeader title="Edit User" description={"Loading User Data..."} />
        <LoadingSpinner text={"Loading User Data..."} />
      </div>
    );
  }

  return (
    <div className="container">
      <PageHeader
        title="Edit User"
        description={"This Page Is For Editing User"}
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
          />
          <Input
            {...getFieldProps("lastName")}
            name="lastName"
            label="Last Name"
            type="text"
            error={touched.lastName && errors.lastName}
            placeholder="Israeli"
            width="col-md-4"
          />
          <Input
            {...getFieldProps("phone")}
            name="phone"
            label="Phone Number"
            type="tel"
            error={touched.phone && errors.phone}
            placeholder="055-555-5555"
            width="col-md-4"
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
          />
          <Input
            {...getFieldProps("houseNumber")}
            name="houseNumber"
            label="House Number"
            type="number"
            error={touched.houseNumber && errors.houseNumber}
            placeholder="123"
            width="col-md-4"
          />
          <Input
            {...getFieldProps("zip")}
            name="zip"
            label="Zip Code"
            type="number"
            error={touched.zip && errors.zip}
            placeholder="11223344"
            width="col-md-4"
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
          />
          <Input
            {...getFieldProps("passportDate")}
            name="passportDate"
            label="Passport Date Expiry"
            type="date"
            error={touched.passportDate && errors.passportDate}
            width="col-md-4"
          />
          <Input
            {...getFieldProps("passportCountry")}
            name="passportCountry"
            label="Passport Country Code"
            type="text"
            error={touched.passportCountry && errors.passportCountry}
            placeholder="IL"
            width="col-md-4"
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

export default EditUser;
