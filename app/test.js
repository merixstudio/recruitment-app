export default {
  name: 'Mike',
  questions: [
    {
      id: 1,
      type: 'javascript',
      content: `(function (dependency) {
  const a = {
    text: 'text',
    isValid: true,
    twelve: 12,
  };
  /* Put your code here */
})(dependency)`,
      text: 'Write your own JavaScript framework in 3 lines.',
    },
    {
      id: 2,
      type: 'html',
      content: `<div className="what__ever">
  <div className="other--thing"></div>
</div>`,
      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum porttitor egestas metus nec congue. Nunc ut tellus est.',
    },
    {
      id: 3,
      type: 'text',
      content: '',
      text: 'Quisque tincidunt suscipit libero, vitae consectetur nibh eleifend sit amet. Morbi dictum, lectus ac laoreet accumsan, erat purus fringilla dui, quis sodales lacus sem eu dui.',
    },
    {
      id: 4,
      type: 'python',
      content: `def func(a):
  pass
a = (4,)
func(a)`,
      text: 'Why Python doesn\'t use brackets?',
    },
    {
      id: 5,
      type: 'css',
      content: `#me {
  color: white;
  height: 180em;
}
.class {
  top: 1%;
}
input[type='challange'] {
  font-weight: bold;
}`,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo sapien, gravida eget tempor non, molestie ac nibh. Donec gravida dolor ac neque accumsan varius. Integer tempus vulputate nunc, quis iaculis risus fermentum a. ',
    },
  ],
};
