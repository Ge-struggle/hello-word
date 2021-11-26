const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
for(let i=1 ; i<6 ; i++){

let xxx='images/pic'+i+'.jpg';

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
thumbBar.appendChild(newImage);

//给图片添加点击事件，每次点击使得displayedImage的src属性为当前图片

  //函数：修改displayedImage的src属性
  function showImage(e){
      //获取src属性
      let src=e.getAttribute('src');
      //修改displayedImage的src 属性
      console.log(src);
      displayedImage.setAttribute('src',src);
  }

  //添加点击事件并绑定函数
    newImage.addEventListener('click',showImage);

}
/* 编写 变暗/变量 按钮功能 */
