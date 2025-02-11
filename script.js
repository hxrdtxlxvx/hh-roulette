var rouletteButton = document.querySelector('#rouletteButton');
var resultDiv = document.querySelector('#result');
var data = [];

fetch('test.txt')
    .then(response => response.text())
    .then(text => {
        text.split('\n').forEach(line => {
            let [name, location, menu, note] = line.split('-');
            data.push({ name, location, menu, note });
        });
        console.log('Data loaded:', data); 
    });

rouletteButton.onclick = function() {
    var selectedLocations = document.querySelectorAll('input[name="위치"]:checked');
    var selectedMenus = document.querySelectorAll('input[name="메뉴"]:checked');
    var selectedData = [];

    selectedLocations = Array.from(selectedLocations).map(location => location.value);
    selectedMenus = Array.from(selectedMenus).map(menu => menu.value);

    console.log('Selected locations:', selectedLocations); 
    console.log('Selected menus:', selectedMenus); 

    selectedData = data.filter(item => {
        return selectedLocations.includes(item.location) && selectedMenus.includes(item.menu);
    });

    console.log('Data after filter:', selectedData); 

    if (selectedData.length > 0) {
        var randomIndex = Math.floor(Math.random() * selectedData.length);
        var selectedRestaurant = selectedData[randomIndex];
        resultDiv.textContent = selectedRestaurant.name + (selectedRestaurant.note ? " (" + selectedRestaurant.note + ")" : "");
    } else {
        resultDiv.textContent = "범위와 메뉴를 선택해 주세요.";
    }
};