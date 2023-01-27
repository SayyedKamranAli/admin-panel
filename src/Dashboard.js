import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { addDays, format } from "date-fns";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DateRangePicker } from "react-date-range";
import * as Icon from "react-bootstrap-icons";
import Pagination from "./pagination/Pagination";
import { useMemo } from "react";
import icon1 from './image/icon/a1.PNG'
import icon2 from './image/icon/a2.PNG'
import icon3 from './image/icon/a3.PNG'



function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([]);  
  const [response, setResponse] = useState([]);
  const [values, setValues] = useState([]);
  console.log('values', values)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  let fromdate = format(new Date(state[0].startDate), "yyyy-MM-dd");
  let todate = format(new Date(state[0].endDate), "yyyy-MM-dd");
  
  const filterRow =(e)=>{
    let row = e.target.value;
    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-04-01&todate=2022-08-24&limit="+row+""
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error, "network");
      });
  }

  let PageSize = 10;
  const currentTableData = useMemo(() => {
    
    const firstPageIndex = (currentPage - 1);

    
    let lastPageIndex = "";
    lastPageIndex = datas.length;

    return datas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, datas]);

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-04-01&todate=2022-08-24"
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
        setResponse(response.data.data.pages);
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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
     axios
      .get(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate="+fromdate+"&todate="+todate+""
      )

      .then(function (response) {
        // handle success
        setDatas(response.data.data.data);
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
  }
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <div>
      <body id="page-top" style={{background:'#161d32'}}>
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <ul className={style} id="accordionSidebar">
            {/*  <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
              {/* <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh"></i>
              </div> */}
              <div className="sidebar-brand-text mx-3">Admin Panel</div>
              <div className="text-center d-none d-md-inline">
                <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={changeStyle}
                ></button>
              </div>
            </a>
            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />
            {/*  <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container ">
                {/*  <!-- Content Row --> */}
                <div className="row shadow h-100 py-2 justify-content-center " style={{background:"#283046",marginLeft: '1px', marginRight: '1px',marginTop: '6px', borderRadius: '5px'}}>
                  {/*  <!-- Earnings (Monthly) Card Example --> */}
                  <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                    <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div className="img-fluid" >
                          <img src={icon1} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                    <h6 className="text-light mt-3 mb-0"><strong>{values.totalInstall}</strong>
                      </h6>
                      <p className="text-light m-0">App Installed
                      </p> 
                      
                    </div>

                    </div>
                  </div>
                    <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                    <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div className="img-fluid" >
                          <img src={icon3} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                    <h6 className="text-light mt-3 mb-0"><strong>{values.activeinstall}</strong>
                      </h6>
                      <p className="text-light m-0">Active Installs
                      </p> 
                      
                    </div>

                    </div>    
                  </div>
                    <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                    <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div className="img-fluid" >
                          <img src={icon3} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                      <h6 className="text-light mt-3 mb-0"><strong>{values.churn}%</strong>
                      </h6>
                      <p className="text-light m-0">Churn Rate
                      </p> 
                    </div>

                    </div>
                  </div>
                   <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                   <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div  >
                          <img src={icon2} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                    <h6 className="text-light mt-3 mb-0"><strong>{values.totaluninstall}</strong>
                      </h6>
                      <p className="text-light m-0">App Un-Installed
                      </p> 
                      
                    </div>

                    </div>
                     
                        
                  </div>
                    <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                    <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div className="justify-content-center" >
                          <img src={icon3} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                    <h6 className="text-light mt-3 mb-0"><strong>{values.aliveappusers}</strong>
                      </h6>
                      <p className="text-light m-0">Alive Apps users
                      </p>          
                      
                    </div>

                    </div>
                     
                        
                  </div>
                    <div className="col-xl-4 col-sm-6 col-md-4 mb-4 ">
                    <div className="row justify-content-center">
                      <div className="col-md-2 col-xl-4 col-sm-6">
                         <div  >
                          <img src={icon3} alt='gg' style={{width:"75%"}}>
                            </img>
                        </div>
                      
                    </div>
                    <div className="col-md-6 col-xl-6 col-sm-6">
                    <h6 className="text-light mt-3 mb-0"><strong>{values.alivechurn}%</strong>
                      </h6>
                      <p className="text-light m-0">Alive Churn Rate
                      </p>
                      
                    </div>

                    </div>
                     
                        
                  </div>
                </div>
                <div className="row" >
                  {/*   <!-- Area Chart --> */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                    
                      {/*  <!-- Card Header - Dropdown --> */}
                      <div className="card-header py-3 " style={{backgroundColor:'#283046'}}>
                        <div className="row">
                            <div className="col-6">
                            <div>
                            <label style={{color:'white'}}>Show &nbsp;</label>
                            <select onChange={filterRow}>
                                <option selected value={"10"}>10</option>
                                <option value={"50"}>50</option>
                                <option value={"100"}>100</option>
                                <option value={"500"}>500</option>
                                <option value={"1000"}>1000</option>
                            </select>
                            <label style={{color:'white'}}>&nbsp; Entries</label>
                        </div>


                            </div>
                            <div className="col-6">
                            <div className="control-pane" style={{float: 'right'}}>
                          <Button style={{backgroundColor:'#283046'}} onClick={handleShow}>
                            Select Duration
                          </Button>

                          <Modal show={show} onHide={handleHide}>
                            <Modal.Header closeButton>
                              <Modal.Title>Select Duration</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <DateRangePicker
                                onChange={(item) => setState([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                              />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleHide}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
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
                          {currentTableData.map((item) => (
                            <tr>
                              <td>{format(new Date(item.created_At), "dd MMMM yyyy")}</td>
                              <td>{item.totalinstall}</td>
                              <td>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Android2 /></i>
                                {" "}{item.android_install}
                                <br></br>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Apple /></i>
                                {" "}{item.ios_install}
                              </td>
                              <td>{item.totaluninstall}</td>
                              <td>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Android2 /></i>
                                {" "}{item.android_uninstall}
                                <br></br>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Apple /></i>
                                {" "}{item.ios_uninstall}
                              </td>
                              <td>{item.totalchurn}</td>
                              <td>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Android2 /></i>
                                {" "}{item.android_churn}
                                <br></br>
                                <i className="fa-1x mx-1" style={{ color: "#ffffff" }}><Icon.Apple /></i>
                                {" "}{item.ios_churn}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
               <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount="118"
        pageSize={datas.length}
        onPageChange={(page) => setCurrentPage(page)}
      />

            </div>
            <footer className="sticky-footer bg-white">
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
        <a className="scroll-to-top rounded" href="#page-top" style={{backgroundColor:'#665ce9'}}>
          <i className="fas fa-angle-up"></i>
        </a>

       
      </body>
    </div>
  );
}

export default Dashboard;
