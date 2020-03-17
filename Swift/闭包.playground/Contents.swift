import UIKit
let names = ["Chris","Alex","Ewa","Barry","Dona"]
func sortWord(_ s1: String,_ s2: String)->Bool{
    return s1>s2
}
names.sorted(by:sortWord)
/*:
 * 闭包表达式语法
 */
/* 语法：
 {(parameters) -> (return type) in
     statements
 }
paraments可以是：常量形参、变量形参、输入输出形参,但不能提供默认值。
                可变形参(要在形参列表最后使用)
                元组类型可作为形参和返回类型
