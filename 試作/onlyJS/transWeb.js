function _cbd_tr() {
let _cbd_la = "ja";
let _cbd_par = new URLSearchParams(location.search);
[["sch", location.protocol.slice(0, -1)], ["sl", "auto"], ["tl", _cbd_la]].forEach(el => {_cbd_par.append("_x_tr_" + el[0], el[1])});
window.open("https://" + location.host.replaceAll("-", "--").replaceAll(".", "-") + ".translate.goog" + location.pathname + "?" + _cbd_par.toString(), "_blank");
}
_cbd_tr();