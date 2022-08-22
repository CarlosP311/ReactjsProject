import React, { useState } from "react";
import HeadingModule from "../../component/Layout/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { CurrencyList } from "../../component/Common/Currency/CurrencyList";
import { DashboardData } from "../../constantsData";

const Dashboard = () => {
  // date picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [totalBalance, setTotalBalance] = useState(0);

  // chart
  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
      stacked: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      borderColor: "#999",
      yAxisIndex: 0,
      type: "datetime",
      min: new Date("01 Mar 2012").getTime(),
      tickAmount: 6,
      x: new Date("14 Nov 2012").getTime(),
      label: {
        show: true,
        text: "Support",
        style: {
          colors: ["#fff"],
          background: "#00E396",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    series: [
      {
        name: "series-1",
        type: "area",
        data: DashboardData,
      },
    ],
  };
  return (
    <>
      <section className="zl_dashboard_page">
        <HeadingModule name={"Dashboard"} />
        <div className="zl_all_page_comman_content">
          <div className="zl_chart_box_heading_date">
            <h2 className="zl_chart_box_heading">Revenue</h2>
            <div className="zl_dashboard_datepicker position-relative">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                dateFormat="MMM, yyyy"
              />
            </div>
          </div>
          <div className="zl_dashboard_chart">
            <Chart
              options={options}
              series={options.series}
              type="area"
              height={350}
            />
          </div>
          <div className="zl_all_page_comman_total_price">
            <p className="zl_all_page_total_price_heading">Total Revenue</p>
            <h2 className="zl_all_page_total_price_text">
              ${totalBalance.toFixed(4)}
            </h2>
            {/* <span className="zl_all_page_total_price_up_text">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6.66668V1.33334"
                  stroke="#50E2C2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 3.33334L4 1.33334L6 3.33334"
                  stroke="#50E2C2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              7,00%
            </span> */}
          </div>
        </div>
        <div className="zl_add_currency_content">
          <h3 className="zl_bottom_content_heading">Wallets</h3>
          <div className="zl_add_currency_row row">
            <CurrencyList
              setTotalBalance={setTotalBalance}
              updateBalance={true}
            />
            <div className="zl_add_currency_column col">
              <Link
                to={routes.addCurrencyPage}
                className="zl_add_currency_btn_content"
              >
                + Add Currency
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
