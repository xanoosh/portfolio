console.log('Connection established, Sire!');



colorArr = ['water', 'mars', 'mars', 'mars', 'mars', 'water', 'mars', 'mars'];
resourcesArr1 = ['steel', 'titanium', '', 'card', 'plant', ''];
resourcesArr2 = ['steel', '', 'titanium', '', 'card', '', 'plant', ''];


function randomEl(arr) {
    var randomVal = Math.ceil(Math.random() * arr.length - 1);
    return arr[randomVal];
}

function generate_map() {
    document.write('<div id="mapContainer">');
    let val = 9;
    doubleit = val * 2;

    for (i = 0; i < doubleit; i++) {
        if (i < val && i >= 5) {
            document.write('<div class="hex-row">');
            for (j = 0; j < i; j++) {
                document.write(' <div class="hexagon ' + randomEl(colorArr) + ' "><small>' + randomEl(resourcesArr1) + '</small><small>' + randomEl(resourcesArr2) + '</small></div> ');
            }
            document.write('</div>');
        }
        if (i >= val && i <= 13) {
            document.write('<div class="hex-row">');
            for (j = doubleit; j > i; j--) {
                document.write(' <div class="hexagon ' + randomEl(colorArr) + ' "><small>' + randomEl(resourcesArr1) + '</small><small>' + randomEl(resourcesArr2) + '</small></div> ');
            }
            document.write('</div>');
        }
    }
    document.write('</div>');
}

generate_map();
