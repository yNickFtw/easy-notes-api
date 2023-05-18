"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUserIdByToken_1 = require("../middlewares/getUserIdByToken");
// Service
const note_service_1 = __importDefault(require("../services/note.service"));
class NoteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const { title, description, content } = req.body;
                const newNote = {
                    title: title,
                    description: description,
                    content: content,
                    userId: userId,
                };
                console.log("CONTROLLER NOTE: " + newNote);
                yield note_service_1.default.create(newNote);
                return res.status(201).json({ message: "Note created successfully!" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    saveNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const { id } = req.params;
                yield note_service_1.default.saveNote(userId, parseInt(id));
                return res.status(200).json({ message: "Saved with successfully" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    unsaveNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const { id } = req.params;
                yield note_service_1.default.unsaveNote(userId, parseInt(id));
                return res.status(200).json({ message: "Unsaved with successfully" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    listSavedNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PASSOU AQUI");
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                console.log("ID DO USUARIO AQUI MEU CARO: " + userId);
                const notes = yield note_service_1.default.listSavedNotes(userId);
                return res.status(200).json(notes);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const noteId = req.params.id;
                const { title, description, content } = req.body;
                const updateNote = {
                    title: title,
                    description: description,
                    content: content,
                };
                yield note_service_1.default.updateNote(userId, Number(noteId), updateNote);
                return res.status(200).json({ message: "Note updated successfully!" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const noteId = req.params.id;
                yield note_service_1.default.deleteNote(userId, parseInt(noteId));
                return res.status(200).json({ message: "Note moved to trash" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    listNoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const { id } = req.params;
                const note = yield note_service_1.default.listNoteById(userId, parseInt(id));
                return res.status(200).json(note);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    listNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const notes = yield note_service_1.default.listNotes(userId);
                return res.status(200).json(notes);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = new NoteController();
