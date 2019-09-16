//const mysql=require('mysql');
const express=require('express');
var app=express();

const bodyparser=require('body-parser');
app.use(bodyparser.json());

const path=require('path');

const exphbs=require('express-handlebars');
const userctrls=require('./userctrl');

//var mysqlconnection=require('./db/conn');
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({ extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000,()=>console.log('Express server is running at port 3000'));

app.use('/',userctrls);
/*app.get('/users',(req,res)=>{
    mysqlconnection.query("select * from users ",(err,rows,fields)=>{
        if(!err){
            console.log("hii your query is executed");
            //res.json(rows);
            //console.log(rows);
            fetchdata(rows,res);
            res.render("/dip.hbs",{
                viewtitle:"display details"
            });
            }
        else{
            console.log(err);
        }
    })
});

app.get('/users/:id',(req,res)=>{
    mysqlconnection.query("select * from users where id=?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            console.log("hii your quer is executed");
            //res.send(rows);
            res.render();
        }else{
            console.log(err);
        }
    })
});

var fetchdata=function(rows,res){
    console.log("your function is entered");
    res.write("<table <style>background-color:gray;bordercollapse:2px;</style>><tr><th>user-id</th><th>user-name</th><th>user-password</th></tr>");
    for(var i in rows)
    {
        res.write("<tr>");
        for(var j in rows[0])
        {
            res.write("<td>"+rows[i][j]+"</td>");
            console.log(rows[i][j]);
        }
        res.write("</tr>");
    }
    res.write("</table>");
}
*/
