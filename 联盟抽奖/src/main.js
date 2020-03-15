var body = document.querySelector("body")
var hotDog = document.querySelector("#hotDog");
var siCong = document.querySelector("#siCong");
var art = document.querySelector("article");
var sec =document.querySelector("section");
var asd = document.querySelector("aside");
var btn1 = document.querySelector("#btn");
var btn2 = document.querySelector("#go");
var helpDiv = document.querySelector("#helpDiv");
var line = document.querySelector("#line");
//set btn act

//get window Size
var windowH = window.innerHeight;
var windowW = window.innerWidth;

//set body Size
body.style.height = String(windowH)+"px";
//set Section Size

sec.style.height = String(windowH/2)+"px";
sec.style.width = String(windowW)+"px";


//set SiCong&HotDog&article&aside Size :
function setHeight(el,val){
    el.style.height = parseFloat(val) + "px";
}
function setWidth(el,wval){
    el.style.Width = parseFloat(wval) + "px";
}
hotDog.style.height = windowH/5+"px";
siCong.style.height = windowH/5+"px";
art.style.width = windowH/3+"px";
art.style.height = windowH/3+"px";
asd.style.width = windowW+"px";
asd.style.height = parseFloat(getHeight(sec)/5)+"px";
helpDiv.style.width = parseFloat(getWidth(sec)/3)+"px";
btn1.style.width = getWidth(helpDiv)+"px";
helpDiv.style.height = getHeight(asd)+"px";
asd.style.background = getStyle(body,"background");
sec.style.background = getStyle(body,"background");
line.style.height = getHeight(btn1)+"px";



//get SiCong&HotDog&article Size :
function getStyle(el,StyleName) {
    if (window.getComputedStyle){
        return window.getComputedStyle(el)[StyleName];
    }else {
        return el.currentStyle[StyleName];
    }
}
function getWidth(el) {
        var elWstr_px = getStyle(el,"width");
        var elWstr = elWstr_px.substr(0,elWstr_px.length-2);
        var elW = parseFloat(elWstr);
        return elW;

}
function getHeight(el) {
    var elHstr_px = getStyle(el,"height");
    var elHstr = elHstr_px.substr(0,elHstr_px.length-2);
    var elH = parseFloat(elHstr);
    return elH;
}


//Let them Center :set Margin-top&left

function setMargin(el) {
    var elCenterMarginLeft = -(getWidth(el)/2);
    var elCenterMarginTop = -(getHeight(el)/2);
    el.style.marginTop = (elCenterMarginTop)+"px";
    el.style.marginLeft = (elCenterMarginLeft)+"px";

}
    setMargin(siCong);
    setMargin(hotDog);
    setMargin(art);





//*page onloadEvent

//btn Event:

var clickFlag = false;
btn1.onclick=function Move() {
    setTimeout(function () {
        $(asd).fadeOut(500);
    },500);
    setTimeout(function () {
        hotDog.removeAttribute("class","hotdog");
        hotDog.setAttribute("class","hdClicked");
        hotDog.marginLeft = -parseFloat(windowW/65)+"px";
        siCong.removeAttribute("class","sicong");
        siCong.setAttribute("class","scClicked");

    },1000);
    setTimeout(function () {
        $(art).fadeIn(3000);
        clickFlag = true;
    },1500);
}



//Prize
var prizeArr = ["霸王生姜防脱发洗发水",
    "LOL王思聪热狗皮肤一套",
    "北理珠山区2G网免费一天",
    "吴方全套课程免抢课",
    "吉林长白山自费3日游",
    "六神驱蚊花露水1ml",
    "计院美女微信号1份"];
var timer = null;
var prizeNowShow = document.getElementById("prize");
var flag = true;
var times = 0;
var go = document.getElementById("go");
var endResult = document.getElementById("endResult")
art.onclick = Play;
function Play() {
    go.style.display = "none";
    clearInterval(timer);
    timer = setInterval(function () {
        times +=1;
        if (times==50){
            Stop();
            prizeNowShow.style.display = "none";
            $(endResult).fadeIn(300);
        }else{
            var itemNember = Math.floor(Math.random()*prizeArr.length);
            prizeNowShow.innerHTML = prizeArr[itemNember];

        }


    },100);//time can control
}

function Stop() {
    clearInterval(timer);
}



