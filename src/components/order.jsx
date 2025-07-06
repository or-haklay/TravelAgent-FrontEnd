import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import cardService from "../services/cardService";
import { toast } from "react-hot-toast";

function UpdateCard({ isOn, onClose, card }) {
  const [city, country, street, houseNumber] = card?.address.split(",");
  const { getFieldProps, handleSubmit, touched, errors, isValid } = useFormik({
    initialValues: {
      title: card?.title || "",
      subtitle: card?.subtitle || "",
      description: card?.description || "",
      phone: card?.phone || "",
      email: card?.email || "",
      web: card?.web || "",
      image: card?.image?.url || "",
      country: country || "",
      city: city || "",
      street: street || "",
      houseNumber: houseNumber || "",
    },
    enableReinitialize: true,
    validateOnMount: true,

    validate: (values) => {
      const schema = Joi.object({
        title: Joi.string().min(2).max(256).required().label("Title"),
        subtitle: Joi.string().min(2).max(256).required().label("Subtitle"),
        description: Joi.string()
          .min(2)
          .max(1024)
          .required()
          .label("Description"),
        phone: Joi.string().min(9).max(11).required().label("Phone"),
        email: Joi.string()
          .required()
          .min(5)
          .email({ tlds: { allow: false } })
          .label("Email"),
        web: Joi.string().min(14).required().label("Website Url"),
        image: Joi.string().min(14).label("Image Url"),
        country: Joi.string().label("Country").required(),
        city: Joi.string().label("City").required(),
        street: Joi.string().label("Street").required(),
        houseNumber: Joi.number().label("House Number").required(),
      });
      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    },

    onSubmit: async (values) => {
      console.log("onSubmit", values);
      try {
        const response = await cardService.updateCard(values, card._id);
        onClose();
        toast.success("Card updated successfully!");
        return response.data;
      } catch (error) {
        console.error("Error creating card:", error);
        toast.error("Something went wrong, please try again later.");
      }
    },
  });

  if (!isOn) {
    return null;
  }
  return (
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-body border border-success p-4 rounded shadow-lg"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          width: "600px",
        }}
      >
        <div className="my-0 d-flex align-items-center justify-content-end">
          <button
            type="button"
            aria-label="Close"
            className="btn btn-success d-block btn-close"
            onClick={onClose}
          ></button>
        </div>
        <PageHeader title={"Update Your Card"} />
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-start">
          <Input
            {...getFieldProps("title")}
            name="title"
            label="Title"
            type="text"
            error={touched.title && errors.title}
            placeholder="Enter your title"
            width="col-md-6"
            required
          />
          <Input
            {...getFieldProps("subtitle")}
            name="subtitle"
            label="Subtitle"
            type="text"
            error={touched.subtitle && errors.subtitle}
            placeholder="Enter your subtitle"
            width="col-md-6"
            required
          />
        </div>
        <Input
          {...getFieldProps("description")}
          name="description"
          label="Description"
          type="text"
          error={touched.description && errors.description}
          placeholder="Enter your description"
          required
        />
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-start">
          <Input
            {...getFieldProps("phone")}
            name="phone"
            label="Phone"
            type="text"
            error={touched.phone && errors.phone}
            placeholder="055-5555555"
            width="col-md-6"
            required
          />
          <Input
            {...getFieldProps("email")}
            name="email"
            label="Email"
            type="text"
            error={touched.email && errors.email}
            placeholder="name@domain.com"
            width="col-md-6"
            required
          />
        </div>
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-start">
          <Input
            {...getFieldProps("web")}
            name="web"
            label="Website Url"
            type="text"
            error={touched.web && errors.web}
            placeholder="https://www.your-site.com"
            width="col-md-6"
            required
          />
          <Input
            {...getFieldProps("image")}
            name="image"
            label="Image Url"
            type="text"
            error={touched.image && errors.image}
            placeholder="https://www.your-image.png"
            width="col-md-6"
          />
        </div>
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-start">
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
            {...getFieldProps("city")}
            name="city"
            label="City"
            type="text"
            error={touched.city && errors.city}
            placeholder="Tel Aviv"
            width="col-md-4"
            required
          />
        </div>
        <div className=" d-flex flex-column flex-md-row gap-3 justify-content-center align-items-md-start">
          <Input
            {...getFieldProps("street")}
            name="street"
            label="Street"
            type="text"
            error={touched.street && errors.street}
            placeholder="Rothschild"
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
        </div>
        <div className="my-2">
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-success col-8 col-md-4 mx-auto d-block"
          >
            Update Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCard;
