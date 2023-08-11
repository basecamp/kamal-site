function ready() {

  var highlights = document.querySelectorAll('div.highlight, figure.highlight');

  highlights.forEach(highlight => {

    var button = document.createElement('button');

    button.className = 'copy';
    button.innerText = 'Copy';

    highlight.append(button);

    button.addEventListener('click', function(e) {

      e.preventDefault();

      var code = highlight.querySelector('code').innerText.trim();

      window.navigator.clipboard.writeText(code);

      button.innerText = 'Copied';

      button.blur();

      setTimeout(function() {

        button.innerText = 'Copy';

      }, 1000);

    });

  });

}

export { ready };
