var mongoose = require('mongoose')
var MovieSchema = new mongoose.Schema({
	director:{type:String,default:"ITJOY"},//导演
	moviename:{type:String,default:"超人"},//影片名字
	country:{type:String,default:"中国"},//电影出产国家
	language:{type:String,default:"中文"},//语种
	movieimgurl:{type:String,default:""},//海报URL
	movieurl:{type:String,default:""},//视频URL
	movienote:{type:String,default:""},//影片简介
	movieshowtime:{type:String,default:Date.now()},//影片上映时间
	moviedate:{
		createtime:{type:Date,default:Date.now()},
		updatetime:{type:Date,default:Date.now()}
	}
})

MovieSchema.pre("save",function(next){
	if(this.isNew){
		this.moviedate.createtime =this.moviedate.updatetime = Date.now() 
	}else{
		this.moviedate.updatetime = Date.now()
	}
	next()
})

MovieSchema.statics = {
	findAll:function(cb){
		return this
			.find({})
			.sort('moviedate.updatetime')
			.exec(cb)
	},
	findbyid:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = MovieSchema