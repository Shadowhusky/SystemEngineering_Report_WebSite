//Script for Mainpage(Home)
	var elementsLoaded = 0;
	var elementsNeedToBeLoaded = 4;
	
	function animateCSS(element, animationName, callback, spam)  //when spam == 1, the anime will be deleted after played.
	{
		const node = document.querySelector(element)
		
		//Allow multiple atrributes
		var arrayOfNames = animationName.split(" ");
		for(let i in arrayOfNames)
		{
			node.classList.add('animated', arrayOfNames[i]);
		}
		
		function handleAnimationEnd() {
			for(let i in arrayOfNames)
			{
				node.classList.remove('animated', arrayOfNames[i]);
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
		const node = document.querySelector(element)
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
			elementsLoaded = 0;
			playAnime_MainPageLoaded();
		}
	}
	
	function playAnime_MainPageLoaded()
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
		}
		function playSecond()
		{
			changeVisiblility("#Prototype_Watch_1",1);
			animateCSS("#Prototype_Watch_1","fadeInUp_Cust",0,1);
			changeVisiblility("#Prototype_Watch_2",1);
			animateCSS("#Prototype_Watch_2","fadeInLeft_Cust",0,1);
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
				playSecond();
				finished(i);
			},1);
		}
	}
	
	function setAnimeDelay(element,delay)
	{
		const node = document.querySelector(element);
		node.style["animation-delay"] = delay + "s";
	}
	