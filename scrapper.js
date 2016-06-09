var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://twitter.com/cr7prince4ever"
  mysql = require ("mysql");

request(url, function (error, response, html) {
  if(!error)
  {
    var temp=cheerio.load(html);
    console.log(temp);
    var con = mysql.createConnection({
      host:"localhost",
      user:"root",
      database:"mysql"
    });
    con.connect(function(err){
      if(err){
        console.log("couldnt connect to db");
        return;
      }
      console.log("connection established to db");

    });

    temp('div.js-tweet-text-container').each(function(i,elem){
      //console.log(i);
      //console.log(temp(this).text());
      var t=temp(this).text();
      con.query('INSERT INTO ronaldo (tweets) values (?)', t, function(err){
        if(err) throw err;
        //console.log('Last insert ID:', res.insertId);
      });



    });
    con.end(function(err) {
    if(err){
      console.log("error terminating the connection to the db");
    }
    else{
      console.log("connection to db terminated gracefully");
    }
    });
  }
  else{
    console.log("there was an error");
  }
 });
