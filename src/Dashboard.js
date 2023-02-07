import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { addDays, format } from "date-fns";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DateRangePicker } from "react-date-range";
import * as Icon from "react-bootstrap-icons";
import { useMemo } from "react";
import icon1 from "./image/icon/a1.PNG";
import icon2 from "./image/icon/a2.PNG";
import icon3 from "./image/icon/a3.PNG";
import Pagination from "./pagination/Pagination";

let PageSize = 10;

function Dashboard() {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [response, setResponse] = useState([]);
  const [values, setValues] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date("2022-04-01"),
      endDate: new Date("2022-08-24"),
      pageSize: 10,
      key: "selection",
    },
  ]);

  let fromdate = format(new Date(state[0].startDate), "yyyy-MM-dd");
  let todate = format(new Date(state[0].endDate), "yyyy-MM-dd");

  let difference = new Date(state[0].endDate).getTime() - new Date(state[0].startDate).getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  TotalDays = TotalDays + 1;

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;

    const lastPageIndex = firstPageIndex + PageSize;

    return datas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, datas]);


  useEffect(() => {
    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate="+fromdate+"&todate="+todate+"&page=1&limit="+TotalDays+""
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
        //setResponse(response.data.data.total_documents);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });

    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-04-01&todate=2022-08-24&page=1&limit=10"
      )

      .then(function (response) {
        // handle success
        setValues(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
  }, []);


  const filterRow = (e) => {
    let row = e.target.value;
    setCurrentPage(1);
    if((fromdate !== "" && todate !== "") && (format(new Date(fromdate), "yyyy") !== "2023" && format(new Date(todate), "yyyy") !== "2023")){
      axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate="+fromdate+"&todate="+todate+"&limit="+TotalDays+""
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
        setResponse(response.data.data.total_documents);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
    }
    else{
      axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate="+fromdate+"&todate="+todate+"&limit="+TotalDays+""
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
        setResponse(response.data.data.total_documents);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
    }
    PageSize = row;
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setCurrentPage(1);
    setShow(false);
    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate="+fromdate+"&todate="+todate+"&limit="+TotalDays+""
      )
      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
        setResponse(response.data.data.total_documents);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate="+fromdate+"&todate="+todate+""
      )

      .then(function (response) {
        // handle success
        setValues(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
  };
  
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  // Get the Sidebar
  var mySidebar = document.getElementById("mySidebar");

  // Get the DIV with overlay effect
  var overlayBg = document.getElementById("myOverlay");

  // Toggle between showing and hiding the sidebar, and add overlay effect
  const w3_open = () => {
    if (mySidebar.style.display === "block") {
      mySidebar.style.display = "none";
      overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = "block";
      overlayBg.style.display = "block";
    }
  };

  // Close the sidebar with the close button
  function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }
  return (
    <div>
      <body id="page-top" >
        {/*  <!-- Page Wrapper --> */}
        <div
          className="w3-bar w3-top w3-large"
          style={{ zIndex: "4" ,background: " rgb(40, 48, 70)"}}
        >
          <button
            className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-blue text-white"
            onClick={w3_open}
          >
            <i className="fa fa-bars "></i>Menu
          </button>
          <span className="w3-bar-item w3-right text-white">Logo</span>
        </div>

        {/* <!-- Sidebar/menu --> */}
        <nav
          className="w3-sidebar w3-collapse w3-animate-left"
          style={{
            zIndex: "3",
            width: "300px",
            background: " rgb(40, 48, 70)",
          }}
          id="mySidebar"
        >

          <div className="w3-container">
            <h6 className="text-white">Dashboard</h6>
          </div>
          <div className="w3-bar-block">
            <a href="#" className="w3-bar-item w3-button w3-padding w3-blue">
              <i className="fa fa-users fa-fw"></i>Overview
            </a>
            <a
              href="#"
              className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black"
              onClick={w3_close}
              title="close menu"
            >
              <i className="fa fa-remove fa-fw"></i>Close Menu
            </a>
            <br />
          </div>
        </nav>

        {/* <!-- Overlay effect when opening sidebar on small screens --> */}
        <div
          className="w3-overlay w3-hide-large w3-animate-opacity"
          onClick={w3_close}
          style={{ cursor: "pointer" }}
          title="close side menu"
          id="myOverlay"
        ></div>
        <div class="w3-main" style={{ marginLeft: "300px", marginTop: "43px" }}>
          <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              {/*  <!-- Main Content --> */}
              <div id="content">
                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid ">
                  {/*  <!-- Content Row --> */}
                  <div
                    className="row shadow h-100 py-2 justify-content-center "
                    style={{
                      background: "#283046",
                      marginLeft: '1px',
                      marginRight: '1px',
                      marginTop: '15px',
                      marginBottom: '7px',
                      borderRadius: '5px'
                    }}
                  >
                    {/*  <!--  Card Example --> */}
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4 ">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div>
                            <img src={icon1} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.totalInstall}</strong>
                          </h6>
                          <p className="text-light m-0">App Installed</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4 ">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div>
                            <img src={icon3} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.activeinstall}</strong>
                          </h6>
                          <p className="text-light m-0">Active Installs</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4 ">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div className="img-fluid">
                            <img src={icon3} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.churn}%</strong>
                          </h6>
                          <p className="text-light m-0">Churn Rate</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4 ">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div>
                            <img src={icon2} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.totaluninstall}</strong>
                          </h6>
                          <p className="text-light m-0">App Un-Installed</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4 ">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div className="justify-content-center">
                            <img src={icon3} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.aliveappusers}</strong>
                          </h6>
                          <p className="text-light m-0">Alive Apps users</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6 mb-4">
                      <div className="row justify-content-center">
                        <div className="col-md-2 col-xl-4 col-4">
                          <div>
                            <img src={icon3} alt="gg"></img>
                          </div>
                        </div>
                        <div className="col-md-6 col-xl-6 col-6">
                          <h6 className="text-light mt-1 mb-0">
                            <strong>{values.alivechurn}%</strong>
                          </h6>
                          <p className="text-light m-0">Alive Churn Rate</p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                  </div>
                  <div className="row">
                    {/*   <!-- Area Chart --> */}
                    <div className="col-xl-12 col-lg-12">
                      <div className="card shadow mb-4">
                        {/*  <!-- Card Header - Dropdown --> */}
                        <div
                          className="card-header py-3 "
                          style={{ backgroundColor: "#283046" }}
                        >
                          <div className="row">
                            <div className="col-7 mt-1">
                              <div className="textSize">
                                <label className="text-white">
                                  Show &nbsp;
                                </label>
                                <select className="text-black" onChange={filterRow}>
                                  <option selected value={"10"}>
                                    10
                                  </option>
                                  <option value={"50"}>50</option>
                                  <option value={"100"}>100</option>
                                  <option value={"500"}>500</option>
                                  <option value={"1000"}>1000</option>
                                </select>
                                <label style={{ color: "white" }}>
                                  &nbsp; Entries
                                </label>
                              </div>
                            </div>
                            <div className="col-5">
                              <div
                                className="control-pane"
                                style={{ float: "right" }}
                              >
                                <label for="selectDate" style={{color:"white"}}>Select Date</label>
                                <Button
                                  id="selectDate"
                                  style={{ backgroundColor: "#283046" }}
                                  className="size"
                                  onClick={handleShow}
                                >
                                  {format(new Date(state[0].startDate), "dd/MM/yyyy")} - {format(new Date(state[0].endDate), "dd/MM/yyyy")}
                                </Button>

                                <Modal show={show} onHide={handleHide}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Select Duration</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body style={{overflow:'auto'}}>
                                    <DateRangePicker
                                      onChange={(item) =>
                                        setState([item.selection])
                                      }
                                      showSelectionPreview={true}
                                      moveRangeOnFirstSelection={false}
                                      months={2}
                                      ranges={state}
                                      direction="horizontal"
                                    />
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={handleHide}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={handleClose}
                                    >
                                      Save Changes
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*  <!-- Card Body --> */}

                        <Table responsive striped bordered hover variant="dark">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day Installs</th>
                              <th>Plateform</th>
                              <th>Day Uninstalls</th>
                              <th>Plateform</th>
                              <th>Churn Rate</th>
                              <th>Churn Plateform</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentTableData.map((item , key) => (
                              <tr key={key}>
                                <td>
                                  {format(
                                    new Date(item.created_At),
                                    "dd MMMM yyyy"
                                  )}
                                </td>
                                <td>{item.totalinstall}</td>
                                <td>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Android2 />
                                  </i>{" "}
                                  {item.android_install}
                                  <br></br>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Apple />
                                  </i>{" "}
                                  {item.ios_install}
                                </td>
                                <td>{item.totaluninstall}</td>
                                <td>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Android2 />
                                  </i>{" "}
                                  {item.android_uninstall}
                                  <br></br>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Apple />
                                  </i>{" "}
                                  {item.ios_uninstall}
                                </td>
                                <td>{item.totalchurn}</td>
                                <td>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Android2 />
                                  </i>{" "}
                                  {item.android_churn}%<br></br>
                                  <i
                                    className="fa-1x mx-1"
                                    style={{ color: "#ffffff" }}
                                  >
                                    <Icon.Apple />
                                  </i>{" "}
                                  {item.ios_churn}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={datas.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
                <div className="pagination"></div>

              <footer className="sticky-footer bg-white" >
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2023</span>
                  </div>
                </div>
              </footer>
              {/* <!-- End of Footer --> */}
            </div>
            {/*  <!-- End of Content Wrapper --> */}
          </div>
          {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
          <a
            className="scroll-to-top rounded"
            href="#page-top"
            style={{ backgroundColor: "#665ce9" }}
          >
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;


