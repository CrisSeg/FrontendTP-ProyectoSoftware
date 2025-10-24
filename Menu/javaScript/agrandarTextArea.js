const textN = document.getElementById('textNote');

textN.addEventListener("input", ()=>{
    textN.style.height = "auto";
    textN.style.height = textN.scrollHeight + "px";
})