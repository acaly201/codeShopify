const select_color = document.querySelector('.select-color');
const list_color = document.querySelectorAll('.color-boxgg');
const title_color = document.querySelector('.select-color')
list_color.forEach((item)=>{
  item.onclick = function(){
    console.log(this.getAttribute('data-color'))
    title_color.textContent = this.getAttribute('data-color') 
  }
})
