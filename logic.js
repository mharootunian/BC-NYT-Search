$(document).ready(function () {
    const API_KEY = "0vdPdgFlGmJrMUmAUhPTurtXUZC8gHVN"

    function buildURL(q, startDate, endDate) {
        let baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        baseURL += "q=" + q + "&"
        if (startDate !== "") {
            baseURL += "begin_date=" + startDate + "&"
        }

        if (endDate !== "") {
            baseURL += "end_date=" + endDate + "&"
        }

        baseURL += "api-key=" + API_KEY
        return baseURL;
    }

    function buildHTML() {
        let newArticle = $("<div>")
        let nameElem = $("<p>")
    }

    $("#search").click(function () {

        console.log("Serach term:" + ($("#searchTerm").val()))
        let qUrl = buildURL($("#searchTerm").val(), $("#startYear").val(), $("#endYear").val());
        //let articles = $("#exampleFormControlSelect1").text()
        //console.log(articles)
        $.ajax({
            url: qUrl,
            method: "GET"
        }).then(function (response) {

            let count = 1;
            for (let i = 0; i < 5; i++) {
                console.log(response.response.docs[i])
                let results = $("<div>");
                results.addClass("card card-body");

                let title = $(`<h5>${count}. ${response.headline.main}</h5>`);
                results.attr("data-info", response.headline.main)
                title.addClass("card-title");
                results.append(title);

                let author = $("<p>");
                results.attr("data-info", response.byline.original)
                author.addClass("card-text");
                results.append(author);

                let section = $("<p>");
                results.attr("data-info", response.section_name)
                section.addClass("card-text");
                results.append(section);

                let date = $("<p>");
                date.addClass("card-text");
                results.attr("data-info", response.pub_date)
                results.append(date);

                let link = $("<p>");
                link.addClass("card-text", response.web_url);
                results.append(link);
                $("#topArticles").append(results);
                
                count++;


            }


        }, function (errResponse) {
            console.error(error);
        });


    })


});
///////////////

