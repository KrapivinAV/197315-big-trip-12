import AbstractView from "./abstract.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {basisConstants, typeIcons} from "../basis-constants.js";
import {generateMoneyByTypes, generateQuantityByTypes, generateSpendTimeByTypes} from '../utils/statistics.js';

const BAR_HEIGHT = 55;

const {arrivals, vehicles} = basisConstants;

const renderMoneyByTypes = (moneyCtx, data) => {

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        padding: 35,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${typeIcons[type.toLowerCase()]} ${type.toUpperCase()}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderQuantityByTypes = (quantityCtx, data) => {
  return new Chart(quantityCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        padding: 35,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${typeIcons[type.toLowerCase()]} ${type.toUpperCase()}`;
            },
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderSpendTimeByTypes = (spendTimeCtx, data) => {
  return new Chart(spendTimeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `D ${val}`
        }
      },
      title: {
        display: true,
        text: `SPEND TIME`,
        fontColor: `#000000`,
        padding: 35,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
            callback: (type) => {
              return `${typeIcons[type.toLowerCase()]} ${type.toUpperCase()}`;
            },
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends AbstractView {
  constructor(passages) {
    super();

    this._data = passages;

    this._moneyCart = null;
    this._quantityChart = null;
    this._spendTimeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyCart !== null || this._quantityChart !== null || this._spendTimeChart !== null) {
      this._moneyCart = null;
      this._quantityChart = null;
      this._spendTimeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._quantityChart !== null || this._spendTimeChart !== null) {
      this._moneyCart = null;
      this._quantityChart = null;
      this._spendTimeChart = null;
    }

    const moneyByTypesData = generateMoneyByTypes(this._data, arrivals, vehicles);
    const quantityByTypesData = generateQuantityByTypes(this._data, vehicles);
    const spendTimeByTypesData = generateSpendTimeByTypes(this._data, arrivals, vehicles);

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const quantityCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const spendTimeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * moneyByTypesData.labels.length;
    quantityCtx.height = BAR_HEIGHT * quantityByTypesData.labels.length;
    spendTimeCtx.height = BAR_HEIGHT * spendTimeByTypesData.labels.length;

    this._moneyCart = renderMoneyByTypes(moneyCtx, moneyByTypesData);
    this._quantityChart = renderQuantityByTypes(quantityCtx, quantityByTypesData);
    this._spendTimeChart = renderSpendTimeByTypes(spendTimeCtx, spendTimeByTypesData);
  }
}
