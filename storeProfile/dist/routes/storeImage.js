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
const express_1 = require("express");
const cloudinary_1 = __importDefault(require("cloudinary"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECREY,
    secure: true,
});
const storeImageRouter = (0, express_1.Router)();
storeImageRouter.post('/', upload.single('chunk'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, chunkIndex, totalChunks } = req.body;
    //@ts-ignore
    const chunk = req.file;
    if (!userId || !chunk) {
        return res.send({
            message: 'User ID and chunk are required',
        });
    }
    const uploadDir = path_1.default.join(__dirname, 'uploads');
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir);
    }
    const chunkPath = path_1.default.join(uploadDir, `${userId}_${chunkIndex}`);
    yield fs_1.default.promises.rename(chunk.path, chunkPath);
    // Check if all chunks are uploaded
    const chunkFiles = yield fs_1.default.promises.readdir(uploadDir);
    const userChunkFiles = chunkFiles.filter((file) => file.startsWith(userId));
    if (userChunkFiles.length === parseInt(totalChunks, 10)) {
        // Combine chunks
        const combinedFilePath = path_1.default.join(uploadDir, `${userId}_combined`);
        const writeStream = fs_1.default.createWriteStream(combinedFilePath);
        for (let i = 0; i < totalChunks; i++) {
            const chunkFilePath = path_1.default.join(uploadDir, `${userId}_${i}`);
            const data = yield fs_1.default.promises.readFile(chunkFilePath);
            writeStream.write(data);
        }
        writeStream.end();
        // Upload combined file to Cloudinary
        writeStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(combinedFilePath, {
                public_id: `user_${userId}_${(0, uuid_1.v4)()}`,
                folder: 'user_images',
            });
            const imageUrl = uploadResponse.secure_url;
            const session = req.neo4jSession;
            const response = yield (session === null || session === void 0 ? void 0 : session.run(`MATCH (u:User) WHERE u.id=$userId
         SET u.image_url = $imageUrl
         RETURN u`, { userId, imageUrl }));
            // Clean up chunk files
            userChunkFiles.forEach((file) => fs_1.default.unlinkSync(path_1.default.join(uploadDir, file)));
            fs_1.default.unlinkSync(combinedFilePath);
            console.log(imageUrl);
            res.send({
                message: 'Storing image successful',
                imageUrl,
            });
        }));
    }
    else {
        res.send({
            message: 'Chunk uploaded successfully',
        });
    }
}));
exports.default = storeImageRouter;
