package com.guansiyu;

public class User {
    public String name;
    //构造函数是创建类的新实例时调用的方法
    public User(String newName){
        this.name = newName;
    }
    //js .prototype.methods
    public void sayHello(){
        System.out.println("Hi,my name is "+name);
    }

}
