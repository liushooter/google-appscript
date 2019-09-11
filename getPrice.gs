function addElaPrice(e) { // 亦来云
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getsheetbynamename

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("tab1");

  if (sheet != null) {
    // sheet.getRange('B1').setValue(elaLastPrice());

    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice("elausdt")); // 向右一个单元格
  }
}

function addHtPrice(e) { // HT
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HT");

  if (sheet != null) {
    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice("htusdt"));
  }
}

function addNasPrice(e) { // 星云

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NAS");

  if (sheet != null) {
    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice("nasusdt"));
  }
}

function addEosPrice(e) { // Eos
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EOS");

  if (sheet != null) {
    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(getLastPrice("eosusdt"));
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
      "ch":"market.elausdt.detail",
      "ts":1567396831582,
      "tick":{
          "amount":10365.174440816327,
          "open":2.4386,
          "close":2.3982,
          "high":2.4662,
          "id":200086625221,
          "count":5222,
          "low":2.3412,
          "version":200086625221,
          "vol":24872.076249
      }
  }
  */
  var url = "https://api.huobi.pro/market/detail?symbol=" + symbol;

  var options = {
    'method': 'get',
    'contentType': 'application/json',
  };

  var response = UrlFetchApp.fetch(url, options);
  var obj = JSON.parse(response.getContentText());
  var tick = obj['tick'];
  var close = tick['close'];

  Logger.log(symbol + " close price: " + close);

  return parseFloat(close);
}

Date.prototype.format = function(format) {
  // https://segmentfault.com/q/1010000011772052
  //eg:format="yyyy-MM-dd hh:mm:ss";

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
