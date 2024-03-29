import { Op } from "sequelize";
import { CreateNoteDTO, UpdateNoteDTO } from "../dtos/note.dtos";
import { Note } from "../models/note.model";
import { User } from "../models/user.model";

class NoteRepository {
  public async create(note: CreateNoteDTO): Promise<any> {
    return Note.create({ ...note });
  }

  public async updateNote(
    id: number,
    updatedNote: UpdateNoteDTO
  ): Promise<any> {
    const note = await Note.findOne({ where: { id: id } });

    if (!note) throw new Error("Note not found!");

    return await note.update(updatedNote);
  }

  public async deleteNote(id: number): Promise<any> {
    const note = await Note.findOne({ where: { id: id } });

    if (!note) throw new Error("Note not found!");

    return await note.destroy();
  }

  public async findById(id: number): Promise<any> {
    return await Note.findOne({ where: { id: id }, include: [{ model: User, attributes: ["id", "name"] }] });
  }

  public async checkIfIsSaved(userId: number, noteId: number): Promise<any> {
    const note: any = await Note.findOne({ where: { id: noteId } });

    if (!note) {
      throw new Error("Note not found!");
    }

    // Check if is saved
    if (note.isSaved === false) {
      note.isSaved = true;
      await note.save();
    } else {
      throw new Error("Note is already saved!");
    }

    return note;
  }

  public async checkIfIsSavedByUser(noteId: number): Promise<any> {
    const note = await Note.findOne({ where: { id: noteId, isSaved: true } });

    return note;
  }

  public async saveNote(noteId: number): Promise<boolean> {
    const note: any = await Note.findOne({ where: { id: noteId } });

    if (!note) throw new Error("Note not found");

    note.isSaved = true;

    await note.save();

    return note;
  }

  public async unsaveNote(noteId: number): Promise<boolean> {
    const note: any = await Note.findOne({ where: { id: noteId } });

    if (!note) {
      throw new Error("Note not found!");
    }

    note.isSaved = false;

    await note.save();

    return note;
  }

  public async searchPublicsNotes(q: string): Promise<any> {
    return await Note.findAll({
      where: {
        title: {
          [Op.like]: `%${q}%`
        },
        isPublic: true
      },
      include: { model: User, attributes: ["id", "name"] }
    });  
  }

  public async listSavedNotes(userId: number): Promise<any> {
    return await Note.findAll({
      where: { userId: userId, isSaved: true },
      order: [["createdAt", "DESC"]],
    });
  }

  public async listPublicNotes(): Promise<any> {
    return await Note.findAll({
      where: { isPublic: 1 },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, attributes: ["id", "name"] }]
    });
  }

  public async listNotes(userId: number): Promise<any> {
    return await Note.findAll({
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });
  }
}

export default new NoteRepository();
