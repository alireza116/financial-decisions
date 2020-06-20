const csv = require("csvtojson");

function getReturns() {
  this.getReturns = async function (csvPath, columnName, n) {
    const getObj = async () => {
      return csv().fromFile(csvPath);
    };
    // csv()
    //   .fromFile(csvPath)
    //   .then((jsonObj) => {
    //     jsonObj.forEach((obj) => {
    //       Object.keys(obj).forEach(function (key) {
    //         obj[key] = +obj[key];
    //       });
    //     });

    //     let returns = this.bootstrap(columnName, n, jsonObj);
    //     // console.log(returns);
    //     let product = returns.reduce((product, value) => {
    //       return product * value;
    //     }, 1);
    //     let geomMean = Math.pow(product, 1 / returns.length);
    //     return {
    //       returns: returns,
    //       geomMean: geomMean,
    //     };
    //   });
    let jsonObj = await getObj();
    jsonObj.forEach((obj) => {
      Object.keys(obj).forEach(function (key) {
        obj[key] = +obj[key];
      });
    });
    // console.log(jsonObj);
    let returns = this.bootstrap(columnName, n, jsonObj);
    // console.log(returns);
    let product = returns.reduce((product, value) => {
      return product * value;
    }, 1);
    let geomMean = Math.pow(product, 1 / returns.length);
    return await {
      returns: returns,
      geomMean: geomMean,
    };
  };

  this.bootstrap = function (columnName, n, dataObj) {
    let bootstrap = [];
    // console.log(dataObj);
    for (var i = 0; i < n; i++) {
      let randomIndex = Math.floor(Math.random() * dataObj.length);
      bootstrap.push(dataObj[randomIndex]);
    }
    return bootstrap.map(function (pick) {
      return pick[columnName] + 1;
    });
  };
}

let gr = new getReturns();
let returns = gr.getReturns("./returns.csv", "treasury_10yr", 10);
// console.log(returns);
returns.then(console.log);
