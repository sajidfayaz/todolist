//This was intended to be the title of every page
// but I dropped it later as I put the title of each page same as the name it was initiated with/created with.
// you can still use it if you want

exports.getDate = () => {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

exports.getDay = () => {
    const today = new Date();

    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}
