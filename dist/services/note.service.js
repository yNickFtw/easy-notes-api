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
const note_repository_1 = __importDefault(require("../repositories/note.repository"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
class NoteService {
    create(newNote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, content, userId } = newNote;
                // check if user exists
                const user = yield user_repository_1.default.findById(userId);
                if (user.name === null || user.email === null || user.password === null) {
                    throw new Error("User not found");
                }
                const newNoteDB = {
                    title: title,
                    description: description,
                    content: content,
                    userId: userId,
                };
                yield note_repository_1.default.create(newNoteDB);
                return;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateNote(userId, noteId, updatedNote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user)
                    throw new Error("User not found!");
                const note = yield note_repository_1.default.findById(noteId);
                if (!note)
                    throw new Error("Note not found!");
                // check if is user owner
                if (userId !== note.userId)
                    throw new Error("You cant't update a note if is not yours!");
                yield note_repository_1.default.updateNote(noteId, updatedNote);
                return note;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    saveNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found!");
                }
                const note = yield note_repository_1.default.findById(noteId);
                if (!note) {
                    throw new Error("Note not found!");
                }
                // check if user is owner of this note
                if (note.userId !== userId) {
                    throw new Error("You are not the owner of this note!");
                }
                const isSaved = yield note_repository_1.default.checkIfIsSaved(userId, noteId);
                if (isSaved) {
                    throw new Error("Note saved with successfully!"); // Lança um erro se a nota já estiver salva
                }
                return;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    unsaveNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found!");
                }
                const note = yield note_repository_1.default.findById(noteId);
                if (!note) {
                    throw new Error("Note not found!");
                }
                // Check if user is owner of this note
                if (note.userId !== userId) {
                    throw new Error("You are not the owner of this note!");
                }
                const checkIfIsSavedByUser = yield note_repository_1.default.checkIfIsSavedByUser(noteId);
                if (!checkIfIsSavedByUser) {
                    throw new Error("Note is not saved by user");
                }
                return yield note_repository_1.default.unsaveNote(noteId);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    listSavedNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user)
                    throw new Error("User not found!");
                const notes = yield note_repository_1.default.listSavedNotes(userId);
                if (!notes) {
                    throw new Error("Not exists saved notes!");
                }
                else {
                    return notes;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if user and note exists
                const user = yield user_repository_1.default.findById(userId);
                if (!user)
                    throw new Error("User not found!");
                const note = yield note_repository_1.default.findById(noteId);
                if (!note)
                    throw new Error("Note not found!");
                // check user is owner of this note
                if (userId !== note.userId)
                    throw new Error("You can't delete a note if is not yours!");
                yield note_repository_1.default.deleteNote(noteId);
                return;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    listNoteById(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user)
                    throw new Error("User not found");
                const note = yield note_repository_1.default.findById(noteId);
                if (!note)
                    throw new Error("Note not found!");
                if (note.userId !== userId)
                    throw new Error("User is not owner of this note!");
                return note;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    listNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(userId);
                if (!user)
                    throw new Error("User not found!");
                const notes = yield note_repository_1.default.listNotes(userId);
                if (!notes)
                    throw new Error("Notes not found!");
                return notes;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = new NoteService();
