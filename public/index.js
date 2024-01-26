import mockData from "./mockData.js";

// sets color for each stock symbol
function stockColor(stock) {
    if (stock === 'GME') {
        return '#925E78'
    }
    if (stock === 'MSFT') {
        return '#BD93BD'
    }
    if (stock === 'DIS') {
        return '#F05365'
    }
    if (stock === 'BNTX') {
        return '#FABC2A'
    }
}

//
function getHighestValue(stockData) {
  let highestValues = {};
  
  stockData.forEach(stock => {
    let symbol = stock.meta.symbol;
    let maxHigh = 0;

    stock.values.forEach(day => {
      let high = parseFloat(day.high)
      if (high > maxHigh) {
        maxHigh = high;
      }
    });

    highestValues[symbol] = maxHigh.toFixed(2);

  });

  return highestValues

}

async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector("#highest-price-chart");
  const averagePriceChartCanvas = document.querySelector("#average-price-chart");

  // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=6d9c3e72f4d04956b9de53b24e32783b');

  // let resultData = await response.json();

  // console.log(resultData);

  // const {GME, MSFT, DIS, BNTX} = resultData;
  // const stocks = [GME, MSFT, DIS, BTNX];

  // console.log(stocks);

  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];
  console.log(stocks);

  stocks.forEach(stock => stock.values.reverse());

  // STOCK PRICE OVER TIME - CHART
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map(stock => ({
        label: stock.meta.symbol,
        data: stock.values.map(value => parseFloat(value.high)),
        backgroundColor: stockColor(stock.meta.symbol),
        borderColor: stockColor(stock.meta.symbol)
      })),
    },
  });

  // HIGHEST STOCK PRICE - CHART
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map(stock => stock.meta.symbol),
      datasets: [{
        label: 'Highest',
        data: getHighestValue(stocks),
        backgroundColor: stocks.map(stock => (stockColor(stock.meta.symbol))),
        borderColor: stocks.map(stock => (stockColor(stock.meta.symbol))),
      }]
    },
  });

  // AVERAGE STOCK PRICE - CHART
  // new Chart(averagePriceChartCanvas.getContext("2d"), {
  //   type: "pie",
  //   data: {
  //     labels: stocks.map(stock => stock.meta.symbol),
  //     datasets: [{
  //       label: 'Highest',
  //       data: getHighestValue(stocks),
  //       backgroundColor: stocks.map(stock => (stockColor(stock.meta.symbol))),
  //       borderColor: stocks.map(stock => (stockColor(stock.meta.symbol))),
  //     }]
  //   },
  // });
}

main();
