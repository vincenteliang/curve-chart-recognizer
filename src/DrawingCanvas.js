import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Line } from 'react-konva';

function DrawingCanvas({ selectedDataset }) {
    const [image, setImage] = useState(null);
    const [points, setPoints] = useState([
        { x: 50, y: 150 },
        { x: 100, y: 200 },
        { x: 150, y: 100 },
        { x: 200, y: 250 },
    ]);

    useEffect(() => {
        const img = new window.Image();
        img.src = 'path/to/your/chart/image.png';  // 请替换为实际的图片路径
        img.onload = () => setImage(img);
    }, []);

    const handleDragMove = (e, index) => {
        const newPoints = [...points];
        newPoints[index] = {
            x: e.target.x(),
            y: e.target.y(),
        };
        setPoints(newPoints);
    };

    return (
        <Stage width={600} height={400}>
            <Layer>
                {/* 显示图表图片 */}
                {image && <KonvaImage image={image} />}

                {/* 显示数据点 */}
                {points.map((point, index) => (
                    <Circle
                        key={index}
                        x={point.x}
                        y={point.y}
                        radius={5}
                        fill="red"
                        draggable
                        onDragMove={(e) => handleDragMove(e, index)}
                    />
                ))}

                {/* 连接数据点，形成曲线 */}
                <Line
                    points={points.flatMap(p => [p.x, p.y])}
                    stroke="red"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                />
            </Layer>
        </Stage>
    );
}

export default DrawingCanvas;