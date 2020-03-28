// validate year fields
// main form ready
$(document).ready(function() {
    // init form id="form-main"
    $("#form-main").validate({
      debug: true,
    //   onsubmit: false,
      // rules
      rules: {
        searchTerm: {
          required: "true",
          minlength: 3
        },
        startYear: {
            range:[1900,2020]
        },
        endYear: {
            range: [1900,2020]
        }
      },
      messages: {
        searchTerm: {
          required: "Plase enter a search term of 3 characters or longer",
          minlength: "Search term must be at least 3 characters long"
        },
        startYear: {
          range : "Between 1900 and 2020 please, or leave it blank."
        },
        endYear: {
          range: "Between 1900 and 2020 please, or leave it balnk."
        }
      },
    //   submitHandler: function(form) {
    //     form.submit();
    //   }
    });
});

// attach submit to search method

$("#searchButton").on("click", function(event) {
    $("#form-main").valid();
    event.preventDefault();

    var searchTerm = $("#searchTerm").val();

    var searchNum = $("#numberOfRecords").val();

    var searchStart = $("#startYear").val()

    var searchEnd = $("#endYear").val()

    var apikey = "pnIQwqEqcO2ShlGiRlYxzyQHj1s9kj5b"
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+"begin_date="+searchStart+"0101"+"&end_date="+searchEnd+"1231"+"&page=1&q="+searchTerm+"&sort=relevance&api-key="+apikey

// make JS ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        var res = response.response.docs

        console.log(res)

        for (var i=0; i<searchNum; i++) {
            var curres = res [i] 
            // console.log(curres)
            stweb_url = curres.web_url; //done
            // console.log(stweb_url);

            // section_name
            stsection_name = curres.section_name; //done
            // console.log(stsection_name);
            // byline.original
            stbyline = curres.byline.original; //done
            // console.log(stbyline);
            // pub_date
            stpub_date = curres.pub_date; //done
            // console.log(stpub_date);
            // headline.main
            stheadline = curres.headline.main; //done
            // console.log(stheadline);


            // all parameters read, populating the corresponding boxes in Top Articles
            var articlesEl = $(".card-body.articles")
            var articleDiv = $("<div>")
                articleDiv.addClass("articles article-div")
                articleDiv.attr('id',"article"+i)

            var artheader = $("<header>")
                artheader.addClass("article-title")
                artheader.html("<span class='article-count'>"+(i+1)+"</span> "+stheadline)

            var artauthor = $("<h5>")
                artauthor.addClass("article-author")
                artauthor.text(stbyline)

            var artsection = $("<h5>");
                artsection.addClass("article-section");
                artsection.text(stsection_name);

            var artpubdate = $("<h5>");
                artpubdate.addClass("publication-date");
                artpubdate.text(stpub_date);

            var arturl = $("<h6>");
                arturl.addClass("url");
                arturl.html("<small>"+stweb_url+"</small>");

            articleDiv.append(artheader,artauthor,artsection,artpubdate,arturl)

            articlesEl.append(articleDiv)
        }
    })
});
