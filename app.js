var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var _ = require("underscore")
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))//接受form表单提交的数据
app.use(bodyParser.json())//接受json数据格式提交的数据
app.use(express.static(path.join(__dirname,'static')))
app.listen(port)

console.log("node start success at port:"+port)

// var movie = new Movie({
// 	director:'邹杰',//导演
// 	moviename:'小邹大战小乐',//影片名字
// 	country:'中国',//电影出产国家
// 	language:'中文',//语种
// 	movieshowtime:'2016',
// 	movieimgurl:'http://icon.nipic.com/block.gif',//海报URL
// 	movieurl:'http://player.youku.com/player.php/sid/XNTQ1NTEwNTI0/v.swf',//视频URL
// 	movienote:''
// })
// movie.save(function(error,res){
// 	if(error){
// 		console.log(error)
// 	}
// 	console.log(res)
// })

//首页路由
app.get('/',function(req,res){
	Movie.findAll(function(error,movies){
		if(error){
			console.log(error)
		}
		res.render('index',{
			title:'邹杰影视首页',
			movies:movies
		})
	})
})

//电影信息录入页面
app.get('/movie/form',function(req,res){
	res.render('form',{
		title:'电影信息录入',
		movie:{}
	})
})

//电影信息更新页面
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id
	Movie.findbyid(id,function(error,movie){
		if(error){
			console.log(error)
		}
		res.render('form',{
			title:'电影信息修改',
			movie:movie
		})
	})
})

//电影信息删除接口
app.delete('/admin/delete',function(req,res){
	var id = req.body.id
	// var id = req.query.id   //"/admin/delete?id=1212121"这种形式的时候可以query
	if(id){
		Movie.remove({_id:id},function(error,movie){
			if(error){
				console.log(error)
			}
			res.json({success:1})
		})
	}
})

//电影信息录入接口
app.post('/movie/new',function(req,res){
	var id = req.body.movie._id
	var MovieObj = req.body.movie
	var _movie
	if(id != undefined && id !=""){
		Movie.findbyid(id,function(error,movie){
			if(error){
				console.log(error)
			}
			_movie = _.extend(movie,MovieObj)
			_movie.save(function(error,movie){
				if(error){
					console.log(error)
				}
				res.redirect("/movie/detail/"+movie._id)
			})
		})
	}else{
		_movie = new Movie({
			director:MovieObj.director,
			moviename:MovieObj.moviename,
			country:MovieObj.country,
			language:MovieObj.language,
			movieimgurl:MovieObj.movieimgurl,
			movieshowtime:MovieObj.movieshowtime,
			movieurl:MovieObj.movieurl,
			movienote:MovieObj.movienote,
		})
		_movie.save(function(error,movie){
			if(error){
				console.log(error)
			}
			res.redirect("/movie/detail/"+movie._id)
		})
	}
})

//电影详情页面
app.get('/movie/detail/:id',function(req,res){
	var id = req.params.id
	Movie.findbyid(id,function(error,movie){
		if(error){
			console.log(error)
		}
		res.render('detail',{
			title:movie.moviename+'电影详情',
			movie:movie
		})
	})
})

//电影后台列表页
app.get('/admin/list',function(req,res){
	Movie.findAll(function(error,movies){
		if(error){
			console.log(error)
		}
		res.render('list',{
			title:'邹杰影视首页',
			movies:movies
		})
	})
})