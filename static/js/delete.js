$(function(){
	$(".delete").click(function(){
		var that = this;
		var id = $(this).data("id");
		$.ajax({
			type:'DELETE',
			url:'/admin/delete',
			dataType:'json',
			data:{id:id},
			success:function(res){
				if(res.success == 1){
					$(that).parents("tr").remove();
				}
			}
		})
	})
})