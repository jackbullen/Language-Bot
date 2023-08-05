const ID = 'LINK_TO_EMPTY_GSHEET';
const LINK = 'https://en.wikipedia.org/wiki/List_of_languages_by_the_number_of_countries_in_which_they_are_recognized_as_an_official_language';
const CMD = '=importHTML("'+LINK+'", "table", 3)';

function getLanguages() {
  const Sheet = SpreadsheetApp.openById(ID).getSheets()[0];
  Sheet.getRange('A1').setValue(CMD);
  
  var data = Sheet.getRange("A:A").getValues().flat().filter(a => a != '');
  data =  data.slice(data.indexOf('Name') + 1);
  
  supported_languages = [];
  for (var i = 0; i < data.length; i++){
    supported_languages[i] = `${data[i]} (-${data[i].slice(0,2)})`
        };
  Logger.log(supported_languages);
  
  for (var i = 0; i < data.length; i++){
    data[i] = `\n}else if(message.content.startsWith('elab -${data[i].slice(0,2)}')){\n\tconversationLog.push({ role: 'system',\n\tcontent: 'Further elaborate on the message in ${data[i]}'});`
        };

  out_string = "";
  data.forEach((cmd) => {
    out_string += cmd;
  })
  
  Logger.log(out_string);
}


