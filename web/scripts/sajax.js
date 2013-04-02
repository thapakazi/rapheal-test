//var datax=[];
var datay=[];


//********************************
var xmlhttp;
//var datax= [];
//var datay= [];


function loadXMLDoc(url,cfunc){
    
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
    }
    
    else
    {// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    
}


function myFunction()
{
      loadXMLDoc("aljazeera/countries.dat",function()
		 {
		     if (xmlhttp.readyState==4 && xmlhttp.status==200)
		     {
			 
		//	 document.getElementById("paperDiv").innerHTML=xmlhttp.responseText;
			 processData(xmlhttp.responseText);
		     }
		 });
}


function processData(allText) {
    var  datax=[];
    var lines = allText.split(/\r\n|\n/);
    
    for (var i=0; i<lines.length -1; i++) {
	
      var eachline = lines[i].split(' ');
	datax[i]=eachline[0]-0;
	datay[i]="%% "+eachline[1];
//	alert("countryName: "+datay[i]+" with newsNo: "+datax[i]);
    }
	drawPie(datax);
//Raphael("paperDiv",640,480).piechart(320,240,80,datax); 
}

//************************
function drawPie(datax){
    alert(datax+datay);
    document.getElementById("paperDiv").innerHTML=datay;
   // var dataxx=datax.slice();// new Array(datax);
   
   // alert(dataxx);

    
    
    // Creates canvas 640 × 480 at 10, 50
    var r = Raphael("paperDiv",640,480);
    // Creates pie chart at with center at 320, 200,
    // radius 100 and data: [55, 20, 13, 32, 5, 1, 2]
    //r.piechart(320, 240, 80, [55, 20, 13, 32, 5, 1, 2,60,120]);

    //				    pie = r.piechart(160, 150, 120, [20,30,40,10], { legend: ["%% boaring", "%% funny","%% genius","%% cool"],href: ["http://raphaeljs.com", "http://g.raphaeljs.com"]});
    pie = r.piechart(160, 150, 120, datax, { legend: datay,href: ["http://raphaeljs.com", "http://g.raphaeljs.com"]});
   // r.text(400, 50, "Pie Chart :Country News:").attr({ font: "20px sans-serif" });
    
    pie.hover(function () {
	this.sector.stop();
	this.sector.scale(1.1, 1.1, this.cx, this.cy);
	
	if (this.label) {
	    this.label[0].stop();
	    this.label[0].attr({ r: 7.5 });
	    this.label[1].attr({ "font-weight": 800 });
	}
       }, function () {
	   this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
	   
	   if (this.label) {
	       this.label[0].animate({ r: 5 }, 500, "bounce");
	       this.label[1].attr({ "font-weight": 400 });
	   }
       });
}
