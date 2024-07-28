function ready() {

  function showResults(results, store, searchTerm) {

    var searchResults = document.getElementById('search-results');

    document.getElementById('search-query').innerHTML = 'Search results for <mark>' + searchTerm + '</mark>';

    var appendString = '';

    if(results.length) {

      for(var i = 0; i < results.length; i++) {

        var item = store[results[i].ref];

        appendString += '<div class="search-result">';
        appendString += '  <h3><a href="' + item.url + '">' + item.title + '</a></h3>';
        appendString += '  <small><a href="' + item.url + '">' + item.section + '</a></small>';
        appendString += '  <p>' + item.content.substring(0, 250) + '&hellip;</p>';
        appendString += '</div>';

      }

    } else {

      appendString = '<div class="search-result"><p>No results found.</p></div>';

    }

    searchResults.innerHTML = appendString;

  }

  function getQuery(variable) {

    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for(var i = 0; i < vars.length; i++) {

      var pair = vars[i].split('=');

      if(pair[0] === variable) {

        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));

      }

    }

  }

  var searchTerm = getQuery('q');

  if(searchTerm) {

    document.getElementById('search-box').setAttribute('value', searchTerm);

    var idx = lunr(function() {

      this.field('id');
      this.field('title', {
        boost: 10
      });
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
