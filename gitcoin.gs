function version() {
  version = "0.0.9"
  Logger.log("version: "+ version)
  return version
}

function insertGrantList() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1]

  var selection = sheet.getSelection()
  var activeRange = selection.getActiveRange()

  var list = activeRange.getValues()

  for (const ele of list) {
    var grantId = ele[0].split("/")[4]
    var grant = getGitcoinById(grantId)

    var lastRow = newSheet.getLastRow();
    var lastCell = newSheet.getRange(lastRow, 1)

    lastCell.offset(1, 0).setValue(grantId)
    lastCell.offset(1, 1).setValue(grant['title'])
    lastCell.offset(1, 2).setValue(grant['tags'].join(','))
    lastCell.offset(1, 3).setValue(grant['website'])
    lastCell.offset(1, 4).setValue(grant['walletAddress'])
    lastCell.offset(1, 5).setValue(grant['twitter'])
    lastCell.offset(1, 6).setValue(grant['region'])
    lastCell.offset(1, 7).setValue(grant['lastUpdated'])
    lastCell.offset(1, 8).setValue(grant['fundsReceivedFromAllContributors'])
    lastCell.offset(1, 9).setValue(grant['members'].join(","))
    lastCell.offset(1, 10).setValue(grant['github'])
    lastCell.offset(1, 11).setValue(grant['introduction'])
  }
}

function insertGrant() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("")
  var newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("")

  if (sheet != null) {

    var currCell = sheet.getCurrentCell()
    var content = currCell.getValue()
    var grantId = content.split("/")[4]
    var grant = getGitcoinById(grantId)

    var lastRow = newSheet.getLastRow();
    var lastCell = newSheet.getRange(lastRow, 1)

    lastCell.offset(1, 0).setValue(grantId)
    lastCell.offset(1, 1).setValue(grant['title'])
    lastCell.offset(1, 2).setValue(grant['tags'].join(','))
    lastCell.offset(1, 3).setValue(grant['website'])
    lastCell.offset(1, 4).setValue(grant['walletAddress'])
    lastCell.offset(1, 5).setValue(grant['twitter'])
    lastCell.offset(1, 6).setValue(grant['region'])
    lastCell.offset(1, 7).setValue(grant['lastUpdated'])
    lastCell.offset(1, 8).setValue(grant['fundsReceivedFromAllContributors'])
    lastCell.offset(1, 9).setValue(grant['members'].join(","))
    lastCell.offset(1, 10).setValue(grant['github'])
    // lastCell.offset(1, 11).setValue(grant['introduction'])
  }
}


function getGitcoinById(grantId) {
  // https://gitcoin.co/grants/v1/api/grant/187/
  var url = "https://gitcoin.co/grants/v1/api/grant/" + grantId + "/";

  var options = {
    'method': 'get',
    'contentType': 'application/json',
    muteHttpExceptions: true,
  };

  var resp = UrlFetchApp.fetch(url, options);
  Logger.log(resp.getContentText());

  var obj = JSON.parse(resp.getContentText());
  var status = obj['status'];

  var newGrant = {}

  if (200 == status) {
    var grant = obj['grants']

    var title = grant['title']

    var _tags = grant['grant_tags']
    var tags = []
    for (const item of _tags) {
      tags.push(item.fields['name'])
    }

    var website = grant['reference_url']
    var walletAddress = grant['admin_address']
    var twitter = grant['twitter_handle_1']
    var region = null
    if (grant['region'] != null) {
      region = grant['region']['label']
    }

    var lastUpdated = grant['last_update']
    var fundsReceivedFromAllContributors = grant['funding_info']

    var _members = grant['team_members']
    var members = []
    for (const item of _members) {
      members.push(item['fields']['handle'])
    }

    var githubUrl = grant['github_project_url']
    var introduction = grant['description']

    newGrant['title'] = title
    newGrant['website'] = website
    newGrant['tags'] = tags
    newGrant['members'] = members
    newGrant['walletAddress'] = walletAddress
    newGrant['twitter'] = "https://twitter.com/" + twitter
    newGrant['region'] = region
    newGrant['lastUpdated'] = lastUpdated
    newGrant['fundsReceivedFromAllContributors'] = fundsReceivedFromAllContributors
    newGrant['github'] = githubUrl
    newGrant['introduction'] = introduction
  } else {
    Logger.log("http status:" + status);
  }

  return newGrant
}