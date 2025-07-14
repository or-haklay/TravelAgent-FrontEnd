import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import _ from "lodash";

import ordersServices from "../../services/ordersServices";
import userService from "../../services/userServices";

import PageHeader from "../common/pageHeader";

function SetAgent({ setAgentSet, orderData }) {
  if (!orderData) return null;

  const [agents, setAgents] = useState([]);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const allUsersRawData = await userService.getAllAgents();
        const pickedAgents = allUsersRawData.map((agent) =>
          _.pick(agent, ["_id", "name", "email", "phone"])
        );
        setAgents(pickedAgents);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    };
    fetchAgents();
  }, []);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      agent: "",
    },
    validate: (values) => {
      const Schema = Joi.object({
        agent: Joi.string().hex().length(24).required().label("Agent ID"),
      });

      const { error } = Schema.validate(values, { abortEarly: false });

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
      console.log(values);
      console.log("Form Submitted:", values);
      try {
        const selectedAgent = agents.find(
          (agent) => agent._id === values.agent
        );
        console.log(selectedAgent);

        await ordersServices.setAgent(orderData._id, selectedAgent);
        setAgentSet(null);
        toast.success("Agent has been set successfully.");
      } catch (err) {
        console.error("Failed to update order:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setServerError(err.response.data.message);
          toast.error("Failed to update order.");
        }
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
    setAgentSet(null);
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
        <PageHeader title={`Set Agent:`} />
        <form
          onSubmit={formik.handleSubmit}
          className="my-2 d-flex flex-column gap-3 align-items-center
            justify-content-center"
        >
          <div className="d-flex flex-column gap-2 col-12 align-items-center justify-content-center gap-3">
            <div className="form-group mb-3 col-12">
              <label htmlFor={"status"} className="form-label">
                Agent<span className="text-danger ms-1">*</span>
              </label>
              <select
                className="form-control"
                {...formik.getFieldProps(`agent`)}
              >
                <option value="">Select</option>
                {agents.map((agent) => {
                  return (
                    <option value={agent._id} key={agent._id}>
                      {agent.name?.first} {agent.name?.last}
                    </option>
                  );
                })}
              </select>
              {getNestedError(`agent`) && (
                <div className="text-danger">{getNestedError(`agent`)}</div>
              )}
            </div>
          </div>

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
      </div>
    </div>
  );
}
export default SetAgent;
