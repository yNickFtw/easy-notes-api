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
const user_service_1 = __importDefault(require("../services/user.service"));
const getUserIdByToken_1 = require("../middlewares/getUserIdByToken");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, confirmPassword } = req.body;
                if (password !== confirmPassword) {
                    return res.status(401).json({ message: "Passwords don't match" });
                }
                const user = { name, email, password };
                yield user_service_1.default.create(user);
                return res.status(201).json({ message: "User created" });
            }
            catch (error) {
                return res.status(401).json({ message: error.message });
            }
        });
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_service_1.default.authenticate(email, password);
                return res
                    .status(200)
                    .json({ message: "Authenticated with succesfully", user });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    getLoggedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["authorization"];
                const userId = (yield (0, getUserIdByToken_1.getUserIdFromToken)(token));
                const user = yield user_service_1.default.findById(userId);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll();
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_service_1.default.findById(parseInt(id));
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.default = new UserController();
