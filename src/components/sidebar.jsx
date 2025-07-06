function SideBar() {
  return (
    <div className="container col-4">
      <div className="row bx-shadow mx-1 p-3 justify-content-center border border-2 rounded-3">
        <h4>Side Bar</h4>
        <div className="px-2">
          <hr />
        </div>
        <button className="btn border-secondary btn-sm mb-2 ">Button 1</button>
        <button className="btn border-secondary btn-sm mb-2 ">Button 2</button>
        <button className="btn border-secondary btn-sm mb-2 ">Button 3</button>
        <button className="btn border-secondary btn-sm mb-2 ">Button 4</button>
      </div>
    </div>
  );
}

export default SideBar;
// Compare this snippet from travelAgent/src/components/navbar.jsx:
