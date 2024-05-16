const express = require("express");

const songs = express.Router();



//const reviewsController = require('./reviewsController.js')


const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs");

const { checkName, checkBoolean } = require("../validations/checkSongs");

//songs.use('/:song_id/reviews', reviewsController)

songs.get("/", async (_req, res) => {
  const allSongs = await getAllSongs();

  if (allSongs[0]) res.status(200).json(allSongs);
  else res.status(500).json({ error: "server error" });
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

songs.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const song = await createSong(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error });
  }
});

songs.put("/:id", async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  if (id) {
    const updatedSong = await updateSong(id, req.body);
    res.status(200).json(updatedSong);
  } else {
    res.status(400).json({ error });
  }
});

songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json("song not found");
  }
});

module.exports = songs;