$(document).ready(function(){
   //initial 
    $('#navi-content').load('main-pie.html');
    // handle list item clicks
    
    $('ul#navi li a').click(function(){
	var link=$(this).attr('href');
	//alert(link);
	$('#navi-content').load(link);
	return false;

    });
});