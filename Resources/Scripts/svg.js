var elementsLoaded=0;

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

function loaded()
{
	elementsLoaded++;
	if(elementsLoaded==2)
	{
		animateCSS("#prototype1_screen","flash fast",0,1);
		animateCSS("#prototype2_screen","flash fast",0,1);
	}
}