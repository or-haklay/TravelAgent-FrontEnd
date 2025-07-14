import PageHeader from "../common/pageHeader";

function ContactStatus({ setContactStatus, Data }) {
  const handleClose = () => {
    setContactStatus(null);
  };

  if (!Data) return null;

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
        <PageHeader title={"Contact"} />
        {Data == "null" ? (
          "There Is No Contact Info Yet... "
        ) : (
          <>
            <p>
              <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
              {Data.name || "N/A"}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
              {Data.email || "N/A"}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
              {Data.phone || "N/A"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
export default ContactStatus;
