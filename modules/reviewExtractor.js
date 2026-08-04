function getReviews() {
    const cards = [...document.querySelectorAll(".bwb7ce")];
    return cards.map(card => card.innerText);
}