let langage = "ja";
let nowUrl = String(location);
let reqestStr = nowUrl.split("//")[1].split("/");
let reqestFile = reqestStr[1];
for (let f = 2; f < reqestStr.length; f++) {
    reqestFile += "/" + reqestStr[f];
};
let resParams = new URLSearchParams(nowUrl.split("?")[1]);
let transSet = [["sch", "http"], ["sl", "auto"], ["tl", langage]];
for (let i = 0; i < transSet.length; i++) {
    const el = transSet[i];
    resParams.append("_x_tr_" + el[0], el[1]);
};
window.open("https://" + reqestStr[0].replaceAll(".", "-") + ".translate.goog/" + reqestFile + "?" + resParams.toString(), "_blank");
window.location.reload();