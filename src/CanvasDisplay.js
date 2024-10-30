import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Message } from '@arco-design/web-react';
import axios from 'axios';

function CanvasDisplay({ image, chartData, onConfirm }) {
    const [points, setPoints] = useState(chartData.points);

    const handleDrag = (index, e, position) => {
        const updatedPoints = [...points];
        updatedPoints[index] = { x: position.x, y: position.y };
        setPoints(updatedPoints);
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post('/api/finalize', { points });
            onConfirm(response.data);
            Message.success('确认完成，结果已生成');
        } catch (error) {
            console.error('确认失败:', error);
            Message.error('确认失败');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <img src={image} alt="chart" style={{ width: '100%', height: 'auto' }} />
            {points.map((point, index) => (
                <Draggable
                    key={index}
                    position={{ x: point.x, y: point.y }}
                    onDrag={(e, position) => handleDrag(index, e, position)}
                >
                    <div style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: '50%' }} />
                </Draggable>
            ))}
            <Button onClick={handleConfirm} style={{ marginTop: '10px' }}>
                确认结果
            </Button>
        </div>
    );
}

export default CanvasDisplay;