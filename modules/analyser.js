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

    const score = Math.max(
        0,
        Math.min(
            10,
            (
                result.wifi * 3 +
                result.sockets * 4 +
                result.laptop * 3 +
                result.quiet * 2 -
                result.noisy * 2
            )
        )
    );
   
    result.score = score;

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