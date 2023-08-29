document.body.outerHTML = "<body><h1>このページはもうじきクラッシュします</h1></body>";
alert("このページはもうじきクラッシュします\n後悔したくなければここでタブを消しましょう");
function getRan() {
    return String.fromCharCode(Math.floor(Math.random() * 65536));
}
for (let l = 0; l < 100000000; l += 1000000) {
    for (let k = 0; k < 1000000; k+=10000) {
        for (let j = k; j < k + 10000; j += 100) {
            for (let i = j; i < j + 100; i++) {
                console.info(getRan());
                console.log(getRan());
            }
        }
    }
}