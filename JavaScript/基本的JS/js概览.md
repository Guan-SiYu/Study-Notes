```js
1.当return到达一条语句时，当前函数的执行停止，控制权返回到调用位置。
    function myFun() {
        console.log("Hello");
        return "World";
        console.log("byebye")
    }
    myFun();
    //上面的输出“ Hello”到控制台，返回“ World”，但是"byebye"从不输出，因为该函数在该return语句处退出。
2.在对象上使用括号表示法的另一种用法是访问存储为变量值的属性。这对于遍历对象的属性或访问查找表时非常有用。
    var dogs = {
        Fido: "Mutt",  Hunter: "Doberman",  Snoopie: "Beagle"
    };
    var myDog = "Hunter";
    var myBreed = dogs[myDog];//"Doberman"
    使用此概念的另一种方法是，在程序执行期间动态收集属性名称，如下所示：
    var someObj = {
        propName: "John"
    };
    function propPrefix(str) {
        var s = "prop";
        return s + str;
    }
    var someProp = propPrefix("Name"); // someProp now holds the value 'propName'
    console.log(someObj[someProp]); // "John"
3.创建对象后，可随时更新其属性，就像更新任何其他变量一样。使用点或括号表示法进行更新。也可以用这种方式添加新属性。

4. 从对象中删除属性：

    delete ourDog.bark;



5.如果您具有表格数据，则可以使用对象来“查找”值，而不是switch语句或if/else链。当您知道输入数据被限制在一定范围内时，此功能最为有用。
比如：

    function phoneticLookup(val) {
    var result = "";
    switch(val) {
        case "alpha":
            result = "Adams";
            break;
        case "bravo":
            result = "Boston";
            break;
        case "charlie":
            result = "Chicago";
            break;
        case "delta":
            result = "Denver";
            break;
        case "echo":
            result = "Easy";
            break;
        case "foxtrot":
            result = "Frank";
        }
    return result;
    }

可以写成：

    function phoneticLookup(val) {
    var result = "";
    var lookup={
            "alpha":"Adams",
            "bravo":"Boston",
            "charlie":"Chicago",
            "delta":"Denver",
            "echo":"Easy",
            "foxtrot":"Frank"
            }
        return lookup[val];
    }

6.用.hasOwnProperty(propname)对象的方法来确定该对象是否有某属性
.hasOwnProperty()返回true或者false作为该属性的查找结果。
例：
    var myObj = {
        gift: "pony",
        pet: "kitten",
        bed: "sleigh"
    };
    function checkObj(checkProp) {
        if(myObj.hasOwnProperty(checkProp)){
            return myObj[checkProp];
        }else{
            return "Not Found";
        }
    }

7.灵活运用复杂的数据结构

    var myMusic = [
        //one
        {
            "artist": "Billy Joel",
            "title": "Piano Man",
            "release_year": 1973,
            "formats": [
                "CD",
                "8T",
                "LP"
            ],
            "gold": true
        },
        //two
        {
            "artist": "Daft Punk",
            "title": "Homework",
            "release_year": 1997,
            "formats": [
                "CD",
                "Cassette",
                "LP"
            ],
            "gold": true
        }
    ];

8.对于循环，不必一次迭代一个循环。通过更改final-expression，我们可以按偶数计数。

我们将从开始i = 0并循环一会儿i < 10。i每个循环我们将用增加2 i += 2。

    var ourArray = [];
    for (var i = 0; i < 10; i += 2) {
        ourArray.push(i);
    }
9.
遍历多维数组

    var arr = [ [1,2], [3,4], [5,6] ];
    for (var i=0; i < arr.length; i++) {
        for (var j=0; j < arr[i].length; j++) {
            console.log(arr[i][j]);
        }
    }

10.Do ... While循环
    do...while与while循环不同的是，条件在第一次检查时失败时的行为:无论如何它都会首先在循环内传递代码
    do...while循环确保循环内的代码至少运行一次
11.总结理解循环:除第一次执行语句块，后面都是 改(改变参数）判(判断条件) 做(执行代码块）
    判断为假退出整个循环块
12.递归:
    由循环例子来引入递归：

    //相乘数组里的前n个数
    function multiply(arr,n) {
        var result=arr[0];
        for(var i=1;i<n;i++){
            result *= arr[i];
        }
        return result;
    }
    //请注意multiply(arr, n) == multiply(arr, n - 1) * arr[n]。
    // 这意味着multiply函数可以根据自身进行重写，而无需使用循环:
    function  multiply2(arr,n) {
        if(n<=0){
            return arr[0];
        }else {
            return multiply2(arr,n-1)*arr[n];
        }
    }
    //写一个递归函数，sum(arr, n)从元件的该返回的总和0，以n包容在一个数组arr:
    function sum(arr,n) {
        if(n>0)
            return sum(arr,n-1)+arr[n];
        else
            return arr[0];
    }

13. 配置文件查找:
    var contacts = [
        {
            "firstName": "Akira",
            "lastName": "Laine",
            "number": "0543236543",
            "likes": ["Pizza", "Coding", "Brownie Points"]
        },
        {
            "firstName": "Harry",
            "lastName": "Potter",
            "number": "0994372684",
            "likes": ["Hogwarts", "Magic", "Hagrid"]
        },
        {
            "firstName": "Sherlock",
            "lastName": "Holmes",
            "number": "0487345643",
            "likes": ["Intriguing Cases", "Violin"]
        },
        {
            "firstName": "Kristian",
            "lastName": "Vos",
            "number": "unknown",
            "likes": ["JavaScript", "Gaming", "Foxes"]
        }
    ];


    function lookUpProfile(name, prop){

        for(var i=0;i<contacts.length;i++){
            if(contacts[i].firstName==name)
                return contacts[i][prop] || "No such property";
        }
        return "No such contact";

    }

14.生成随机数公式:
Math.floor(Math.random() * number);//[0,number)
Math.floor(Math.random() * (max - min + 1)) + min //[min,max]

15.字符串转换为整数:parseInt("str",进制)

16.三目运算符
    语句=>  condition ? statement-if-true : statement-if-false;

    function findGreater(a, b) {
        if(a > b) {
            return "a is greater";
        }
        else {
            return "b is greater";
        }
    }
    重写为
    function findGreater(a, b) {
        return a > b ? "a is greater" : "b is greater";
    }


17.使用多个三目运算符

    function findGreaterOrEqual(a, b) {
        if (a === b) {
            return "a and b are equal";
        }
        else if (a > b) {
            return "a is greater";
        }
        else {
            return "b is greater";
        }
    }
    重写为
    function findGreaterOrEqual(a, b) {
        return (a === b) ? "a and b are equal"
            : (a > b) ? "a is greater" : "b is greater";
    }
```

