import React, { useState, useEffect, Component } from "react";
import Loader from "../Common/Loader";
import moment from "moment";
import TotalCardMonthly from "./TotalCard";
import CategoryTotalCardMonthly from "./CategoryTotalCard";
import DoughnutChart from "./DoughnutChartMonthly";
import DoughnutChartDir from "./DoughnutChartDaily";
import LineChartExpenseTimeline from "./LineChartTimeline";
import MonthLimitWarning from "./MonthLimitWarning";
import MobileExpenseTableDaily from "./MobileExpenseTableDaily";
import MobileExpenseTableMonthly from "./MobileExpenseTableMonthly";
import MonthExpenseTable from "./MonthExpenseTable";
import DailyExpenseTable from "./DailyExpenseTable";
import GenerateExcelDaily from "./GenerateExcelDaily";
import GenerateExcelMonthly from "./GenerateExcelMonthly";
import * as utils from "../Util";
import * as analytics from "./../../analytics/analytics";
import DailyTotalCalenderDir from "./DailyTotalCalender";
import TotalCardDaily from "../DailyView/TotalCard";
import CategoryTotalCardDaily from "./CategoryTotalCardDaily";

class OverallStatistic extends Component {
  constructor(props) {
    super(props);
    function parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {},
        i,
        n,
        v,
        nv;

      if (query === url || query === "") return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
    }
    var urlString = window.location.href;
    var urlParams = parseURLParams(urlString);

