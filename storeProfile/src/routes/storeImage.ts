import { Router, Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

cloudinary.v2.config({
    cloud_name: 'dohky5q86',
    api_key: '971431767226324',
    api_secret: 'lZcQav4UbfAHM3M2GbcxZ9YtbdM',
    secure: true,
});

const storeImageRouter = Router();

storeImageRouter.post(
    '/',
    upload.single('chunk'),
    async (req: Request, res: Response) => {
        const { userId, chunkIndex, totalChunks } = req.body;
        //@ts-ignore
        const chunk = req.file;

        if (!userId || !chunk) {
            return res.send({
                message: 'User ID and chunk are required',
            });
        }

        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const chunkPath = path.join(uploadDir, `${userId}_${chunkIndex}`);
        await fs.promises.rename(chunk.path, chunkPath);

        // Check if all chunks are uploaded
        const chunkFiles = await fs.promises.readdir(uploadDir);
        const userChunkFiles = chunkFiles.filter((file) =>
            file.startsWith(userId)
        );
        if (userChunkFiles.length === parseInt(totalChunks, 10)) {
            // Combine chunks
            const combinedFilePath = path.join(uploadDir, `${userId}_combined`);
            const writeStream = fs.createWriteStream(combinedFilePath);
            for (let i = 0; i < totalChunks; i++) {
                const chunkFilePath = path.join(uploadDir, `${userId}_${i}`);
                const data = await fs.promises.readFile(chunkFilePath);
                writeStream.write(data);
            }
            writeStream.end();

            // Upload combined file to Cloudinary
            writeStream.on('finish', async () => {
                const uploadResponse = await cloudinary.v2.uploader.upload(
                    combinedFilePath,
                    {
                        public_id: `user_${userId}_${uuidv4()}`,
                        folder: 'user_images',
                    }
                );

                const imageUrl = uploadResponse.secure_url;

                const session = req.neo4jSession;
                const response = await session?.run(
                    `MATCH (u:User) WHERE u.id=$userId
         SET u.image_url = $imageUrl
         RETURN u`,
                    { userId, imageUrl }
                );

                // Clean up chunk files
                userChunkFiles.forEach((file) =>
                    fs.unlinkSync(path.join(uploadDir, file))
                );
                fs.unlinkSync(combinedFilePath);
                console.log(imageUrl);
                res.send({
                    message: 'Storing image successful',
                    imageUrl,
                });
            });
        } else {
            res.send({
                message: 'Chunk uploaded successfully',
            });
        }
    }
);

export default storeImageRouter;
