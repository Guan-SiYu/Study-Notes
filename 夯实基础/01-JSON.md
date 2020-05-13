

JSON(JavaScript对象表示法将**结构化数据**表示为**标准格式的JS对象**。

许多程序环境能够读取、解读、生成 JSON，因为虽然它基于JS语法，但它独立于JS。许多程序环境能够读取、解读、生成 JSON，因为虽然它基于JS语法，但它独立于JS。

```js
{
  "squadName" : "Super hero squad",
  "homeTown" : "Metro City",
  "formed" : 2016,
  "secretBase" : "Super tower",
  "active" : true,
  "members" : //数组对象也是一种合法的 JSON 对象
	[{
      "name" : "Molecule Man",
      "age" : 29,
      "secretIdentity" : "Dan Jukes",
      "powers" : ["Radiation resistance","Turning tiny","Radiation blast"]
    },
    {
      "name" : "Madame Uppercut",
      "age" : 39,
      "secretIdentity" : "Jane Wilson",
      "powers" : ["Million tonne punch","Damage resistance","Superhuman reflexes"]
    },
    {
      "name" : "Eternal Flame",
      "age" : 1000000,
      "secretIdentity" : "Unknown",
      "powers" : ["Immortality","Heat Immunity","Inferno","Teleportation","Interdimensional travel"]
    }]
}
```

JSON 是一种**纯数据格式**，它只包含属性，没有方法。

JSON 要求有两头的 { } 来使其合法。

一个错位的逗号或分号就可以导致  JSON 文件出错，应该小心的检查想使用的数据

JSON 可以将任何标准合法的 JSON数据格式化保存，不只是数组和对象。比如，一个单一的字符串或者数字可以是合法的 JSON 对象。虽然不是特别有用处……

不像 JavaScript 标识符可以用作属性，在 JSON 中，只有**字符串**才能用作属性。

#### **一个JSON 示例**

```html
<header></header>
<section></section>
```

```js
var header = document.querySelector('header');
var section = document.querySelector('section');

```

XMLHTTPRequest():一个非常有用的 JavaScript 对象，使我们能通过写出的代码来向服务器请求资源文件，如图片，文本，JSON，甚至HTML片段。不用重新加载整个页面来更新小段内容，实现响应页面。

```js
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';//
var request = new XMLHttpRequest();
request.open('GET', requestURL);//打开一个新请求 至少含有两个参数:HTTP 方法；用于指向请求的地址URL
request.responseType = 'json';//设置响应数据的类型responseType为JSON，让服务器知道返回一个JSON对象
request.send();//发送请求

/*  处理服务器的返回数据
把代码包在事件处理函数中，当请求对象onload事件触发时执行代码。这是因为请求对象onload事件只有在请求成功时触发,这种方式可以保证事件触发时request.response是绝对可以访问的。*/

request.onload = function() {
  var superHeroes = request.response;//response属性返回请求的数据
  
  populateHeader(superHeroes);//这个函数用正确的数据填充<header>
  showHeroes(superHeroes);//这个函数用于创建信息卡片并把卡片插入到<header>中
}
```

```js
//用正确的数据填充<header>
function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['squadName'];
  header.appendChild(myH1);

  var myPara = document.createElement('p');
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
  header.appendChild(myPara);

```

```js
//用于创建信息卡片并把卡片插入到<header>中
function showHeroes(jsonObj) {
  var heroes = jsonObj['members'];
      
  for(i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';
        
    var superPowers = heroes[i].powers;
    for(j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
}
```

