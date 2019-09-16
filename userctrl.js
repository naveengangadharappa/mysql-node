const express=require('express');
var router=express.Router();
var mysqlconnection=require('./db/conn');

router.get('/',(req,res)=>{
    res.json('sample text');
})


router.get('/delete/:email',(req,res)=>{
    var sql="delete from users where email='"+req.params.email+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            console.log("Record deleted successfully");
            var sql="select * from users ";
            fetchdatamysql(sql,req,res); 
        }
        else{
            console.log(err);
        }
    })
})


router.get('/insert',(req,res)=>{
    var email=0;
    res.render("insert.hbs")
    
})

router.get('/update/:email',(req,res)=>{
    sql="select * from users where email='"+req.params.email+"'";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err)
        {
    res.render("update.hbs",{
        data:rows
    });
}
else{

}
    });
})


router.post('/insertuser',(req,res)=>{
    console.log(req.body);
    var flag="0"
    if(req.body.flg==flag){
        if(req.body.uname==''||req.body.ugender==''||req.body.udob==''||req.body.uemail==''||req.body.ucountry==''||req.body.ustate==''||req.body.udistrict==''||req.body.upin==''||req.body.upasswd==''||req.body.urpasswd=='')
        {
            res.render("err.hbs");
        }
        else{
    if(req.body.upasswd==req.body.urpasswd)
    {
        var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.uname+"','"+req.body.ugender+"','"+req.body.udob+"','"+req.body.uemail+"','"+req.body.ucountry+"','"+req.body.ustate+"','"+req.body.udistrict+"',"+req.body.upin+",'"+req.body.upasswd+"')";
    insertmysql(sql,req,res);
    }
        else{
            console.log("password and conform donot match");
        }
    }
}
else{
    var sql="delete from users where email='"+req.body.flg+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            console.log("Record deleted successfully");
            var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.uname+"','"+req.body.ugender+"','"+req.body.udob+"','"+req.body.uemail+"','"+req.body.ucountry+"','"+req.body.ustate+"','"+req.body.udistrict+"',"+req.body.upin+",'"+req.body.upasswd+"')";
            insertmysql(sql,req,res);
console.log("update query entered");
}
    });
}
});


router.get('/users',(req,res)=>{
   var sql="select * from users ";
   fetchdatamysql(sql,req,res); 
});


var insertmysql=function(sql,req,res){
    mysqlconnection.query(sql,function(err){
        if(!err)
        {
            console.log("record inserted successfully");
            sql="select * from users ";
            fetchdatamysql(sql,req,res);
            
        }else{
            console.log(err);
        }
    })
}


var fetchdatamysql=function(sql,req,res){
mysqlconnection.query(sql,(err,rows,fields)=>{
    if(!err){
        console.log("fetch your query is executed"); 
        res.render("dip.hbs",{
            data:rows
        });
        }
    else{
        console.log(err);
    }
})
}


module.exports=router;