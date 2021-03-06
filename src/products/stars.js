/**
 * Replaces rating with the corresponding # of stars
 * @param {number} rating - Product rating originating from tablets.json
 * @return {string} - String that contains the corresponding # of stars
 */
module.exports = (rating) => {
    let stars = document.createElement("span");
    let i = 0;
    if (rating) {
        let total = parseInt(rating / 10);
        for(let i=0; i<=total; i++){
            stars.innerHTML += "&#9733;";
        }
    }
    return stars.innerHTML;

}