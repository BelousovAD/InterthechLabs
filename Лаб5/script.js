var gallery;
var task2 = 0;

//Загрузка из файла
function loadJSON() {
	$.ajax({
		url: "gallery.json",
		dataType: "json",
		success: function(data) {
			gallery = data;
			$(".img0").attr('src', gallery.images[0].file);
			$(".img1").attr('src', gallery.images[1].file);
			$(".img2").attr('src', gallery.images[2].file);
			$("#preview").attr('src', gallery.images[task2].file);
		}
	});
};


//1 пункт
$('.in img').click(function()
{
	let imgSrc = $(this).attr("src");
	$('#img_container').css({
		"left": "50%",
		"top": "50%",
		"transform": "translate(-50%, -50%)"
	});
	$('#img_container>img').attr("src", imgSrc);
	$('#img_container>img').css({
		"height": $(window).height()
	});
	$('#img_container').fadeIn('slow');
	$('#bg_container').fadeIn('slow');
});
$('#bg_container').click(function()
{
	$(this).fadeOut();
});


//2 пункт
$("#btn_left").button({
	disabled: true
});
$("#btn_left").click(function(){
	task2--;
	if (task2 == -1) {
	task2 = 2;
	}
	$("#preview").attr('src', gallery.images[task2].file);
	$("#fivethree").slider("value", task2);
});
$("#btn_right").button({
	disabled: true
});
$("#btn_right").click(function(){
	task2++;
	if (task2 == 3) {
	task2 = 0;
	}
	$("#preview").attr('src', gallery.images[task2].file);
	$("#fivethree").slider("value", task2);
});

//3 пункт
$("#fivethree").slider(
{
	disabled: true,
	value: task2,
	min: 0,
	max: 2,
	change: function(event, ui){
		task2 = ui.value;
		$("#preview").attr('src', gallery.images[task2].file);
	}
});

//4 пункт
$("#fivefour").accordion();

//5 пункт
$("#datepicker").datepicker();

//6 пункт
$("#buttonLoadJSON").click(function(){
	let i = 0;
	$("#fivesix").progressbar({
	value: i,
	complete: function(){
		$("#fivesix").progressbar("destroy");
		loadJSON();
		$(".in>img").effect( "bounce", { times: 3 }, "slow" );
		$("#fivethree").slider("enable");
		$("#btn_left").button("enable");
		$("#btn_right").button("enable");
	}
	});
	function inc(){
		if(i != 100){
		  i++;
		  $("#fivesix").progressbar("value", i);
		  setTimeout(inc, 10);
		}else{
		  return;
		}
	}
	inc();
});

// 7 пункт
$("#fiveseven").tabs();
  
// 8 пункт
$("#button8").click(function() {
	$(".in>img").toggleClass("newClass");
});
