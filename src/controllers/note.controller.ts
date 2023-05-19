import { Request, Response } from "express";
import { getUserIdFromToken } from "../middlewares/getUserIdByToken";
import { CreateNoteDTO, UpdateNoteDTO } from "../dtos/note.dtos";
// Service
import NoteService from "../services/note.service";

class NoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;
      const userId = (await getUserIdFromToken(token)) as number;
  
      const { title, description, content, isPublic } = req.body;
  
      // Define o valor como 1 se a checkbox estiver marcada, caso contrário, define como 0
      const isPublicValue = isPublic ? 1 : 0;
  
      const newNote: CreateNoteDTO = {
        title: title,
        description: description,
        content: content,
        userId: userId,
        isPublic: isPublicValue,
      };
  
      console.log("CONTROLLER NOTE: " + newNote);
  
      await NoteService.create(newNote);
  
      return res.status(201).json({ message: "Note created successfully!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  

  public async saveNote(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const { id } = req.params;

      await NoteService.saveNote(userId, parseInt(id));

      return res.status(200).json({ message: "Saved with successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async unsaveNote(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const { id } = req.params;

      await NoteService.unsaveNote(userId, parseInt(id));

      return res.status(200).json({ message: "Unsaved with successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async listSavedNotes(req: Request, res: Response): Promise<Response> {
    console.log("PASSOU AQUI")

    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number

      console.log("ID DO USUARIO AQUI MEU CARO: " + userId)

      const notes = await NoteService.listSavedNotes(userId);

      return res.status(200).json(notes);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  public async updateNote(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const noteId = req.params.id;

      const { title, description, content , isPublic } = req.body;

      const isPublicValue = isPublic ? 1 : 0;

      const updateNote: UpdateNoteDTO = {
        title: title,
        description: description,
        content: content,
        isPublic: isPublicValue
      };

      await NoteService.updateNote(userId, Number(noteId), updateNote);

      return res.status(200).json({ message: "Note updated successfully!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async deleteNote(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const noteId = req.params.id;

      await NoteService.deleteNote(userId, parseInt(noteId));

      return res.status(200).json({ message: "Note moved to trash" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async listNoteById(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const { id } = req.params;

      const note = await NoteService.listNoteById(userId, parseInt(id));

      return res.status(200).json(note);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async listNotes(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = (await getUserIdFromToken(token)) as number;

      const notes = await NoteService.listNotes(userId);

      return res.status(200).json(notes);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new NoteController();
