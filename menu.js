/*
-да се изведе title и price за ястията с повече калории от средните
-да се изведе всички данни за ястието с най-висока цена
-добавяне, изтриване и редактиране на един запис, като се зададе от клавиатурата номера на записа за редактиране и изтриване
*/

var xml_doc = document.implementation.createDocument(",", null);
xml_doc.async = false;
xml_doc.load('xml.xml');

var i, j, n_elems, elems;
elems = xml_doc.documentElement.getElementsByTagName("food");
number = xml_doc.documentElement.getElementsByTagName("number");
name = xml_doc.documentElement.getElementsByTagName("name");
price = xml_doc.documentElement.getElementsByTagName("price");
description = xml_doc.documentElement.getElementsByTagName("description");
calories = xml_doc.documentElement.getElementsByTagName("calories");
n_elems = elems.length;

/*Create array to get data from xml and push in array to get by price and calories*/
var arr = new Array();
for (i = 0; i < n_elems; i++) {
    try {
        var priceAsNumber = parseInt(elems[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
        arr.push(priceAsNumber);
    } catch (err) {
        continue;
    }
}

//name and price for calories more than average
function Format(n) {
    return n.toFixed(2);
}

function AverCal() {
    var sum = 0;
    document.write("~~~~~~~~~Calories more than average~~~~~~~~~" + "<br>")
    for (var i = 0; i < n_elems; i++) {
        var currName = elems[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var currPrice = elems[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
        var currCalories = parseInt(elems[i].getElementsByTagName("calories")[0].childNodes[0].nodeValue);
        sum += parseInt(elems[i].getElementsByTagName("calories")[0].childNodes[0].nodeValue);
}
        avg = sum / 10;
        for(var i=0;i<n_elems;i++){
          var currName = elems[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
          var currPrice = elems[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
          var currCalories = parseInt(elems[i].getElementsByTagName("calories")[0].childNodes[0].nodeValue);
        if (elems[i].getElementsByTagName("calories")[0].childNodes[0].nodeValue > Format(avg)) {

            document.write("Name: " + currName + "<br>");
            document.write("Price:" + currPrice + "<br>");
            document.write("Calories:" + currCalories + "<br>");
            document.write("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "<br>");
        }
}
    document.write("The average calories:  " + avg + "<br>");
}



//Max Price
function MaxPrice() {

    var minPrice = Math.min.apply(Math, arr);
    var maxPrice = Math.max.apply(Math, arr);

    for (i = 0; i < n_elems; i++) {
        var currName = elems[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var currPrice = parseInt(elems[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
        var currDescription = elems[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
        var currCalories = elems[i].getElementsByTagName("calories")[0].childNodes[0].nodeValue;
        if (currPrice == maxPrice) {
            document.write("~~~~~~~~~Max Price~~~~~~~~~" + "<br>");
            document.write("Title: " + currName + "<br>");
            document.write("Price:" + currPrice + "<br>");
            document.write("Description:" + currDescription + "<br>");
            document.write("Calories:" + currCalories + "<br>");
            document.write("~~~~~~~~~~~~~~~~~~~~~~~~~~" + "<br>");
        }
    }
}

//Delete node from xml file
function Delete() {
    al = xml_doc.getElementById("food");
    var record = xml_doc.getElementsByTagName("food")[document.getElementById("DeleteNode").value - 1];
    xml_doc.documentElement.removeChild(record);
    for (i = 0; i < elems.length; i++) {
        document.write(number[i].firstChild.nodeValue + "<br>")
        document.write(description[i].firstChild.nodeValue + "<br>")
    }
}

//Function to load data from xml
var indexToBeEdited = 0;

function Load() {
    {
        try {
            indexToBeEdited = parseInt(document.getElementById('EditNode').value);
            y = xml_doc.documentElement.getElementsByTagName("food")[indexToBeEdited - 1];
            document.getElementById('LoadedCalories').value = y.getElementsByTagName("calories")[0].childNodes[0].nodeValue;
            document.getElementById('LoadedNumber').value = y.getElementsByTagName("number")[0].childNodes[0].nodeValue;
            document.getElementById('LoadedName').value = y.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            document.getElementById('LoadedPrice').value = y.getElementsByTagName("price")[0].childNodes[0].nodeValue;
            document.getElementById('LoadedDescription').value = y.getElementsByTagName("description")[0].childNodes[0].nodeValue;
            elems = xml_doc.documentElement.getElementsByTagName("food");
        } catch (intError) {
            alert(intError);
        }
    }
}

//Add food to xml data
function Save() {
    newel = xml_doc.createElement("food");

    newelName = xml_doc.createElement("name")
    newelName.appendChild(xml_doc.createTextNode(document.getElementById('LoadedName').value));
    newel.appendChild(newelName);

    newelNumber = xml_doc.createElement("number")
    newelNumber.appendChild(xml_doc.createTextNode(document.getElementById('LoadedNumber').value));

    newelPrice = xml_doc.createElement("price")
    newelPrice.appendChild(xml_doc.createTextNode(document.getElementById('LoadedPrice').value));

    newelDescription = xml_doc.createElement("description")
    newelDescription.appendChild(xml_doc.createTextNode(document.getElementById('LoadedDescription').value));

    newelCalories = xml_doc.createElement("calories")
    newelCalories.appendChild(xml_doc.createTextNode(document.getElementById('LoadedCalories').value));

    newel.appendChild(newelNumber)
    newel.appendChild(newelPrice)
    newel.appendChild(newelDescription)
    newel.appendChild(newelCalories)
    xml_doc.documentElement.appendChild(newel)

    for (i = 0; i < elems.length; i++) {
        document.write("~~~~~~~~~~~~~~~~~~~~~~~~~~" + "<br>");
        document.write("№ :" + number[i].firstChild.nodeValue + "<br>");
        document.write("Price : " + price[i].firstChild.nodeValue + "<br>");
        document.write("Description : " + description[i].firstChild.nodeValue + "<br>");
        document.write("Calories : " + calories[i].firstChild.nodeValue + "<br>");
        document.write('<br>');

    }
}


function Clear() {
    document.getElementById("LoadedCalories").value = "";
    document.getElementById("LoadedPrice").value = "";
    document.getElementById("LoadedName").value = "";
    document.getElementById("LoadedDescription").value = "";
    document.getElementById("LoadedNumber").value = "";
    document.getElementById("EditNode").value = "";
    document.getElementById("DeleteNode").value = "";
}

//Add food to xml data
function Edit() {
    newel = xml_doc.createElement("food");
    al = xml_doc.getElementById("food");

    newelName = xml_doc.createElement("name")
    newelName.appendChild(xml_doc.createTextNode(document.getElementById('LoadedName').value));
    newel.appendChild(newelName);

    newelNumber = xml_doc.createElement("number")
    newelNumber.appendChild(xml_doc.createTextNode(document.getElementById('LoadedNumber').value));

    newelPrice = xml_doc.createElement("price")
    newelPrice.appendChild(xml_doc.createTextNode(document.getElementById('LoadedPrice').value));

    newelDescription = xml_doc.createElement("description")
    newelDescription.appendChild(xml_doc.createTextNode(document.getElementById('LoadedDescription').value));

    newelCalories = xml_doc.createElement("calories")
    newelCalories.appendChild(xml_doc.createTextNode(document.getElementById('LoadedCalories').value));

    newel.appendChild(newelNumber)
    newel.appendChild(newelPrice)
    newel.appendChild(newelDescription)
    newel.appendChild(newelCalories)

    var record1 = xml_doc.getElementsByTagName("food")[document.getElementById("EditNode").value - 1];
    xml_doc.documentElement.replaceChild(newel, record1);


    for (i = 0; i < elems.length; i++) {
        document.write("~~~~~~~~~~~~~~~~~~~~~~~~~~" + "<br>");
        document.write("№ :" + number[i].firstChild.nodeValue + "<br>");
        document.write("Price : " + price[i].firstChild.nodeValue + "<br>");
        document.write("Description : " + description[i].firstChild.nodeValue + "<br>");
        document.write("Calories : " + calories[i].firstChild.nodeValue + "<br>");
        document.write('<br>');

    }
}
