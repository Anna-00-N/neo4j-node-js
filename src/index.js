const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt+s://00b948e12e3df4cce12c8d0c12fe5b74.neo4jsandbox.com:7687",
  neo4j.auth.basic("neo4j", "distributors-preparation-pans"),
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);

const session = driver.session({ database: "neo4j" });

document.write(
  "<div id='search'>Введите запрос:<br><br><textarea style='width:90%;height:50px' id='q'></textarea><br>"
);
document.write("<br><button id='send'>Отправить</button><br><br><hr>");
document.write("<div id='result'></div>");

document.getElementById("send").addEventListener("click", function (e) {
  var quer = document.getElementById("q").value;
  var elem = document.getElementById("result");
  document.getElementById("send").disabled = true;
  elem.innerHTML = "";
  elem.innerHTML += "</div>Выполнен запрос: <b>" + quer + "</b><br>";
  elem.innerHTML +=
    "<img id='preload' src='https://knowledg.co/Content/img/page-loader.gif' style='width:100px;height:80px;mergin-top:150px;margin-left:40%;'></img>";
  /*MATCH (n)-[r:FRIEND]->(m)
RETURN n,r, m 

MATCH (n{name:"You"})-[m:FRIEND]->(r)
RETURN n,m,r
*/
  session
    .run(quer)
    .then((result) => {
      elem.innerHTML += "<hr>Получены данные:<br><hr>";
      result.records.forEach((record) => {
        elem.innerHTML += record.get("n") + "<br><br>";
        //elem.innerHTML += record.get("r") + "<br><br>";
        //elem.innerHTML += record.get("m") + "<br><hr>";
      });
      //session.close();
      //driver.close();
      document.getElementById("preload").hidden = true;
      document.getElementById("send").disabled = false;
    })
    .catch((error) => {
      elem.innerHTML += error;
      document.getElementById("preload").hidden = true;
      document.getElementById("send").disabled = false;
    });

  //driver.close();
});
