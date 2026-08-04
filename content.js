const interval = setInterval(()=>{
    const reviews = getReviews();

    if (reviews.length === 0) return;
    
    clearInterval(interval);

    const summary = analyseReviews(reviews);
    createPanel(summary);
}, 1000);