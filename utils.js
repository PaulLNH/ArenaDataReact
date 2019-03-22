module.exports = {
    getMapImage(map) {
        const maps = {

        };
        return (maps[map] || maps['default']);
    },
};