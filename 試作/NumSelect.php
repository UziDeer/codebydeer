<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NumSelect</title>
</head>
<body>
    <?php
    //A~Fの配列を[0]~[5]の引数で使えるようにする
    $data = [$_GET['A'], $_GET['B'], $_GET['C'], $_GET['D'], $_GET['E'], $_GET['F'], $_GET['r']];
        for ($i = 0; $i < 6; $i++) {
            //それぞれに入ってる値を$nと置く
            $n = $data[$i];
            //A~CとD~Fで、$nにnullと0~5が入っている個数を調べ、結果を配列:$lenに収める
            if ($i < 3) {
                if ($n == '') {
                    $len[0]++;
                } else if (0 <= $n && $n <= 5) {
                    $len[1]++;
                    $ABCAdd += $n;
                }
            } else {
                if ($n == '') {
                    $len[2]++;
                } else if (0 <= $n && $n <= 10) {
                    $len[3]++;
                    $DEFNum = $n;
                }
            }
        }
        $len = [$len[0], $len[1], $len[2], $len[3], $data[6]];
        //$lenから条件分岐し、結果を$resultに代入する
        if ($len == [1, 2, 3, NULL, NULL]) {
            $result = $ABCAdd;
        } else if ($len == [1, 2, 2, 1, NULL]) {
            if ($ABCAdd < $DEFNum) {
                $result = $DEFNum;
            } else {
                $result = $ABCAdd;
            }
        } else if ($len[0] == 3 && $len[4] != NULL) {
            $result = $_GET[$len[4]];
        }
        //空文字列だったら、文字列'NULL'を返す
        if ($result == '') {
            $result = 'NULL';
        }
        //出力する
        echo $result;
    ?>
</body>
</html>