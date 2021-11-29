const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */

for(let i =1 ; i<6 ; i++){

    let xxx='images/pic'+i+'.jpg';

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
thumbBar.appendChild(newImage);

    //定义一个函数，替换displayedImage的属性
    function showImage(e){
        let src=e.target.getAttribute('src');
        displayedImage.setAttribute('src',src);
    };

    //在图片点击事件上绑定函数

    newImage.addEventListener('click',showImage);


}
/* 编写 变暗/变量 按钮功能 */

    //定义一个函数修改overlay的blackground
    function  beDark(e){
        const classname=e.target.getAttribute('class');
        let background_color1='rgba(0,0,0,0.5)';
        let background_color2='rgba(0,0,0,0)';
        if(classname === 'dark'){
            overlay.style.setProperty('background-color',background_color2);
            e.target.textContent='变暗';
            e.target.setAttribute('class','light')
        }else{
            overlay.style.setProperty('background-color',background_color1);
            e.target.textContent='变亮';
            e.target.setAttribute('class','dark')
        }

    }

    //按钮绑定
    btn.onclick=beDark;
