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
Object.defineProperty(exports, "__esModule", { value: true });
const note_model_1 = require("../models/note.model");
class NoteRepository {
    create(note) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.Note.create(Object.assign({}, note));
        });
    }
    updateNote(id, updatedNote) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findOne({ where: { id: id } });
            if (!note)
                throw new Error("Note not found!");
            return yield note.update(updatedNote);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findOne({ where: { id: id } });
            if (!note)
                throw new Error("Note not found!");
            return yield note.destroy();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.Note.findOne({ where: { id: id } });
        });
    }
    checkIfIsSaved(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findOne({ where: { id: noteId } });
            if (!note) {
                throw new Error("Note not found!");
            }
            // Check if is saved
            if (note.isSaved === false) {
                note.isSaved = true;
                yield note.save();
            }
            else {
                throw new Error("Note is already saved!");
            }
            return note;
        });
    }
    checkIfIsSavedByUser(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findOne({ where: { isSaved: true } });
            if (!note) {
                throw new Error("Note is not saved");
            }
            return note;
        });
    }
    unsaveNote(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findOne({ where: { id: noteId } });
            if (!note) {
                throw new Error("Note not found!");
            }
            note.isSaved = false;
            yield note.save();
            return note;
        });
    }
    listSavedNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.Note.findAll({
                where: { userId: userId, isSaved: true },
                order: [["createdAt", "DESC"]],
            });
        });
    }
    listNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.Note.findAll({
                where: { userId: userId },
                order: [["createdAt", "DESC"]],
            });
        });
    }
}
exports.default = new NoteRepository();
