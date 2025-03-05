for (let i = 100; i <= 999; i++) {
    let tram = Math.floor(i / 100);
    let chuc = Math.floor((i % 100) / 10);
    let donvi = i % 10;
    let sum = Math.pow(tram, 3) + Math.pow(chuc ,3) + Math.pow(donvi, 3);
    if (i == sum ){
        console.log(`${i} la so Armstrong`);
    }
}