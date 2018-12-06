import _ from 'lodash';
import '../css/style.scss';
import '../css/button.scss';

const button = document.createElement('button');
const text = document.createTextNode('Click Me!');

button.classList.add('btn', 'btn-primary');
button.appendChild(text);

button.onclick = async () => {
  await import('./image.js');

  button.remove();
};

document.body.appendChild(button);