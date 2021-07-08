const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playlists");

let userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  playlists: [
    {
      songs: [
        {
          title: String,
          artist: String,
        },
      ],
    },
  ],
});

let User = mongoose.model("User", UserSchema);

let findOrInsert = (email) => {
  return User.find({
    query: { email: email },
    update: {
      $setOnInsert: { playlists: [] }
    },
    new: true,
    upsert: true
  })
};

module.exports.findOrInsert = save;