import React, { useState } from 'react';
import { Upload, Message } from '@arco-design/web-react';
import axios from 'axios';

function UploadComponent({ onUpload }) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(URL.createObjectURL(file), response.data);
            Message.success('图片上传成功');
        } catch (error) {
            console.error('上传失败:', error);
            Message.error('图片上传失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={({ file }) => handleUpload(file)}
            disabled={loading}
        >
            <button disabled={loading}>
                {loading ? '上传中...' : '点击上传图片'}
            </button>
        </Upload>
    );
}

export default UploadComponent;