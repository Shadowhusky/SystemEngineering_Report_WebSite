//Script for Mainpage(Home)
	var elementsLoaded = 0;
	var elementsNeedToBeLoaded = 5;
	var main_Anime_Finished = false;
	var selectedContent = 3;
	var contentsBackground_Anime_Finished;

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	function onScroll_Main(){
		if(elementsLoaded==elementsNeedToBeLoaded && $(window).scrollTop()/$('body')[0].clientHeight >0.3  && $("#Prototype_Watch_1")[0].style.visibility != "visible" )
		{
			changeVisiblility("#Prototype_Watch_1",1);
			animateCSS("#Prototype_Watch_1","fadeInUp_Cust",0,1);
			changeVisiblility("#Prototype_Watch_2",1);
			animateCSS("#Prototype_Watch_2","fadeInLeft_Cust",0,1);
		}
	}

	function animateCSS(element, animationName, callback, spam)  //when spam == 1, the anime will be deleted after played.
	{
		const node = document.querySelector(element);
		
		if(node == null)
		{
			console.log("Element '"+ element +"' not found_Animate");
			return;
		}
		
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
	 	
		function handleAnimationEnd() {
			for(let i in arrayOfNames)
			{
				node.classList.remove(arrayOfNames[i]);
			}
			node.removeEventListener('animationend', handleAnimationEnd);

			if (typeof callback === 'function') callback();
		}

		if(spam==1)
		{
			node.addEventListener('animationend', handleAnimationEnd);
		}
	}
	
	function changeVisiblility(element, to)
	{
		const node = document.querySelector(element);
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

	function elementLoaded(count)
	{
		elementsLoaded+=count;
		if(elementsLoaded==elementsNeedToBeLoaded)
		{	
			//Hide loading window
			animateCSS("#loading_Main","fadeOut slow",function(){
				$("#loading_Main")[0].style.display="none";
			}
			,1);
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
		}
		changeVisiblility("#Background",1);
		animateCSS("#Background","fadeIn_Cust",0,1);
		changeVisiblility("#Background_Watch",1);
		animateCSS("#Background_Watch","fadeIn faster",0,1);
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
		if(	  main_Anime_Finished == false 
			|| selectedContent == content 
			|| contentsBackground_Anime_Finished == false 
			|| document.querySelector("#Prototype_Watch_1").classList.contains("fadeInUp_Cust") == true)
		{ 
			return;
		}

		//Zoom In the contents' background

		if(selectedContent == 3)
		{
			changeVisiblility("#contentsBackground",1);
			//Fade out two displays of watch.
			animateCSS("#Prototype_Watch_1","fadeOutDown fast",function(){
				changeVisiblility("#Prototype_Watch_1",0);
			},1);

			animateCSS("#Prototype_Watch_2","fadeOutUp fast",function(){
				changeVisiblility("#Prototype_Watch_2",0);
			},1);
		}
		contentsBackground_Anime_Finished = false;
		animateCSS("#contentsBackground","zoomIn slow",function(){
			contentsBackground_Anime_Finished = true;
		},1);
		selectedContent = content;
	}