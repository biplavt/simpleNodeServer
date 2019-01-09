var express= require('express');
var hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
	var now=new Date().toString();

	var log =(`${now}: ${req.method} ${req.url}`);
	console.log(log);
	fs.appendFile('server.log',log+ '\n',(err)=>{
		if(err) console.log('Unable to append the server.log');
	});
	next();
},
function(req,res,next){
	console.log('request type:',req.method);
	next();
});

app.use((req,res,next)=>{
	res.render('maintainence.hbs');
})

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:'Home Page',
		currentYear:new Date().getFullYear(),
		welcomeMessage:'Welcome to Node App'
	})
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		currentYear:new Date().getFullYear()
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'Error handling Request'
	})
})

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  console.log('regular');
  next('route');
},function(req,res,next){
	console.log('asdfa');
	next();
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})

app.listen(3000,()=>{
	console.log('Server is up on post 3000...')
});