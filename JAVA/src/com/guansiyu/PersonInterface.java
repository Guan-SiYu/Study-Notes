package com.guansiyu;
public interface PersonInterface { //这就是一个约定 约定了对应这个接口的类都应该实现什么
    public String interfaceVar = "InterfaceSome";
    String sayHi();//这里只有方法声明 没有方法体 没有实现过程
    //意思就是 如果你想创建PersonInterface类 这个类就应该有sayHi这样一个方法

}
