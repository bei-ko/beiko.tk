 // 获取音频元素
 var audio = document.getElementById("audio");

 // 添加点击事件监听器
 window.addEventListener("click", playSound);
 window.addEventListener("touchstart", playSound);

 function playSound() {
     if (audio.paused) {
         audio.load(); // 重新加载音频
         audio.play(); // 播放音频
     } else {
         audio.pause(); // 暂停音频
     }
 }