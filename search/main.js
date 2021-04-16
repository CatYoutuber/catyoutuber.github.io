var text = document.getElementById("SearchText");
function search() {
    window.location = ("catyoutuber.github.io/search?q=" + encodeURI(text.value));
}
function load() {
    text.value = window.location.search.split("?q=")[1];
}