const spisok = document.querySelectorAll('img');
function slaid(direction) {
    let item;
    spisok.forEach(n => { if (n.classList == 'd_block') item = Number(n.id)});spisok[item].classList.replace('d_block', 'd_none');
    if (item+direction == -1) item = spisok.length;
    if (item+direction == spisok.length) item = -1;
    spisok[item+direction].classList.replace('d_none', 'd_block');
}