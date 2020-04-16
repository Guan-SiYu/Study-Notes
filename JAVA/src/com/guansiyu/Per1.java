package com.guansiyu;

public class Per1 implements PersonInterface{
    @Override
    public String sayHi() {
        System.out.println("1:sayHi访问Interface的变量interfaceVar = "+interfaceVar);
        System.out.println("2:sayHi访问Per1类的变量this.something = "+this.per1Var);
        return "Hi,I'm Per1 class";//没被接口声明的属性也不能用
    }
    public String per1Var = "per1Var";

    public float aNum(){ //我们改变了这个类 但是这种改变对Main里的main方法没有影响
        return 1;
    }
    public String plusStr;
    public Per1(String st1,String st2,String st3){
        plusStr =  st1+st2+st3;
    }
    public void PrintPlusStr(){
        System.out.println(plusStr);
    }
}
