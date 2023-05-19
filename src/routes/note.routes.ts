import { Router } from "express";
// Controller
import NoteController from "../controllers/note.controller";
import { checkIfIsAuthenticated } from "../middlewares/authenticateMiddleware";

const router = Router();

router.post("/", checkIfIsAuthenticated, NoteController.create);
router.put("/:id", checkIfIsAuthenticated, NoteController.updateNote);
router.delete("/:id", checkIfIsAuthenticated, NoteController.deleteNote);
router.get("/", checkIfIsAuthenticated, NoteController.listNotes);
router.get('/saves', checkIfIsAuthenticated, NoteController.listSavedNotes)
router.get('/publics', checkIfIsAuthenticated, NoteController.listPublicNotes)
router.get('/:id', checkIfIsAuthenticated, NoteController.listNoteById)
router.put('/save/:id', checkIfIsAuthenticated, NoteController.saveNote)
router.put('/unsave/:id', checkIfIsAuthenticated, NoteController.unsaveNote)

export default router;
