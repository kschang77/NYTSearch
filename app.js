// attach submit to search method

$("#searchButton").on("click", function(event) {
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

        for (var i=0; i<=4; i++) {
            var curres = res [i] 
            console.log(curres)
            stweb_url = curres.web_url; //done
            console.log(stweb_url);

            // section_name
            stsection_name = curres.section_name; //done
            console.log(stsection_name);
            // byline.original
            stbyline = curres.byline.original; //done
            console.log(stbyline);
            // pub_date
            stpub_date = curres.pub_date; //done
            console.log(stpub_date);
            // headline.main
            stheadline = curres.headline.main; //done
            console.log(stheadline);


            // all parameters read, populating the corresponding boxes in Top Articles
            var articlesEl = $(".card-body.articles")
            var articleDiv = $("<div>")
                articleDiv.addClass("articles")
                articleDiv.attr('id',"article"+i)

            var artheader = $("<header>")
                artheader.addClass("article-title")
                artheader.text(stheadline)

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
