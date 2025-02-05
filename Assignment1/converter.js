
const GLOBAL_UNIT_ARRAY = [
    ["Pounds (lb.)", "Kilograms (kg)"],
    ["Miles", "Kilometres (km)",],
    ["Celsius (°C)", "Fahrenheit (°F)",],
];

const navigationClick = (obj) => {
    document.getElementById("toAmt").innerText = "";
    let grpIdx = document.getElementById("iptGrpIdx").value;
    let frIdx = document.getElementById("iptFrIdx").value;
    let txtStyleArr = ["italic", "italic", "italic",];
    if (obj !== null && obj !== undefined) {
        switch (obj.id) {
            case "navi-1":
                grpIdx = 0;
                frIdx = 0;
                txtStyleArr[0] = "font-bold";
                break;
            case "navi-2":
                grpIdx = 1;
                frIdx = 0;
                txtStyleArr[1] = "font-bold";
                break;
            case "navi-3":
                grpIdx = 2;
                frIdx = 0;
                txtStyleArr[2] = "font-bold";
                break;
        }
        document.getElementById("iptGrpIdx").value = grpIdx;
        document.getElementById("iptFrIdx").value = frIdx;
    } else {
        txtStyleArr[0] = "font-bold";
    }
    document.getElementById("navi-1-text").setAttribute("class", txtStyleArr[0]);
    document.getElementById("navi-2-text").setAttribute("class", txtStyleArr[1]);
    document.getElementById("navi-3-text").setAttribute("class", txtStyleArr[2]);
    setFrToUnit(grpIdx, frIdx);
}

const switchUnit = () => {
    document.getElementById("toAmt").innerText = "";
    let grpIdx = document.getElementById("iptGrpIdx").value;
    let frIdx = document.getElementById("iptFrIdx").value === "0" ? "1" : "0";
    document.getElementById("iptFrIdx").value = frIdx;
    // alert(grpIdx +"|"+ frIdx);
    setFrToUnit(grpIdx, frIdx);
}

const setFrToUnit = (grpIdx, frIdx) => {
    document.getElementById("frUnit").innerText = GLOBAL_UNIT_ARRAY[grpIdx][frIdx];
    document.getElementById("toUnit").innerText = GLOBAL_UNIT_ARRAY[grpIdx][1 - frIdx];
}

//higher order function that returns the appropriate conversion function
const getConverter = (fromUnit) => {
    const converters = {
        "Pounds (lb.)": (x) => (x * 0.453592).toFixed(5),
        "Kilograms (kg)": (x) => (x / 0.453592).toFixed(5),
        "Miles": (x) => (x * 1.60934).toFixed(5),
        "Kilometres (km)": (x) => (x / 1.60934).toFixed(5),
        "Celsius (°C)": (x) => ((x * 9 / 5) + 32).toFixed(5),
        "Fahrenheit (°F)": (x) => ((x - 32) * 5 / 9).toFixed(5)
    };

    return converters[fromUnit] || ((x) => x); //return same value if not found
};

const convertUnit = () => {
    const frUnit = document.getElementById("frUnit").innerText;  //get selected unit
    const frAmtStr = document.getElementById("frAmt").innerText; //get input amounts

    const converter = getConverter(frUnit); //get conversion function

    const frAmtArr = frAmtStr.split(",").map(item => item.trim()); //spplit input into an array and clean spaces

    const convertedValues = frAmtArr.map(value => converter(parseFloat(value))); //conversion

    document.getElementById("toAmt").innerText = convertedValues.join(", "); //display
};
