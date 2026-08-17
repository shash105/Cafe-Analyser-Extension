function createPanel(result) {

    const existingPanel = document.getElementById("cafe-analyser-panel");

    if (existingPanel) {
        existingPanel.remove();
    }

    const panel = document.createElement("div");

    panel.id = "cafe-analyser-panel";

    panel.innerHTML = `
        <div style="
            font-size:26px;
            font-weight:700;
            margin-bottom:20px;
        ">
            ☕ Cafe Analyser
        </div>

        <div style="margin-bottom:10px;">
            📶 <strong>WiFi</strong>
            ${result.wifi?.score ?? 0}/5
            <small>(${result.wifi?.mentions ?? 0} mentions)</small>
        </div>

        <div style="margin-bottom:10px;">
            🔌 <strong>Power sockets</strong>
            ${result.power?.score ?? 0}/5
            <small>(${result.power?.mentions ?? 0} mentions)</small>
        </div>

        <div style="margin-bottom:10px;">
            💻 <strong>Laptop friendly</strong>
            ${result.laptopFriendly?.score ?? 0}/5
            <small>(${result.laptopFriendly?.mentions ?? 0} mentions)</small>
        </div>

        <div style="margin-bottom:10px;">
            🤫 <strong>Quiet</strong>
            ${result.quiet?.score ?? 0}/5
            <small>(${result.quiet?.mentions ?? 0} mentions)</small>
        </div>

        <div style="margin-bottom:10px;">
            🔊 <strong>Noise</strong>
            ${result.noisy?.score ?? 0}/5
            <small>(${result.noisy?.mentions ?? 0} mentions)</small>
        </div>

        <hr style="margin:20px 0;">

        <div>
            <strong>AI summary</strong>

            <p style="
                line-height:1.5;
                color:#444;
            ">
                ${result.overall ?? "No summary available."}
            </p>
        </div>
    `;

    Object.assign(panel.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "420px",
        padding: "25px",
        background: "white",
        color: "#111",
        borderRadius: "18px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        zIndex: "999999",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px"
    });

    document.body.appendChild(panel);

    console.log("AI panel created");
}