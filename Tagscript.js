const tags = ['foods', 'beaches', 'mountains', 'landscape', 'dogs'];
const list = document.getElementById('list-data');
const answerList = document.getElementById('choices');
let answer = ''


function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ', ' + g + ',' + b + ')'
}

function reset() {
    answerList.innerHTML = "";
    answer = tags[Math.floor(Math.random() * tags.length)]
    getTaggedPhoto(answer);

    const choices = [];
    choices.push(answer);
	
	while (choices.length < 5) {
        const rand = tags[Math.floor(Math.random() * tags.length)]
        if (choices.indexOf(rand) == -1) {
            choices.push(rand);
        }
    }

    choices.sort(function() {
        return Math.random() * 2 - 1;
    });


    for (let i = 0; i < choices.length; i++) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        li.appendChild(btn)
        btn.innerHTML = choices[i]
        btn.style.backgroundColor = randomColor();
        btn.onclick = function() {
            if (btn.innerHTML == answer) {
                alert('You are Right!')
            } else {
                alert('Sorry! The answer is ' + answer)
            }
            reset();
        }
        answerList.appendChild(li);
    }
}

function getTaggedPhoto(tagName) {
    fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=NKa8ReKPZL8u6bDKw3xIpFPDQ7K2x1yXFoVYPvOtja33qRlm5K')
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result)
            list.innerHTML = ''
            const items = result.response;

            let masonry;
            console.log(masonry)
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.photos != undefined) {
                    const imgSrc = item.photos[0].original_size.url;

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    
                    img.onload =function(){
                    	masonry.layout();
                    }

                    const li = document.createElement('li');
                    li.appendChild(img);
                    //li.innerHTML=imgSrc;
                    list.appendChild(li);
                }
            }
            masonry = new Masonry(list,{
            	itemSelector:'li',
            	gutterWidth:8
            });
            masonry.layout();
        })
}

reset();