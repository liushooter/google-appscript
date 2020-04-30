function addBtcPrice(e) { // Btc
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getsheetbynamename

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BTC");

  if (sheet != null) {
    // sheet.getRange('B1').setValue(elaLastPrice());

    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice("btcusdt")); // 向右一个单元格
  }
}

function addHtPrice(e) { // HT
  insertCellPrice("HT", "htusdt")
}

function addNasPrice(e) { // 星云
  insertCellPrice("NAS", "nasusdt")
}

function addEosPrice(e) { // Eos
  insertCellPrice("EOS", "eosusdt")
}

function addElaPrice(e) { // Ela 亦来云
  insertCellPrice("BTC", "elausdt")
}

function addCkbPrice(e) { // Ckb
  insertCellPrice("ckb", "ckbusdt")
}

function addBandPrice(e) { // BAND

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BAND");

  if (sheet != null) {
    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPriceByBinance("BANDUSDT"));
  }
}

function insertCellPrice(sheet_name, symbol) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);

  if (sheet != null) {
    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice(symbol));
  }
}

function getCurrTime() { // 当前时间
  var _now = new Date();
  var now = _now.format();

  Logger.log("now: " + now);
  return now;
}

function getLastPrice(symbol) { // 获取当前现货价格
  /*
  {
      "status":"ok",
      "ch":"market.btcusdt.detail",
      "ts":1567396831582,
      "tick":{
          "amount":24130.29991795428,
          "open":9093.53,
          "close":8745.28,
          "high":9187.7,
          "id":210053472405,
          "count":238168,
          "low":8702.01,
          "version":210053472405,
          "vol":216036731.61609185
      }
  }
  */
  var url = "https://api.huobi.pro/market/detail?symbol=" + symbol;

  var options = {
    'method': 'get',
    'contentType': 'application/json',
    muteHttpExceptions: true, // https://www.coder.work/article/1860288
  };

  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());

  var obj = JSON.parse(response.getContentText());
  var tick = obj['tick'];
  var close = tick['close'];

  Logger.log(symbol + " close price: " + close);

  return parseFloat(close);
}

function getLastPriceByBinance(symbol) { // 获取当前现货价格
  /*
    https://api.binance.com/api/v3/ticker/price?symbol=BANDUSDT

    {
      "symbol":"BANDUSDT",
      "price": "0.85670"
    }
  */
  var url = "https://api.binance.com/api/v3/ticker/price?symbol=" + symbol;

  var options = {
    method: 'get',
    accept: 'application/json',
    'content-type': 'application/json',
    muteHttpExceptions: true,
  };

  var resp = UrlFetchApp.fetch(url, options);
  Logger.log(resp.getContentText());

  var obj = JSON.parse(resp.getContentText());
  var price = obj['price'];

  Logger.log(symbol + " price: " + price);

  return parseFloat(price);
}

Date.prototype.format = function(format) {
  // https://segmentfault.com/q/1010000011772052
  // format="yyyy-MM-dd hh:mm:ss";

  if (!format) {
    format = "yyyy-MM-dd hh:mm:ss";
  }

  var o = {
    "M+": this.getMonth() + 1, // month
    "d+": this.getDate(), // day
    "H+": this.getHours(), // hour
    "h+": this.getHours(), // hour
    "m+": this.getMinutes(), // minute
    "s+": this.getSeconds(), // second
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    "S": this.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return format;
};
