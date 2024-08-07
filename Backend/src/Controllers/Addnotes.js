import NotesModel from "../model/NotesModel.js";

const Addnotes = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const { user } = req;

  if (!user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
  }

  if (!title || !content) {
      return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
      const notes = new NotesModel({
          title,
          content,
          tags: tags || [],
          userId: user._id,
      });

      await notes.save();

      return res.status(200).json({ message: "Note added successfully", success: true, notes });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server Error", success: false });
  }
};

export default Addnotes;

const Editnotes = async (req, res) => {
  const noteId = req.params.noteId;

  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ message: "No chnages were made", success: false });
  }

  try {
    const note = await NotesModel.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found", success: false });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }
    await note.save();

    return res
      .status(200)
      .json({ message: "Note updated successfully", success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const Getnotes = async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await NotesModel.find({ userId: user._id }).sort({
      isPinned: -1,
    });

    if (!notes) {
      return res
        .status(404)
        .json({ message: "No notes found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Notes fetched successfully", success: true, notes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server Error geting notes", success: false });
  }
};

const Removenotes = async (req, res) => {
  const noteId = req.params.noteId;

  const { user } = req.user;

  try {
    const note = await NotesModel.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found", success: false });
    }

    await note.deleteOne({
      _id: noteId,
      userId: user._id,
    });

    return res
      .status(200)
      .json({ message: "Note removed successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server Error deleting notes", success: false });
  }
};


const IsPinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
      const note = await NotesModel.findOne({
          _id: noteId,
          userId: user._id,
      });

      if (!note) {
          return res
              .status(404)
              .json({ message: "Note not found", success: false });
      }

      note.isPinned = !note.isPinned;
      await note.save();

      return res.status(200).json({
          message: `Pinned status of note with id ${noteId} has been updated successfully`,
          success: true,
          note,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", success: false });
  }
};


export { Addnotes, Editnotes, Getnotes, Removenotes ,IsPinned};