    this.state = {
      year: new Date().getFullYear().toString(),
      month: new Date().getMonth().toString(),
      convertedCurrency: null,
      currentMode: "daily",
      date: urlParams ? moment(urlParams.date[0]) : moment(),
      updateDoughnutDate:
        (new Date().getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        new Date().getDate().toString().padStart(2, "0") +
        "/" +
        new Date().getFullYear().toString(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleLeftArrowCalender() {
    if (this.state.month === "0") {
      this.setState({
        month: "11",
        year: (Number(this.state.year) - 1).toString(),
      });
    } else {
      this.setState({
        month: (Number(this.state.month) - 1).toString(),
      });
    }
  }

  handleRightArrowCalender() {
    if (this.state.month === "11") {
      this.setState({
        year: (Number(this.state.year) + 1).toString(),
        month: "0",
      });
    } else {
      this.setState({
        month: (Number(this.state.month) + 1).toString(),
      });
    }
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();

    // if travel mode then convert currency else set to 1
    if (this.props.settings && this.props.settings.travelMode === "on") {
      function returnCur(cur) {
        switch (cur) {
          case "Indian Rupees":
            return "INR";
          case "US Dollars":
            return "USD";
          case "Pounds":
            return "EUR";
          case "Euro":
            return "EUR";
          case "Yen":
            return "YER";
          default:
            return "INR";
        }
      }

      const fromcur = returnCur(this.props.settings.fromCurrency);
      const tocur = returnCur(this.props.settings.currency);

      fetch(
        `https://free.currencyconverterapi.com/api/v5/convert?q=${fromcur}_${tocur}&compact=y&apiKey=${process.env.REACT_APP_FREE_CURRENCY_CONVERTER_API_KEY}`
      )
        .then((resp) => resp.json()) // Transform the data into json
        .then((data) => {
          this.setState({
            convertedCurrency: Object.values(data)[0].val,
          });
        })
        .catch(() => {
          alert(
            "Some Problem with the currency converter api. Values will Fallback to default currency"
          );
          this.setState({ convertedCurrency: 1 });
        });
    } else {
      this.setState({ convertedCurrency: 1 });
    }
  }
  returnDailyDiv() {
    console.log("return daily");
    return <h1>Daily</h1>;
  }

  returnMonthlyDiv() {
    console.log("return monthly");
    return <div></div>;
  }

  switchDaily() {
    if (this.state.currentMode == "monthly") {
      this.setState({ currentMode: "daily" });
    }
  }
  switchMonthly() {
    if (this.state.currentMode == "daily") {
      this.setState({ currentMode: "monthly" });
    }
  }
  render() {
    console.log("Chcling..................");
    console.log(JSON.stringify(this.props.expenses, null, 2));

    console.log("check state: " + this.state.updateDoughnutDate);
    const Header = {
      background: "#887657",
      color: "#fff",
      padding: "15px",
      margin: "0 0 15px 0",
      borderRadius: "5px",
    };

    const pad15 = {
      padding: "15px",
    };

    const pad15Tab = {
      padding: "15px",
    };

    const form = {
      padding: "15px 0 0 0",
    };

    const styleFromSettings = {
      fontFamily: this.props.settings ? this.props.settings.font : "sans-serif",
      backgroundColor: this.props.settings
        ? this.props.settings.mode === "night"
          ? "#484842"
          : "auto"
        : "auto",
      minHeight: "91vh",
    };

    const nmBgForCharts = {
      backgroundColor: this.props.settings
        ? this.props.settings.mode === "night"
          ? "#2C3034"
          : "#EDF0EF"
        : "#EDF0EF",
      padding: "15px",
      margin: "15px 0",
    };

    const nmBgForChartsBottom = {
      backgroundColor: this.props.settings
        ? this.props.settings.mode === "night"
          ? "#2C3034"
          : "#EDF0EF"
        : "#EDF0EF",
      padding: "15px",
      marginBottom: "15px",
    };

    const nmBgForChartsTab = {
      padding: "15px",
      marginBottom: "0px",
      marginTop: "15px",
      paddingBottom: "0px",
    };

    const white = {
      color: this.props.settings
        ? this.props.settings.mode === "night"
          ? "#fff"
          : "#000"
        : "#000",
    };

    const monthDropdown = {
      display: "inline-block",
      width: window.screen.width > 760 ? "60%" : "50%",
      padding: "0",
      border: "0",
    };

    const yearDropdown = {
      display: "inline-block",
      width: "35%",
      padding: "0",
      border: "0",
    };

    const leftIcon = {
      display: "inline-block",
      padding: "0",
      border: "3px solid rgb(51, 55, 69)",
      borderTop: "4px solid rgb(51, 55, 69)",
      fontSize: "25px",
      width: window.screen.width > 760 ? "100%" : "7.5%",
      background: "#333745",
      color: "#DC965A",
      textAlign: "center",
      cursor: "pointer",
    };

    const rightIcon = {
      display: "inline-block",
      padding: "0",
      fontSize: "25px",
      textAlign: "center",
      width: window.screen.width > 760 ? "100%" : "7.5%",
      border: "3px solid rgb(51, 55, 69)",
      borderTop: "4px solid rgb(51, 55, 69)",
      borderRight: "none",
      background: "#333745",
      color: "#DC965A",
      cursor: "pointer",
    };

    const monthField = {
      background: "#333745",
      border: "1px solid #333745",
      color: "#EDD382",
      width: "100%",
      fontSize: "25px",
      letterSpacing: "1px",
      padding: "6px",
      borderRadius: "0",
    };

    const dateField = {
      fontSize: "25px",
      letterSpacing: "2px",
      borderRadius: "0",
      padding: "6px",
      width: "100%",
      border: "1px solid #333745",
      background: "#333745",
      color: "#C8E9A0",
    };

    const inputNightMode = {
      color: "#495057",
      border: "1px solid #fff",
      height: "auto",
    };

    const inputDayMode = {
      background: "#fff",
      color: "#495057",
      border: "1px solid #fff",
      height: "auto",
    };

    const handleDataFromChild = (data) => {
      console.log("Find data: " + data);
      this.setState({ updateDoughnutDate: data });
    };

    const rightCol = {
      paddingLeft: "0",
    };

    if (this.props.settings && this.props.cards) {
      return (
        <div className="container-fluid" style={styleFromSettings}>
          <div className="row">
            <div className="col-sm-4 mobileNoPadding">
              <form style={form} className="mobileNoPadding">
                {/* <div style={Header}> View your expenses of a particular month </div> */}

                <div
                  className="col-md-1 col-xs-1"
                  style={leftIcon}
                  onClick={this.handleLeftArrowCalender.bind(this)}
                  id="leftArrowIcon"
                >
                  <i className="fa fa-caret-left" />
                </div>
                <div className="col-md-7 col-xs-5" style={monthDropdown}>
                  <select
                    name="month"
                    value={this.state.month}
                    onChange={this.handleChange.bind(this)}
                    style={{
                      ...(this.props.settings.mode === "night"
                        ? inputNightMode
                        : inputDayMode),
                      ...monthField,
                    }}
                  >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </select>
                </div>
                <div className="col-md-3 col-xs-5" style={yearDropdown}>
                  <select
                    name="year"
                    value={this.state.year}
                    onChange={this.handleChange.bind(this)}
                    style={{
                      ...(this.props.settings.mode === "night"
                        ? inputNightMode
                        : inputDayMode),
                      ...dateField,
                    }}
                  >
                    {utils.yearsGenereator().map((elem, i) => (
                      <option value={elem} key={i}>
                        {elem}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="col-md-1 col-xs-1"
                  style={rightIcon}
                  onClick={this.handleRightArrowCalender.bind(this)}
                  id="rightArrowIcon"
                >
                  <i className="fa fa-caret-right" />
                </div>
              </form>
              {this.state.currentMode === "daily" ? (
                <DailyTotalCalenderDir
                  expenses={this.props.expenses}
                  authUser={this.props.user}
                  month={this.state.month}
                  year={this.state.year}
                  settings={this.props.settings}
                  onDataFromChild={handleDataFromChild}
                  selectedDate={this.state.updateDoughnutDate}
                  isMonthly={false}
                />
              ) : (
                <DailyTotalCalenderDir
                  expenses={this.props.expenses}
                  authUser={this.props.user}
                  month={this.state.month}
                  year={this.state.year}
                  settings={this.props.settings}
                  onDataFromChild={handleDataFromChild}
                  selectedDate={this.state.updateDoughnutDate}
                  isMonthly={true}
                />
              )}
              {this.state.currentMode === "monthly" ? (
                <div>
                  <MonthLimitWarning
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                  />

                  <TotalCardMonthly
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                    cards={this.props.cards}
                  />
                  <CategoryTotalCardMonthly
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    cards={this.props.cards}
                    settings={this.props.settings}
                  />
                </div>
              ) : (
                <div>
                  <TotalCardDaily
                    expenses={this.props.expenses}
                    date={this.state.updateDoughnutDate}
                    authUser={this.props.user}
                    settings={this.props.settings}
                    cards={this.props.cards}
                  />
                  <CategoryTotalCardDaily
                    expenses={this.props.expenses}
                    date={this.state.updateDoughnutDate}
                    authUser={this.props.user}
                    cards={this.props.cards}
                    settings={this.props.settings}
                  />
                </div>
              )}
            </div>
            <div className="col-sm-8 mobileNoPadding" style={rightCol}>
              <div
                style={nmBgForChartsTab}
                class="nav nav-tabs border-0 p-0"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={this.switchDaily.bind(this)}
                >
                  Daily
                </button>
                <button
                  class="nav-link"
                  id="nav-contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                  onClick={this.switchMonthly.bind(this)}
                >
                  Monthly
                </button>
              </div>
              {this.state.currentMode === "daily" ? (
                <div
                  className="col-sm-12 mobileNoPadding"
                  style={
                    this.props.settings.mode === "night"
                      ? nmBgForChartsBottom
                      : pad15
                  }
                >
                  <DoughnutChartDir
                    expenses={this.props.expenses}
                    date={this.state.date.format("MM/DD/YYYY")}
                    trynewdate={this.state.updateDoughnutDate}
                    authUser={this.props.user}
                    settings={this.props.settings}
                  />
                </div>
              ) : (
                <div
                  style={
                    this.props.settings.mode === "night"
                      ? nmBgForChartsBottom
                      : pad15
                  }
                  className="mobileNoPadding"
                >
                  <LineChartExpenseTimeline
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                  />
                  <DoughnutChart
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                  />
                </div>
              )}
              {this.state.currentMode === "daily" ? (
                <GenerateExcelDaily
                  expenses={this.props.expenses}
                  date={this.state.updateDoughnutDate}
                  authUser={this.props.user}
                  settings={this.props.settings}
                />
              ) : (
                <GenerateExcelMonthly
                  expenses={this.props.expenses}
                  authUser={this.props.user}
                  month={this.state.month}
                  year={this.state.year}
                  settings={this.props.settings}
                  style={{ marginTop: "100px" }}
                />
              )}

              {this.state.convertedCurrency ? (
                this.state.currentMode === "daily" ? (
                  window.screen.width > 720 ? (
                    <DailyExpenseTable
                      expenses={this.props.expenses}
                      date={this.state.updateDoughnutDate}
                      authUser={this.props.user}
                      settings={this.props.settings}
                      convertedCurrency={this.state.convertedCurrency}
                    />
                  ) : (
                    <MobileExpenseTableDaily
                      expenses={this.props.expenses}
                      authUser={this.props.user}
                      date={this.state.updateDoughnutDate}
                      settings={this.props.settings}
                      convertedCurrency={this.state.convertedCurrency}
                    />
                  )
                ) : window.screen.width > 720 ? (
                  <MonthExpenseTable
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                    convertedCurrency={this.state.convertedCurrency}
                  />
                ) : (
                  <MobileExpenseTableMonthly
                    expenses={this.props.expenses}
                    authUser={this.props.user}
                    month={this.state.month}
                    year={this.state.year}
                    settings={this.props.settings}
                    convertedCurrency={this.state.convertedCurrency}
                  />
                )
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  }
}

export default OverallStatistic;
