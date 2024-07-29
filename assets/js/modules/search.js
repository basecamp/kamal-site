function ready() {

  function showResults(results, store, searchTerm) {

    var searchResults = document.getElementById('search-results');

    document.querySelector('#search-query mark').textContent = searchTerm;

    var appendString = '';

    if(results.length) {

      results.forEach(result => {

        var item = store[result.ref];

        appendString += '<div class="search-result">';
        appendString += '  <h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '  <small><a href="' + item.url + '">' + item.section + '</a></small>';
        appendString += '  <p>' + item.content.substring(0, 250) + '&hellip;</p>';
        appendString += '</div>';

      });

    } else {

      appendString = '<div class="search-result"><p>No results found.</p></div>';

    }

    searchResults.innerHTML = appendString;

  }

  function getQuery(variable) {

    var params = new URLSearchParams(window.location.search.substring(1));

    if(params.has(variable)) {

      return decodeURIComponent(params.get(variable).replace(/\+/g, '%20'));

    }

    return null;

  }

  var searchTerm = getQuery('q');

  if(searchTerm) {

    var searchBoxes = document.querySelectorAll('.search-box');

    searchBoxes.forEach(searchBox => {

      searchBox.setAttribute('value', searchTerm);

    });

    var idx = lunr(function() {

      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('section');
      this.field('content');

      for(var key in window.store) {
        this.add({
          'id': key,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'section': window.store[key].section,
          'content': window.store[key].content
        });
      }

    });

    var results = idx.search(searchTerm);

    showResults(results, window.store, searchTerm);

  }

}

export { ready };
