const mapData = [
    { name: "はじまり", connect: [{ ind: 2, dist: 1 }] },
    { name: "ポ２", connect: [{ ind: 2, dist: 8 }, { ind: 27, dist: 13 }] },
    { name: "ポ１", connect: [{ ind: 0, dist: 1 }, { ind: 1, dist: 8 }, { ind: 3, dist: 1 }] },
    { name: "ポ４", connect: [{ ind: 2, dist: 1 }, { ind: 4, dist: 1 }] },
    { name: "ポ３", connect: [{ ind: 3, dist: 1 }, { ind: 6, dist: 1 }] },
    { name: "ポ６", connect: [{ ind: 6, dist: 1 }, { ind: 7, dist: 1 }] },
    { name: "ポ５", connect: [{ ind: 4, dist: 1 }, { ind: 5, dist: 1 }] },
    { name: "ポ８", connect: [{ ind: 5, dist: 1 }, { ind: 8, dist: 1 }] },
    { name: "ポ７", connect: [{ ind: 7, dist: 1 }, { ind: 10, dist: 1 }] },
    { name: "ポ１０", connect: [{ ind: 10, dist: 1 }, { ind: 11, dist: 1 }] },
    { name: "ポ９", connect: [{ ind: 8, dist: 1 }, { ind: 9, dist: 1 }] },
    { name: "ポ１２", connect: [{ ind: 9, dist: 1 }, { ind: 12, dist: 1 }] },
    { name: "ポ１１", connect: [{ ind: 11, dist: 1 }, { ind: 14, dist: 1 }] },
    { name: "ポ１４", connect: [{ ind: 14, dist: 1 }, { ind: 15, dist: 1 }] },
    { name: "ポ１３", connect: [{ ind: 12, dist: 1 }, { ind: 13, dist: 1 }] },
    { name: "ポ１６", connect: [{ ind: 13, dist: 1 }, { ind: 16, dist: 1 }] },
    { name: "ポ１５", connect: [{ ind: 15, dist: 1 }, { ind: 18, dist: 1 }] },
    { name: "ポ１８", connect: [{ ind: 18, dist: 1 }, { ind: 19, dist: 1 }] },
    { name: "ポ１７", connect: [{ ind: 16, dist: 1 }, { ind: 17, dist: 1 }] },
    { name: "ポ２０", connect: [{ ind: 17, dist: 1 }, { ind: 20, dist: 1 }] },
    { name: "ポ１９", connect: [{ ind: 19, dist: 1 }, { ind: 22, dist: 1 }] },
    { name: "ポ２２", connect: [{ ind: 22, dist: 1 }, { ind: 23, dist: 1 }] },
    { name: "ポ２１", connect: [{ ind: 20, dist: 1 }, { ind: 21, dist: 1 }] },
    { name: "ポ２４", connect: [{ ind: 21, dist: 1 }, { ind: 24, dist: 1 }] },
    { name: "ポ２３", connect: [{ ind: 23, dist: 1 }, { ind: 26, dist: 1 }] },
    { name: "ポ２６", connect: [{ ind: 26, dist: 1 }, { ind: 28, dist: 1 }] },
    { name: "ポ２５", connect: [{ ind: 24, dist: 1 }, { ind: 25, dist: 1 }] },
    { name: "ポ２８", connect: [{ ind: 1, dist: 13 }, { ind: 28, dist: 8 }] },
    { name: "ポ２７", connect: [{ ind: 25, dist: 1 }, { ind: 27, dist: 8 }, { ind: 29, dist: 1 }] },
    { name: "おわり", connect: [{ ind: 28, dist: 1 }] }
];

let orderAll = [];
let findR = [];

function searchEnd(finded) {
    console.log("end, AllFind:", finded)
}

function refresh(route) {
    console.info("find:\nstart\n\n" + route.join("\n↓\n") + "\n\nend");
}

function getRoute(start, end) {
    orderAll = [{ dist: 0, order: [Number(start)] }];
    let minDist = Infinity;
    let nextData = [];
    let inter = setInterval(() => {
        orderAll.forEach((row, j) => {
            let nextInfo = mapData[row.order.slice(-1)].connect.filter(el => !row.order.includes(el.ind));
            if (row.order.slice(-1) == end) {
                if (row.dist < minDist) {
                    minDist = row.dist;
                    refresh(row.order);
                }
                findR.push(row);
            } else if (nextInfo.length != 0) {
                nextInfo.forEach(el => {
                    nextData.push({ dist: row.dist + el.dist, order: row.order.concat([el.ind]) });
                });
            }
        });
        if (nextData.length == 0) {
            clearInterval(inter);
            searchEnd(findR);
        } else {
            orderAll = nextData.splice(0);
        };
    }, 0);
}