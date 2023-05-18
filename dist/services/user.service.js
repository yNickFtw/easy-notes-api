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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = user;
                if (!name || !email || !password) {
                    throw new Error("Missing data!");
                }
                const checkIfUserExists = yield user_repository_1.default.checkIfUserExists(email);
                if (checkIfUserExists) {
                    throw new Error("User already exists!");
                }
                // Encrypt password
                const salt = yield bcryptjs_1.default.genSalt(10);
                const encryptedPassword = yield bcryptjs_1.default.hash(password, salt);
                const newUser = {
                    name: name,
                    email: email,
                    password: encryptedPassword,
                };
                yield user_repository_1.default.create(newUser);
                return;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new Error("Missing data!");
                }
                const user = yield user_repository_1.default.checkIfUserExists(email);
                if (!user)
                    throw new Error("User not found!");
                if (!user.password)
                    throw new Error("Password of user is not defined");
                const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
                if (!isValidPassword)
                    throw new Error("Invalid password!");
                const response = yield this.generateToken(user.id);
                return { response };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_repository_1.default.findAll();
                if (!users) {
                    throw new Error("Users not found!");
                }
                return users;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.findById(id);
                if (!user) {
                    throw new Error("User not found!");
                }
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    generateToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findById(id);
            if (!user) {
                throw new Error("Usuário não encontrado!");
            }
            const token = jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
                expiresIn: "365d",
            });
            return { token, id };
        });
    }
}
exports.default = new UserService();
