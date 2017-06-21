module.exports = (rating) => {
    let stars = "";
    let i = 0;
    if (rating) {
        let total = parseInt(rating / 10);
        for(let i=0; i<=total; i++){
            stars += "*";
        }

    }
    return stars;

}