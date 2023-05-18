"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const router = (0, express_1.Router)();
router.post("/", authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.create);
router.put("/:id", authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.updateNote);
router.delete("/:id", authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.deleteNote);
router.get("/", authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.listNotes);
router.get('/saves', authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.listSavedNotes);
router.get('/:id', authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.listNoteById);
router.put('/save/:id', authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.saveNote);
router.put('/unsave/:id', authenticateMiddleware_1.checkIfIsAuthenticated, note_controller_1.default.unsaveNote);
exports.default = router;
