console.log("Cafe Analyser running");

const keywords = {
    wifi: ["wifi", "wi-fi", "internet"],
    sockets: ["socket", "sockets", "charging", "charger", "outlet", "plug"],
    laptop: ["laptop", "work", "study", "remote"],
    quiet: ["quiet", "peaceful", "calm"],
    noisy: ["busy", "loud", "noisy", "echo"]
};

function analyseReviews(reviewTexts){

    const result = {
        wifi:0,
        sockets:0,
        laptop:0,
        quiet:0,
        noisy:0
    };

    reviewTexts.forEach(review=>{
        const text = review.toLowerCase();

        for(const category in keywords){
            keywords[category].forEach(word=>{
                if(text.includes(word)){
                    result[category]++;
                }
            });
        }
    });
    return result;
}


function createPanel(summary){
    const old = document.getElementById("cafe-analyser");
    if(old) old.remove();
    const panel = document.createElement("div");
    panel.id = "cafe-analyser";

    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.right = "20px";
    panel.style.background = "white";
    panel.style.borderRadius = "12px";
    panel.style.padding = "20px";
    panel.style.zIndex = 99999999;
    panel.style.width = "300px";
    panel.style.color = "black";
    panel.style.boxShadow = "0 5px 20px rgba(0,0,0,.3)";
    panel.style.fontFamily = "Arial";


    panel.innerHTML = `
        <h2>☕ Cafe Analyser</h2>

        <p>WiFi mentions: ${summary.wifi}</p>
        <p>Charging mentions: ${summary.sockets}</p>
        <p>Laptop friendly: ${summary.laptop}</p>
        <p>Quiet mentions: ${summary.quiet}</p>
        <p>Noisy mentions: ${summary.noisy}</p>
    `;

    document.body.appendChild(panel);

}


const interval = setInterval(()=>{
    const reviews = [...document.querySelectorAll(".bwb7ce")];
    if(reviews.length===0) return;
    clearInterval(interval);
    const reviewTexts = reviews.map(review=>review.innerText);
    const summary = analyseReviews(reviewTexts);
    createPanel(summary);

},1000);