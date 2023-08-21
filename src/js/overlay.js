window.transitionToPage = function (href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function () {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector('body').style.opacity = 1
})

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const region = urlParams.get("region");
const name = urlParams.get("name");
const tag = urlParams.get("tag");

async function OverlayUpdate() {
    const url = `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}`
    const response = await fetch(url);
    const data = await response.json();

    // changing #username to name + "#" + tag
    document.getElementById("username").innerText = name + "#" + tag;

    // chaning #rank_name to patched tier name
    document.getElementById("rank_name").innerText = data.data.currenttierpatched;

    // changing #rank_rr_progresstext to the current rr + "/100"
    document.getElementById("rank_rr_progresstext").innerText = data.data.ranking_in_tier + "/100";

    // changing #rank_icon to the large rank icon
    document.getElementById("rank_icon").src = data.data.images.large;

    // changing the width of #rank_rr_progress to make it track the progress
    document.getElementById("rank_rr_progress").style.width = data.data.ranking_in_tier + "%";
}

OverlayUpdate();

// updating the overlay every 2 minutes
setInterval(OverlayUpdate, 2 * 60 * 1000)