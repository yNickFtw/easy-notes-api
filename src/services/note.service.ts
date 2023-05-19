import { CreateNoteDTO, UpdateNoteDTO } from "../dtos/note.dtos";
import NoteRepository from "../repositories/note.repository";
import UserRepository from "../repositories/user.repository";

class NoteService {
  public async create(newNote: CreateNoteDTO): Promise<void> {
    try {
      const { title, description, content, userId } = newNote;

      // check if user exists
      const user: any = await UserRepository.findById(userId);

      if (user.name === null || user.email === null || user.password === null) {
        throw new Error("User not found");
      }

      const newNoteDB: CreateNoteDTO = {
        title: title,
        description: description,
        content: content,
        userId: userId,
      };

      await NoteRepository.create(newNoteDB);

      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateNote(
    userId: number,
    noteId: number,
    updatedNote: UpdateNoteDTO
  ): Promise<any> {
    try {
      const user = await UserRepository.findById(userId);

      if (!user) throw new Error("User not found!");

      const note = await NoteRepository.findById(noteId);

      if (!note) throw new Error("Note not found!");

      // check if is user owner
      if (userId !== note.userId)
        throw new Error("You cant't update a note if is not yours!");

      await NoteRepository.updateNote(noteId, updatedNote);

      return note;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async saveNote(userId: number, noteId: number) {
    try {
      const user = await UserRepository.findById(userId);

      if (!user) {
        throw new Error("User not found!");
      }

      const note = await NoteRepository.findById(noteId);

      if (!note) {
        throw new Error("Note not found!");
      }

      // check if user is owner of this note
      if (note.userId !== userId) {
        throw new Error("You are not the owner of this note!");
      }

      const checkIfIsSavedByUser = await NoteRepository.checkIfIsSavedByUser(noteId)
      
      if(checkIfIsSavedByUser) {
        throw new Error("Note is already saves of user")
      }

      return await NoteRepository.saveNote(noteId)
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async unsaveNote(userId: number, noteId: number) {
    try {
      const user = await UserRepository.findById(userId);

      if (!user) {
        throw new Error("User not found!");
      }

      const note = await NoteRepository.findById(noteId);

      if (!note) {
        throw new Error("Note not found!");
      }

      // Check if user is owner of this note
      if (note.userId !== userId) {
        throw new Error("You are not the owner of this note!");
      }

      const checkIfIsSavedByUser = await NoteRepository.checkIfIsSavedByUser(
        noteId
      );

      if (!checkIfIsSavedByUser) {
        throw new Error("Note is not saved by user");
      }

      return await NoteRepository.unsaveNote(noteId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async listSavedNotes(userId: number): Promise<any> {
    try {
      const user = await UserRepository.findById(userId);

      if (!user) throw new Error("User not found!");

      const notes = await NoteRepository.listSavedNotes(userId);

      if (!notes) {
        throw new Error("Not exists saved notes!");
      } else {
        return notes;
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async deleteNote(userId: number, noteId: number): Promise<any> {
    try {
      // check if user and note exists
      const user = await UserRepository.findById(userId);

      if (!user) throw new Error("User not found!");

      const note = await NoteRepository.findById(noteId);

      if (!note) throw new Error("Note not found!");

      // check user is owner of this note
      if (userId !== note.userId)
        throw new Error("You can't delete a note if is not yours!");

      await NoteRepository.deleteNote(noteId);

      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async listNoteById(userId: number, noteId: number): Promise<any> {
    try {
      const user = await UserRepository.findById(userId);
  
      if (!user) throw new Error("User not found");
  
      const note = await NoteRepository.findById(noteId);
  
      if (!note) throw new Error("Note not found!");
  
      if(note.userId !== userId && !note.isPublic) throw new Error("User is not owner of this note!")

      if(note.isPublic) {
        return note
      } else {
        throw new Error("Something wrong.")
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async listNotes(userId: number): Promise<any> {
    try {
      const user = await UserRepository.findById(userId);

      if (!user) throw new Error("User not found!");

      const notes: any = await NoteRepository.listNotes(userId);

      if (!notes) throw new Error("Notes not found!");

      return notes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new NoteService();
