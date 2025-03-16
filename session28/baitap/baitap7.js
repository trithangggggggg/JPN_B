let students = [
    { name: "Trần Trí Dương", scores: { math: 9, english: 8, literature: 7 } },
    { name: "Hà Bích Ngọc", scores: { math: 3, english: 2, literature: 5 } },
    { name: "Bùi Thái Sơn", scores: { math: 9.5, english: 9, literature: 9 } }
];

function diem(list) {
    return list.filter(hs => {
        let { math, english, literature } = hs.scores;
        let tb = (math + english + literature) / 3;
        return tb >= 8;
    });
}
console.log(diem(students));
