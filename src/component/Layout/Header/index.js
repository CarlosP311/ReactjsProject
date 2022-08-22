import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../constants";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slice/authSlice";

const Header = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="zl_all_page_heading_section">
        <div className="zl_all_page_heading">
          <h2>{props.name}</h2>
          {/* <p>Lorem Ipsum is simply dummy text of the printing & industry.</p> */}
        </div>
        <div className="zl_all_page_notify_logout_btn">
          {/* <Dropdown className="zl_all_page_notification_dropdown">
            <Dropdown.Toggle id="dropdown-basic">
              {notificationIcon}
              15
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="zl_all_page_notification_body">
                <h2 className="zl_all_page_notification_heading">
                  NOTIFICATIONS
                </h2>
                <div className="zl_all_page_notification_list">
                  <img
                    src="assets/image/Avatar.png"
                    alt="user-img"
                    className="zl_all_page_notification_user_img"
                  />
                  <div className="zl_all_page_notification_list_body">
                    <h3 className="zl_all_page_notification_list_heading">
                      Clifford Hale
                      <span>Sent you a message</span>
                    </h3>
                    <p className="zl_all_page_notification_list_peregraph">
                      Lorem Ipsum is simply dummy text of industry.?
                    </p>
                    <span className="zl_all_page_notification_list_time">
                      2 hours ago
                    </span>
                  </div>
                  <Button className="zl_all_page_notification_list_more_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="zl_all_page_notification_list">
                  <div className="zl_all_page_notification_user_img zl_user_green_bg">
                    L
                  </div>
                  <div className="zl_all_page_notification_list_body">
                    <h3 className="zl_all_page_notification_list_heading">
                      Lottie Marsh
                      <span>Sent you a coin</span>
                    </h3>
                    <p className="zl_all_page_notification_list_peregraph">
                      Lorem Ipsum is simply dummy text of industry.?
                    </p>
                    <div className="zl_all_page_notification_list_price">
                      <p>
                        +380.234<span>LTC</span>
                      </p>
                      <Link to={"/dashboard"}>Open my wallet</Link>
                    </div>
                    <span className="zl_all_page_notification_list_time">
                      3 hours ago
                    </span>
                  </div>
                  <Button className="zl_all_page_notification_list_more_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="zl_all_page_notification_list">
                  <div className="zl_all_page_notification_user_img zl_user_pink_bg">
                    B
                  </div>
                  <div className="zl_all_page_notification_list_body">
                    <h3 className="zl_all_page_notification_list_heading">
                      BTC
                      <span>News</span>
                    </h3>
                    <p className="zl_all_page_notification_list_peregraph">
                      Lorem Ipsum is simply dummy text of industry.?
                    </p>
                    <div className="zl_all_page_notification_list_price">
                      <Sparklines
                        data={[0, 5, 0, 15, 12, 14]}
                        margin={6}
                        className="zl_add_currency_mini_chart"
                      >
                        <SparklinesLine
                          style={{
                            strokeWidth: 10,
                            stroke: "#309AFF",
                            fill: "none",
                            curve: "smooth",
                          }}
                        />
                        <SparklinesSpots
                          size={4}
                          style={{
                            stroke: "#309AFF",
                            strokeWidth: 3,
                            fill: "white",
                          }}
                        />
                      </Sparklines>
                      <p>
                        +39.69%<span>LTC</span>
                      </p>
                      <Link to={"/dashboard"}>Trade now</Link>
                    </div>
                    <span className="zl_all_page_notification_list_time">
                      3 hours ago
                    </span>
                  </div>
                  <Button className="zl_all_page_notification_list_more_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="zl_all_page_notification_list">
                  <img
                    src="assets/image/Avatar.png"
                    alt="user-img"
                    className="zl_all_page_notification_user_img"
                  />
                  <div className="zl_all_page_notification_list_body">
                    <h3 className="zl_all_page_notification_list_heading">
                      Clifford Hale
                      <span>Sent you a message</span>
                    </h3>
                    <p className="zl_all_page_notification_list_peregraph">
                      Lorem Ipsum is simply dummy text of industry.?
                    </p>
                    <div className="zl_all_page_notification_list_price">
                      <p>
                        +380.234<span>LTC</span>
                      </p>
                      <Link to={"/dashboard"}>Open my wallet</Link>
                    </div>
                    <span className="zl_all_page_notification_list_time">
                      2 hours ago
                    </span>
                  </div>
                  <Button className="zl_all_page_notification_list_more_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </div>
                <div className="zl_all_page_notification_more_list_btn">
                  <Link to={"/dashboard"}>See All</Link>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown> */}
          <Link
            to={routes.welcomePage}
            onClick={logoutHandler}
            className="zl_all_page_logout_btn"
          >
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
