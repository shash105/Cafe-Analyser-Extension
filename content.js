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

const interval = setInterval(() => {

    if (clickMoreReviews()) {

        clearInterval(interval);

        setTimeout(() => {

            const reviews = getReviews();

            const summary = analyseReviews(reviews);

            createPanel(summary);

        }, 2000);

    }

}, 1000);