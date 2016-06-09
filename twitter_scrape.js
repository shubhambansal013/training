function conn(){
  var mysql = require("mysql");
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
  return con;
}

function closedb(con){
  con.end(function(err) {
  if(err){
    console.log("error terminating the connection to the db");
  }
  else{
    console.log("connection to db terminated gracefully");
  }
  });
}
function main(){
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'SxocpPj8uIeLTfS7RCOaf16ui',
  consumer_secret: '9SmELAgGi60at3EDLE6ZagiMLOFNzdgLgEt5SrhMjCgi6YZqv0',
  access_token_key: '405692024-SGxzoBi6j9HFAUGZ2tZwWtIUEaDdGoK4fSW0sdHo',
  access_token_secret: 'QT3kqbFMDUFE5dXebR6yRQ9JbTtKtamVQiNCDqA0Z4qsn'
});

var params = {screen_name: 'markzuckerbergf'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    var con=conn();
    //for(j=0;j<tweets[3].entities.hashtags.length;j++)
    //console.log(tweets[3].entities.hashtags[0].text);
  for(i=0;i<tweets.length;i++)
  {
    var hasht="";
    for(j=0;j<tweets[i].entities.hashtags.length;j++)
    {
        hasht=hasht+","+tweets[i].entities.hashtags[j].text;
    }
    var tempo={tweets:tweets[i].text,hashtags:hasht};
    con.query('insert into ronaldo SET ?',tempo,function(error){
      if(error)
       throw error;
    });
  }
  closedb(con);
  }
});
}
main();
