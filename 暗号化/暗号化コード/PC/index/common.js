function inputFile(file) {
    let idFile = file.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
        document.getElementById('before').value = fileReader.result;
    }
    fileReader.readAsText(idFile);
}

function copyTxt(afterId, TesTxtId) {
    let div = document.getElementById(String(afterId)).innerText;
    let Test = document.getElementById(String(TesTxtId));
    if (div == '\n') {
        Test.innerText = '暗号が生成されていません✖';
    } else {
        try {
            navigator.clipboard.writeText(div);
            Test.innerText = 'コピーしました✔';
            Test.style = 'color: lawngreen;';
        } catch {
            Test.innerText = 'コピーできませんでした✘';
        }
    }
    const id = setInterval(copy, 3000);
    function copy() {
        Test.innerText = '';
        Test.style = 'color: red;'
        clearInterval(id);
    }
}
console.info('ⒸUziDeer');