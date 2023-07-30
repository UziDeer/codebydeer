function ranInt(min, max) {
    let result = 0;
    for (let i = 0; result < min; i++) {
        result = Math.floor(Math.random() * max);
    }
    return result;
}
function NumToStr(num, len) {
    let str = '';
    for (let i = 0; i < len; i++) {
        str += '0';
    }
    str += String(num);
    return str.slice(-len);
}

const CmpElAll = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '+', '/'];
let CmpEl = CmpElAll;
function newCmp(len) {
    let result = [];
    while (result.length != len) {
        let n = CmpElAll[Math.floor(Math.random() * len)];
        if (!result.includes(n)) {
            result[result.length] = n;
        }
    }
    CmpEl = result;
}

function cmp(Code, hex) {
    Code = Number(Code);
    hex = Number(hex);
    let Expo = 0;
    for (let i = 0; hex ** i < Code; i++) {
        Expo++;
    }
    let cmpResult = '';
    let rmn = Code;
    for (let j = Expo - 1; j >= 0; j--) {
        cmpResult += CmpEl[Math.floor(rmn / (hex ** j))];
        rmn = rmn % (hex ** j);
    }
    return cmpResult;
}
function deCmp(Code, hex) {
    Code = String(Code);
    hex = Number(hex);
    let numResult = 0;
    for (let i = 0; Code.length > 0; i++) {
        for (let j = 0; Code.slice(-1) != CmpEl[j]; j++) {
            numResult += hex ** i;
        }
        Code = Code.slice(0, -1);
    }
    return numResult;
}
function EnCodeDo(before, enVar) {
    newCmp(62);
    before = String(before);
    enVar = Number(enVar);
    if (enVar < 100 || 3843 < enVar) {
        enVar = ranInt(100, 3843);
    }
    let tesText = '';
    let resText = '';
    let result = '$&空文字列です。$&';
    let CodeNum = [[''], [''], [''], [''], ['']];
    for (let i = 0; i <= Math.floor((before.length - 1) / 3); i++) {
        CodeNum[0][i] = '';
        for (let j = 0; j < 3; j++) {
            let Num = before.charCodeAt(3 * i + j) + 2 * enVar + 3;
            if (i == Math.floor((before.length - 1) / 3) && j > (before.length - 1) % 3) {
                Num = 3;
            } else if (String(Num).match(/\d{1,5}/) == null) {
                Num = 0;
                tesText += `文字"${before.slice(3 * i + j, 3 * i + j + 1)}"(${3 * i + j + 1}文字目),`;
                console.warn('使えない文字があります');
            }
            CodeNum[0][i] += NumToStr(Num, 5);
        }
        CodeNum[1][i] = ranInt(100, 1000);
        CodeNum[2][i] = Math.floor(Number(CodeNum[0][i]) / (CodeNum[1][i] ** 2 - 4));
        CodeNum[3][i] = CodeNum[0][i] % (CodeNum[1][i] ** 2 - 4);
        CodeNum[4][i] = NumToStr(cmp(CodeNum[1][i] + 8, 50), 2) + cmp(CodeNum[2][i] + 2, 62) + NumToStr(cmp(CodeNum[3][i] + 4, 60), 4);
        CodeNum[4][i] = cmp(CodeNum[4][i].length + 28, 62) + CodeNum[4][i];
    }
    resText = CodeNum[4].join('') + CmpEl.join('');
    if (tesText == '') {
        result = resText + '$&' + resText.length + '文字$&' + enVar;
    } else {
        result = resText + `$&${resText.length}文字, $e"${tesText.slice(0, -1)}"は使えない文字のため、不明文字に変換されます。$/e$&` + enVar;
    }
    if (/^\&#\[console\]/.test(before)) {
        console.log({CmpEl: CmpEl, before: before, CodeNum: CodeNum, result: result.split('$&')});
        result = '$c(ConsoleMode);$/c$&コンソールモードです。$&' + enVar;
    }
    return result.split('$&');
}
function DeCodeDo(before, enVar) {
    let consoleMode = false;
    CmpEl = before.slice(-62).split('');
    let varBefore = String(before).replace(/^\&#\[console\]/, '').slice(0, -62);
    let result = '$&空文字列です。$&';
    enVar = Number(enVar);
    let tesText = '';
    let resStr = '';
    if (enVar < 100 || 3843 < enVar) {
        result = '$&$e引数が間違っています。$/e$&';
    } else if (CmpElAll.some(el => !CmpEl.includes(el))) {
        result = '$&$eこれは暗号ではありません。$/e$&';
    } else {
        if (/^\&#\[console\]/.test(before)) {
            consoleMode = true;
        }
        let CodeNum = [[], [], [], [], []];
        let charCode = [[], []];
        for (let i = 0; varBefore.length > 0; i++) {
            let n = deCmp(varBefore.slice(0, 1), 62) - 28;
            CodeNum[0][i] = varBefore.slice(1, n + 1);
            CodeNum[1][i] = deCmp(CodeNum[0][i].slice(0, 2), 50) - 8;
            CodeNum[2][i] = deCmp(CodeNum[0][i].slice(2, -4), 62) - 2;
            CodeNum[3][i] = deCmp(CodeNum[0][i].slice(-4), 60) - 4;
            CodeNum[4][i] = NumToStr((CodeNum[1][i] ** 2 - 4) * CodeNum[2][i] + CodeNum[3][i], 15);
            for (let j = 0; j < 3; j++) {
                let len = 3 * i + j;
                charCode[0][len] = Number(CodeNum[4][i].slice(5 * j, 5 * j + 5));
                if (charCode[0][len] == 3) {
                    charCode[1][len] = '';
                } else if (charCode[0][len] == 0) {
                    charCode[1][len] = '⚠';
                    tesText += `${len + 1}文字目,`;
                } else {
                    charCode[1][len] = String.fromCharCode(charCode[0][len] - 2 * enVar - 3);
                }
            }
            varBefore = varBefore.slice(n + 1);

        }
        resStr = charCode[1].join('');
        if (tesText == '') {
            result = resStr + '$&' + resStr.length + '文字$&' + enVar;
        } else {
            result = resStr + `$&${tesText.length}文字, $e"${tesText.slice(0, -1)}"は不明文字です。$/e$&` + enVar;
        }
        if (consoleMode) {
            console.log({CmpEl: CmpEl, before: before, CodeNum: CodeNum, charCode: charCode,result: result.split('$&')});
            result = '$c(ConsoleMode);$/c$&コンソールモードです。$&' + enVar;
        }
    }
    return result.split('$&');
}