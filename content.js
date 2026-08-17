function clickMoreReviews() {

    const elements = [...document.querySelectorAll("*")];

    const button = elements.find(el =>
        el.innerText?.trim() === "More user reviews"
    );

    if (button) {
        console.log("Found More user reviews button");
        button.click();
        return true;
    }

    return false;

}

// keep clicking "More user reviews" as long as Google provides it

function keepLoadingReviews(onComplete) {
    
    const interval = setInterval(() => {
        const clicked = clickMoreReviews();

        if (clicked) {
            console.log("More reviews loaded, checking again...");
        }

    }, 1500);

    // Stop after 30 seconds
    setTimeout(() => {
        clearInterval(interval);
        console.log("Finished loading reviews.");
        onComplete();
    }, 30000);
}

//first finding and clicking the initial "More user reviews" button

const interval = setInterval(() => {
    if (clickMoreReviews()) {
        clearInterval(interval);
        console.log("Initial reviews button clicked");

        // time to open the reviews section
        setTimeout(() => {
            keepLoadingReviews(() => {
                console.log("Now extracting all reviews...");
                const reviews = getReviews();
                console.log("Total reviews:", reviews.length);
                const summary = analyseReviews(reviews);
                createPanel(summary);
            });
        }, 2000);

    }
}, 1000);