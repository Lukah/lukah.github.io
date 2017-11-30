var searchPrefix = "!";
var searchDefault = 0;
var searchSources = [
    ["dg",      "https://duckduckgo.com/?q={Q}",                        "DuckDuckGo"],
    ["g",       "https://www.google.com/#q={Q}",                        "Google"],
    ["im",      "https://www.google.com/search?tbm=isch&q={Q}",         "Google Images"],
    ["imdb",    "http://www.imdb.com/find?q={Q}",                       "IMDB"],
    ["nya",     "https://www.nyaa.si/?q={Q}",                           "Nyaa Torrents"],
    ["ud",      "http://www.urbandictionary.com/define.php?term={Q}",   "Urban Dictionary"],
    ["wp",      "http://en.wikipedia.org/w/index.php?search={Q}",       "Wikipedia"],
    ["yt",      "https://www.youtube.com/results?search_query={Q}",     "YouTube"],
    ["a",       "https://amazon.fr/s/?field-keywords={Q}",              "Amazon"]
];

var searchInput = $('#search');

$(document).ready(function(){
    initSearchBar();
    clock();

    searchInput.keyup(function(e){
        handleQuery(e, $(this).val());
    });

    var rand = Math.floor((Math.random() * 20) + 1);
    var randBg = rand + ".jpg";
    $("div#picture").css("background-image", "url(src/b/" + randBg + ")");
    $("table").addClass("a" + rand);
    $("body").addClass("b" + rand);
    $("div#menu").addClass("a" + rand);
    $("div#clock").addClass("c" + rand);
});

function initSearchBar() {
    if (searchSources[searchDefault] !== undefined){
        searchInput.attr("placeholder", searchSources[searchDefault][2]);
    } else {
        searchDefault = 0;
        searchInput.attr("placeholder", "Do you know what you're doing?");
        alert("Error: default search engine setting is invalid!");
    }
    searchInput.val("");
}

function handleQuery(event, query) {
    var key = event.keyCode || event.which;
    if (query !== "") {
        var qlist;
        if (key === 32) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === searchPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = searchPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        searchDefault = i;
                        searchInput.attr("placeholder", searchSources[searchDefault][2]);
                        searchInput.val(query.replace(keyword, "").trim());
                        event.preventDefault();
                        break;
                    }
                }
            }
        } else if (key === 13) {
            qList = query.split(" ");
            if (qList[0].charAt(0) === searchPrefix) {
                var keyword = "";
                for (var i = 0; i < searchSources.length; i++) {
                    keyword = searchPrefix + searchSources[i][0];
                    if (keyword === qList[0]) {
                        searchDefault = i;
                        break;
                    }
                }
                if (qList.length > 1) {
                    window.location = searchSources[searchDefault][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
                } else {
                    searchInput.placeholder = searchSources[searchDefault][2];
                    searchInput.val("");
                }
            } else {
                window.location = searchSources[searchDefault][1].replace("{Q}", encodeURIComponent(query));
            }
        }
    }
}

function clock(){
    var currentTime = new Date();
    var currentHours = currentTime.getHours() + 1;
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    currentSeconds = (currentSeconds < 10) ? "0" + currentSeconds : currentSeconds;
    currentMinutes = (currentMinutes < 10) ? "0" + currentMinutes : currentMinutes;
    currentHours = (currentHours < 10) ? "0" + currentHours : currentHours;

    // Compose the string for display
    var currentTimeString = currentHours  + ":" + currentMinutes + ":" + currentSeconds;
    
    $("#clock").html(currentTimeString);
    setTimeout(clock, 1000);
}