import { Client } from 'minio';
import { Readable } from 'stream';
import axios from 'axios';

// 创建 MinIO 客户端
const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || ''
});

export async function downloadAndUploadImage(
    imageUrl: string,
    bucketName: string,
    objectName: string
) {
    try {
        // 下载图片
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'stream'
        });

        // 确保 bucket 存在
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName);
        }

        // 上传到 MinIO
        const result = await minioClient.putObject(
            bucketName,
            objectName,
            response.data as Readable
        );

        // 生成访问 URL
        const url = await minioClient.presignedGetObject(bucketName, objectName, 24 * 60 * 60); // 24小时有效期

        return {
            etag: result.etag,
            Location: url
        };
    } catch (e) {
        console.log('upload failed:', e);
        throw e;
    }
} 