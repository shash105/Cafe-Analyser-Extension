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

        <p>Score: ${summary.score}</p>
        <p>WiFi mentions: ${summary.wifi}</p>
        <p>Charging mentions: ${summary.sockets}</p>
        <p>Laptop friendly: ${summary.laptop}</p>
        <p>Quiet mentions: ${summary.quiet}</p>
        <p>Noisy mentions: ${summary.noisy}</p>
        
    `;

    document.body.appendChild(panel);

}