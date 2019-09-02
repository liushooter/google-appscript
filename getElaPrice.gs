 function addElaRecord(e) {
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getsheetbynamename

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("tab1");

  if (sheet != null) {
    // sheet.getRange('A1').setValue(getCurrTime());
    // sheet.getRange('B1').setValue(elaLastPrice());

    sheet.getCurrentCell().setValue(getCurrTime());
    sheet.getCurrentCell().offset(0, 1).setValue(elaLastPrice()); // 右一列
  }

}

function getCurrTime() { // 当前时间
  var _now = new Date();
  var now = _now.getFullYear() + "-" + (_now.getMonth() + 1) + "-" + _now.getDate() + " " + _now.getHours() + ":" + _now.getMinutes() + ":" + _now.getSeconds();

  return now;
}

function elaLastPrice() {  // 获取亦来云当前现货价格
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
  var url = "https://api.huobi.pro/market/detail?symbol=elausdt";

  var options = {
    'method' : 'get',
    'contentType': 'application/json',
  };

  var response = UrlFetchApp.fetch(url, options);
  var obj = JSON.parse(response.getContentText());
  var tick = obj['tick'];
  var id = tick['id'];
  var close = tick['close'];

  Logger.log("close: "+ close);

  return parseFloat(close);
}
