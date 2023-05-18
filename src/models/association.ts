import { Sequelize } from "sequelize";

// models
import { User } from "./user.model";
import { Note } from "./note.model";

class associationConfig {
  init(cb: Function) {
    User.hasOne(Note);
    Note.belongsTo(User);

    cb();
  }
}

export default new associationConfig();
