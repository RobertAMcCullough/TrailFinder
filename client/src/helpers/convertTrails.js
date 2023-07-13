// hiking project api was ended so have to use a new api. this helper maps the new results to the old results
export default (trail) => {
    const convertedTrail = {};
    convertedTrail.id = trail.id;
    convertedTrail.name = trail.name;
    convertedTrail.location = trail.city;
    convertedTrail.summary = trail.description;
    convertedTrail.difficulty = trail.difficulty;
    convertedTrail.stars = trail.rating;
    convertedTrail.starVotes = 7
    convertedTrail.length = parseFloat(trail.length)
    convertedTrail.ascent = 425;
    convertedTrail.descent = 210;
    convertedTrail.high = 8950;
    convertedTrail.low = 8240;
    convertedTrail.conditionStatus = 'Good';
    convertedTrail.latitude = trail.lat;
    convertedTrail.longitude = trail.lon;
    convertedTrail.imgSmallMed = trail.thumbnail;
    convertedTrail.imgMedium= trail.thumbnail;

    return convertedTrail;
}