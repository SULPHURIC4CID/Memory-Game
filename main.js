let animal = {"parentElephant":0,
              "childElephant":1,
              "parentTiger":2,
              "childTiger":3,
              "parentDeer":4,
              "childDeer":5,
              "parentDog":6,
              "childDog":7,
              "parentCat":8,
              "childCat":9,
              "parentCow":10,
              "childCow":11,
              "parentBear":12,
              "childBear":13,
              "parentRabbit":14,
              "childRabbit":15,
            };
let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

let randomAnimal = {};
let count = 0;
let image1="a";
let image2="v";
let image1Id;
let image2Id;
let flag = true;
let flag2 = true;
let matchesFound = 0;

setInterval(()=>{
    if(flag==true)
    {
        if(flag2==true)
        {
            let bt = document.getElementById('generateButton');
            bt.setAttribute("class","text-white self-center bg-slate-400 shadow-md rounded-full border-2 border-slate-900 m-3 p-3 mb-20 text-xl");
            flag2 = false;
        }
        else
        {
            let bt = document.getElementById('generateButton');
            bt.setAttribute("class","text-black self-center bg-slate-400 shadow-md rounded-full border-2 border-slate-900 m-3 p-3 mb-20 text-xl");
            flag2 = true;
        }
    }
},500);

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Loaded');    
  });

generateGrid = () => {
    let bt = document.getElementById('generateButton');
    bt.setAttribute("class","text-black self-center bg-slate-400 shadow-md rounded-full border-2 border-slate-900 m-3 p-3 mb-20 text-xl");
    flag = false;
    count=0;
    console.log("Generating Grid");
    array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    //console.log(animal);
    try
    {
        const gride = document.getElementById('grid');
        gride.remove();
        console.log('Removed old grid');
    }
    catch
    {
        console.log("Nothing to clear.");
    }

    let grid = document.createElement('div');
    grid.id = "grid";
    let gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-10 place-content-evenly";
    grid.setAttribute("class",gridClass);
    document.body.append(grid);
    for(let i = 0;i<16;i++)
    {
        let randomValue = Math.floor((Math.random()*100)%16);
        //console.log(randomValue);
        while(array.indexOf(randomValue)<0)
        {
            randomValue = Math.floor((Math.random()*100)%16);
        }
        //console.log(array);
        //console.log(array.indexOf(randomValue));
        array.splice(array.indexOf(randomValue),1);
        let imageName = Object.keys(animal).find(key => animal[key] === randomValue);
        //console.log(imageName);
        imageName = imageName+".jpg";
        //console.log(imageName);


        let ele = document.createElement('div');
        ele.id = "box"+i;
        ele.innerText = "";
        ele.setAttribute("class","bg-red-500 text-red-500 text-bold border-blue-700 border-4 h-52 w-52 place-self-center");

        randomAnimal["image"+i] = imageName;

        let imageElement = document.createElement('img');  
        imageElement.setAttribute("id","image"+i);
        imageElement.setAttribute("src","Figures/background.jpg");
        imageElement.setAttribute("onclick","imagePress(this.id)");
        imageElement.setAttribute("onmouseover","hover(this.id)");
        imageElement.setAttribute("style","height:200px; width:200px;");
        ele.append(imageElement);
        grid.append(ele);
    }
    console.log(randomAnimal);
}

let uncover = (id) => {
    count++;
    if(count==1)
    {
        image1 = randomAnimal[id];
        image1Id = id;
        let imgElement = document.getElementById(id);
        console.log(id);
        imgElement.setAttribute("src","Figures/"+randomAnimal[id]);
        imgElement.removeAttribute("onmouseover");
        imgElement.removeAttribute("onclick");
    }
    else if(count==2)
    {
        image2 = randomAnimal[id];
        image2Id = id;
        let imgElement = document.getElementById(id);
        console.log(id);
        imgElement.setAttribute("src","Figures/"+randomAnimal[id]);
        imgElement.removeAttribute("onmouseover");
        imgElement.removeAttribute("onclick");
    }   
}


let check = () => {
    //console.log(image1,image2);
    if(image1[0] === "p")
        image1 = image1.substring(6);
    else if(image1[0] === "c")
        image1 = image1.substring(5);

    if(image2[0] === "p")
        image2 = image2.substring(6);
    else if(image2[0] === "c")
        image2 = image2.substring(5);
    console.log(image1,image2);

    if(image1===image2)
    {
        setTimeout(() => {
            alert("You found a Match");
        }, 20);         
        //console.log(image1,image2);
        ele1 = document.getElementById(image1Id);
        ele2 = document.getElementById(image2Id);
        ele1.removeAttribute("onmouseover");
        ele1.removeAttribute("onclick");
        ele1.removeAttribute("class");
        ele2.removeAttribute("onmouseover");
        ele2.removeAttribute("onclick");            
        ele2.removeAttribute("class");
        //console.log("Matching");
        matchesFound+=2;
        if(matchesFound==16)
        {
            setTimeout(()=>{
                alert("Congratulations!!! You found all the pairs.");
            },500);            
            const bt = document.getElementById('generateButton');
            bt.innerHTML = "Play Again!";
            flag = true;
        }
    }
    else
    {
        setTimeout(() => {
            //alert("OOPs! Incorrect Match");
            ele1.setAttribute("src","Figures/background.jpg");
            ele2.setAttribute("src","Figures/background.jpg");
            ele1.setAttribute("onclick","imagePress(this.id)");
            ele1.setAttribute("onmouseover","hover(this.id)");
            ele2.setAttribute("onclick","imagePress(this.id)");
            ele2.setAttribute("onmouseover","hover(this.id)");
            ele1.setAttribute("class","hover:scale-90");
        }, 700);

        //console.log(image1,image2);
        ele1 = document.getElementById(image1Id);
        ele2 = document.getElementById(image2Id);            
        
        //console.log("Not Matching");
    }
}


let imagePress = (id) => {
    if(count==0 || count==1)
        uncover(id);
    if(count==2)
    {
        check();
        count=0;
    }
}

let hover = (id) => {
    let imgElement = document.getElementById(id);
    imgElement.setAttribute("class","hover:scale-90");
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
