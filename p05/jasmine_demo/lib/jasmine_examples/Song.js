function Song(title = 'None') {
  this.title = title
}

Song.prototype.persistFavoriteStatus = function(value) {
  // something complicated
  throw new Error("not yet implemented");
};

module.exports = Song;