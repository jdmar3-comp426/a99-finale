

const upgrade = document.getElementById("upgrade");
const rameses = document.getElementById("rameses");
var level = 1;
var score = 0;

upgrade.onclick = e => level++;

rameses.onclick = e => score+= level*1;
