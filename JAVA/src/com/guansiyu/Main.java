package com.guansiyu;//包描述语句

public class Main { //public 在基本包中的任何位置都可以访问他们

    public static void main(String[] args) {//参数为一个字符串数组 形参名为args
        //static 意味着我们可以直接调用这个方法，而无需通过先创建Main类的对象实例
        //void 是这个方法的返回值类型 这里就是说这个方法没有返回值
        //创建一个User类的实例
        User user = new User("guan");// 等号左边：创建了一个叫user的变量 变量的类型是User类
        // 等号右边：这里我们设置为User类的新对象实例
        user.name = "gg";
        //java中的字符串必须使用双引号
        System.out.println(user.name);
//        user.sayHello();
        /*---------------------------    接口   -----------------------------------------*/

        //类和接口的耦合
        PersonInterface person1 = getPerson1();
        person1.sayHi();
//person1.PrintPlusStr(); 报错 没被接口声明的方法不能用
        System.out.println("Main打印Interface的变量 " + person1.interfaceVar);
//System.out.println("Main打印Per1的变量 "+person1.per1Var);报错 没被接口声明的属性也不能用


        /*---------------------------    封装   -----------------------------------------*/
        //私有字段
        Account account = new Account();
        // account.balance = 1; 我们不应该允许在另一个类里改变Account类的实例的数据
        account.cunqian(10);
        account.huaqian(5);
        System.out.println(account.getBalance());

        /*---------------------------    抽象   -----------------------------------------*/

    }


    /*---------------------------    接口   -----------------------------------------*/

    public static PersonInterface getPerson1(){ //返回类型为PersonInterface接口 方法名叫getPerson
        Per1 h1 = new Per1("ab","cd","ef");
        h1.sayHi();//这里也可以访问sayHi
        System.out.println("Per1 h1.plusStr="+h1.plusStr);
        h1.PrintPlusStr();
        return h1;
    }
}
