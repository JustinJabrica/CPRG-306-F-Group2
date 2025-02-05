
const GLOBAL_UNIT_ARRAY = [
    ["Pounds (lb.)", "Kilograms (kg)"],
    ["Miles","Kilometres (km)",],
    ["Celsius (°C)","Fahrenheit (°F)",],
];

const navigationClick = (obj) => {
    document.getElementById("toAmt").innerText = "";
    let grpIdx = document.getElementById("iptGrpIdx").value;
    let frIdx = document.getElementById("iptFrIdx").value;
    let txtStyleArr = ["italic", "italic", "italic", ];
    if(obj !== null && obj !== undefined) {
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
    document.getElementById("navi-1-text").setAttribute("class",txtStyleArr[0]);
    document.getElementById("navi-2-text").setAttribute("class",txtStyleArr[1]);
    document.getElementById("navi-3-text").setAttribute("class",txtStyleArr[2]);
    setFrToUnit(grpIdx, frIdx);
}

const switchUnit = () =>{
    document.getElementById("toAmt").innerText = "";
    let grpIdx = document.getElementById("iptGrpIdx").value;
    let frIdx = document.getElementById("iptFrIdx").value === "0"?"1":"0";
    document.getElementById("iptFrIdx").value = frIdx;
    // alert(grpIdx +"|"+ frIdx);
    setFrToUnit(grpIdx, frIdx);
}

const setFrToUnit = (grpIdx, frIdx) =>{
    document.getElementById("frUnit").innerText = GLOBAL_UNIT_ARRAY[grpIdx][frIdx];
    document.getElementById("toUnit").innerText = GLOBAL_UNIT_ARRAY[grpIdx][1-frIdx];
}

const convertUnit = () =>{
    let frUnit = document.getElementById("frUnit").innerText;
    let frAmtStr = document.getElementById("frAmt").innerText;
    let converter;

    switch (frUnit){
        case GLOBAL_UNIT_ARRAY[0][0]:
            converter = (x) => (x * 0.453592).toFixed(5);
            break;
        case GLOBAL_UNIT_ARRAY[0][1]:
            converter = (x) => (x / 0.453592).toFixed(5);
            break;
        case GLOBAL_UNIT_ARRAY[1][0]:
            converter = (x) => (x * 1.60934).toFixed(5);
            break;
        case GLOBAL_UNIT_ARRAY[1][1]:
            converter = (x) => (x / 1.60934).toFixed(5);
            break;
        case GLOBAL_UNIT_ARRAY[2][0]:
            converter = (x) => ((x * 9/5) + 32).toFixed(5);
            break;
        case GLOBAL_UNIT_ARRAY[2][1]:
            converter = (x) => ((x - 32) * 5/9).toFixed(5);
            break;
    }
    let frAmtArr = frAmtStr.split(",");
    document.getElementById("toAmt").innerText = Array.isArray(frAmtArr) ? frAmtArr.map(converter) : converter(frAmtStr);
}