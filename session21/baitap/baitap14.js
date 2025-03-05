let width = 20;
let height = 7;
for (let i = 1; i <= height; i++) {
    if (i === 1 || i === height) {
        document.write('*'.repeat(width) + '<br>');
    } else {
        document.write('*' + '&ensp;'.repeat(width - 2) + '*' + '<br>');
    }
}