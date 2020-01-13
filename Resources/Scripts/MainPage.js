//Script for Mainpage(Home)
	var elementsLoaded = 0;
	var elementsNeedToBeLoaded = 5;
	var main_Anime_Finished = false;
	var selectedContent = 3;
	var contentsBackground_Anime_Finished;

	var groupMatesInfo = [["Richard Liao","a983974247@gmail.com","Web developer/App developer<br/><br/>Developed the report website and the front-end of the APP"],	//Name,Email,Contribution
						  ["Yusen Li","zcablil@ucl.ac.uk","<br/>Researcher/Report Editor/UI Designer<br/><br/>Participated the XD design of the prototype, did research, Wrote and edited the report"],
						  ["Valentin Gorbunov","valentin.gorbunov.17@ucl.ac.uk","<br/>Team Leader/Back-End developer<br/><br/>Developed the Back-End of the APP and made the slides and scripts for presentation"]];

	window.scrollTo(0, 0);
	
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	function onScroll_Main(){
		if(elementsLoaded==elementsNeedToBeLoaded && $(window).scrollTop()/$('body')[0].clientHeight >0.8  && $("#Prototype_Watch_1")[0].style.visibility != "visible" )
		{
			changeVisiblility("#Prototype_Watch_1",1);
			animateCSS("#Prototype_Watch_1","fadeInUp_Cust",0,1);
			changeVisiblility("#Prototype_Watch_2",1);
			animateCSS("#Prototype_Watch_2","fadeInLeft_Cust",0,1);
		}
	}

	function animateCSS(elements, animationName, callback, spam)  //when spam == 1, the anime will be deleted after played.
	{

		var node = document.querySelector(elements);
		
		if(node == null)
		{
			console.log("Element '"+ elements +"' not found_Animate");
			return;
		}
		
		function handleAnimationEnd(node,arrayOfNames,spam) {
			if(spam==1)
			{
				for(let i in arrayOfNames)
				{
					node.classList.remove(arrayOfNames[i]);
				}
			}

			if (typeof callback === 'function') callback();
		}
		
		for(let i = 0; i<$(elements).length; i++)
		{

			node = $(elements)[i];

			//Allow multiple atrributes
			var arrayOfNames = animationName.split(" ");
			if(!node.classList.contains('animated'))
			{
				node.classList.add('animated');
			}
			for(let i in arrayOfNames)
			{
				node.classList.add(arrayOfNames[i]);
			}

			if(spam==1)
			{
				node.addEventListener('animationend', function(){handleAnimationEnd(node,arrayOfNames,1);},{once:true});
			}
			else{
				node.addEventListener('animationend', function(){handleAnimationEnd(node,arrayOfNames,0);},{once:true});
			}

		}
	}
	
	function changeVisiblility(elements, to)
	{
		for(let i = 0; i<$(elements).length; i++)
		{
			var node =$(elements)[i];
			switch(to)
			{
				case 0:
					node.style.visibility = "hidden";
					break;
				default:
					node.style.visibility = "visible";
					break;
			}
		}
	}

	function elementLoaded(count)
	{
		elementsLoaded+=count;
		if(elementsLoaded==elementsNeedToBeLoaded)
		{	
			//Hide loading window
			animateCSS("#loading_Main","fadeOut slow",function(){
				$("#loading_Main")[0].style.display="none";
			},1);
			window.scrollTo(0, 0);
			playAnime_Prototype();
		}
	}
	
	function playAnime_Prototype()
	{
		function finished(index){
				setAnimeDelay("#Appendix_"+index,0);
				document.querySelector("#Appendix_"+index).addEventListener('mouseenter', function(){
				const node = document.querySelector("#Appendix_"+index);
				node.classList.remove('animated', "lostFocus");
				node.classList.remove('animated', "faster");
				animateCSS("#Appendix_"+index,"focus faster",0,0);
				});
				
				document.querySelector("#Appendix_"+index).addEventListener('mouseleave', function(){
					const node = document.querySelector("#Appendix_"+index);
					node.classList.remove('animated', "focus");
					node.classList.remove('animated', "faster");
					animateCSS("#Appendix_"+index,"lostFocus faster",0,1);
				});
				main_Anime_Finished = true;
				
				changeVisiblility(".GroupMember",1);
				changeVisiblility(".GroupMember_Text",0);
				animateCSS(".GroupMember","flipInY",function(){
					changeVisiblility(".GroupMember_Text",1);
				},0);
		}
		changeVisiblility("#Background_Home",1);
		changeVisiblility(".Background_Appendix",1);
		animateCSS("#Background_Home","fadeIn_Cust",0,1);
		animateCSS(".Background_Appendix","flipInX slow",0,1);
		for(let i=0; i<6; i++)
		{	
			changeVisiblility("#Appendix_"+i,1);
			setAnimeDelay("#Appendix_"+i,i/8);
			animateCSS("#Appendix_"+i,"fadeInUp",function(){
				finished(i);
			},1);
		}
	}
	
	function setAnimeDelay(element,delay)
	{
		const node = document.querySelector(element);
		node.style["animation-delay"] = delay + "s";
	}

	function showRearch()
	{
		if(main_Anime_Finished ==false || selectedContent == "Research" || document.querySelector("#Prototype_Watch_1").classList.contains("fadeInUp_Cust") == true)
		{ 
			return;
		}

		selectedContent = "Research";
		//Zoom In the contents' background
		changeVisiblility("#contentsBackground",1);
		animateCSS("#contentsBackground","zoomIn slow",0,1);
		//Fade out two displays of watch.
		animateCSS("#Prototype_Watch_1","fadeOutDown fast",function(){
			changeVisiblility("#Prototype_Watch_1",0);
		},1);

		animateCSS("#Prototype_Watch_2","fadeOutUp fast",function(){
			changeVisiblility("#Prototype_Watch_2",0);
		},1);
	}

	function showRearch()
	{
		if(main_Anime_Finished ==false || selectedContent == "Research" || document.querySelector("#Prototype_Watch_1").classList.contains("fadeInUp_Cust") == true)
		{ 
			return;
		}

		//Zoom In the contents' background
		changeVisiblility("#contentsBackground",1);
		animateCSS("#contentsBackground","zoomIn slow",0,1);
		if(selectedContent == "Prototype")
		{
			//Fade out two displays of watch.
			animateCSS("#Prototype_Watch_1","fadeOutDown fast",function(){
				changeVisiblility("#Prototype_Watch_1",0);
			},1);

			animateCSS("#Prototype_Watch_2","fadeOutUp fast",function(){
				changeVisiblility("#Prototype_Watch_2",0);
			},1);
		}
		selectedContent = "Research";
	}

	function showContent(content)
	{
		window.scrollTo(0, $("#Background_Home")[0].clientHeight*(content+1));
	}

	var closeDetailsWindow = function(personID){
		$(".DetailsWindow")[0].style.visibility="hidden";
		animateCSS(personID,"floatAndShape_Reverse fast",function(){
			$(personID)[0].style.zIndex="2";
			$(personID)[0].style.borderRadius="0";
		},1);
		$('.DetailsWindow').replaceWith($('.DetailsWindow').clone());	//Remove All listener;
	};

	function showGroupMateDetails(name) {
		var node = $(".GroupMember");
		for(var i in node){
			try{
				node[i].classList.remove('animated', "rotateY");
			}catch(e){}
		}

		var personID = ("#GroupMember_"+name+"_Image");
		let person = $(personID)[0];

		$(".GroupMember_"+name)[1].classList.remove("animated");
		$(".GroupMember_"+name)[1].classList.remove("flipInY");

		let trigger = $("#GroupMember_"+name+"_Trigger")[0];
		$("#GroupMember_"+name+"_Trigger")[0].remove();
		person.style.zIndex="4";

		var selectedPersonIndex;
		if(name=="Richard"){
			selectedPersonIndex=0;
		}else if(name=="Yusen"){
			selectedPersonIndex=1;
		}else if(name=="Val"){
			selectedPersonIndex=2;
		}

		$("#DetailsWindow_Name")[0].innerHTML=groupMatesInfo[selectedPersonIndex][0];
		$("#DetailsWindow_Email")[0].innerHTML=groupMatesInfo[selectedPersonIndex][1];
		$("#DetailsWindow_Contribution")[0].innerHTML=groupMatesInfo[selectedPersonIndex][2];

		$(".DetailsWindow")[0].style.visibility="visible";
		animateCSS(".DetailsWindow","fadeIn_Cust_",function(){
			$(".DetailsWindow")[0].addEventListener("click", function(){closeDetailsWindow(personID);});
		},1);

		animateCSS("#GroupMember_"+name+"_Image","floatAndShape",function(){
			person.style.zIndex="4";
			person.style.borderRadius="50%";
			$("#HomePage")[0].insertBefore(trigger,$("#HomePage")[0].children[0]);
		},1);

		
		
	}