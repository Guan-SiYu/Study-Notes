const Joi = require('joi');//命名J大写因为返回的是一个类    
const expressFunc = require('express');
const app = expressFunc();
app.use(expressFunc.json());

const coursesArr = [
    {id:1,name:'数学'},
    {id:2,name:'语文'},
    {id:3,name:'英语'},
    {id:4,name:'物理'},
    {id:5,name:'化学'},
    {id:6,name:'生物'}
]

//验证请求体信息的函数
function validateCourse(reqBodyObj){
    const schema = {
        newCourseName:Joi.string().min(1).required()
    }
    return Joi.validate(reqBodyObj,schema);
}

/*--------------------------------------- 增 -------------------------------------------------------*/
    
app.post('/api/courses',(req,res)=>{
    //验证请求体中的新课
    const {error} = validateCourse(req.body); //ES6对象析构语法
    if(error) return res.status(400).send(error.details[0].message);
    
    //添加
    const newCourse = {
        id:coursesArr.length + 1,
        name:req.body.newCourseName
    }
    coursesArr.push(newCourse);
    res.send(newCourse);
});
/*--------------------------------------- 删 -------------------------------------------------------*/

app.delete('/api/courses/:id',(req,res)=>{
    //获取要删除的课
    const wantDelete = coursesArr.find(i=>i.id==parseInt(req.params.id));
    if(!wantDelete) return res.status(404).send('没有此id的课');
    //删除
    coursesArr.splice(coursesArr.indexOf(wantDelete),1);
    
    res.send(wantDelete);
})
/*--------------------------------------- 改 -------------------------------------------------------*/

app.put('/api/courses/:id',(req,res)=>{
    //获取要更新的课
    const wantUpdate = coursesArr.find(i=>i.id==parseInt(req.params.id));
    if(!wantUpdate) return res.status(404).send('没有此id的课');

    //验证请求体中的新课
    const {error} = validateCourse(req.body); //ES6对象析构语法
    if(error) return res.status(400).send(error.details[0].message);
    
    //更新
    wantUpdate['name'] = req.body.newCourseName;
    res.send(wantUpdate);
});


/*--------------------------------------- 查 -------------------------------------------------------*/

//获取所有课程
app.get('/api/courses',(req,res)=>{
    res.send(coursesArr);
});

//获取给定id的单一课程
app.get('/api/courses/:id',(req,res)=>{
    const course = coursesArr.find(i=>i.id==parseInt(req.params.id));
    course ? res.send(course) : res.status(404).send('没有此id的课');
});



const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`服务器正在监听${port}端口`));
      
