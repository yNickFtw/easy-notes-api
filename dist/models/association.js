"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models
const user_model_1 = require("./user.model");
const note_model_1 = require("./note.model");
class associationConfig {
    init(cb) {
        user_model_1.User.hasOne(note_model_1.Note);
        note_model_1.Note.belongsTo(user_model_1.User);
        cb();
    }
}
exports.default = new associationConfig();
