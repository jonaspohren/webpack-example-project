import small from '../img/small.jpg';
import big from '../img/big.jpg';
import '../css/image.scss';

const smallImg = document.createElement('img');
const bigImg = document.createElement('img');

smallImg.classList.add('rounded');
smallImg.src = small;

bigImg.classList.add('rounded');
bigImg.src = big;

document.body.appendChild(smallImg);
document.body.appendChild(bigImg);