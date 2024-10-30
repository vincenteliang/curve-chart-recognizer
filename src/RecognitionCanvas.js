import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Line } from 'react-konva';
import { Button } from '@arco-design/web-react';

function RecognitionCanvas({ imageFile, recognitionData, onConfirm }) {
    const [image, setImage] = useState(null);
    const [points, setPoints] = useState(recognitionData.points || []);
    const [legends, setLegends] = useState(recognitionData.legends || []);

    useEffect(() => {
        const img = new window.Image();
        img.src = URL.createObjectURL(imageFile);
        img.onload = () => {
            setImage(img);
        };
    }, [imageFile]);

    // 处理关键点拖动
    const handleDragMove = (e, index) => {
        const newPoints = points.slice();
        newPoints[index] = {
            ...newPoints[index],
            x: e.target.x(),
            y: e.target.y(),
        };
        setPoints(newPoints);
    };

    // 确认结果
    const handleConfirm = () => {
        const adjustedData = {
            points,
            legends,
        };
        onConfirm(adjustedData);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            {image && (
                <Stage width={image.width} height={image.height}>
                    <Layer>
                        {/* 显示上传的图片 */}
                        <KonvaImage image={image} />

                        {/* 标注关键点 */}
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

                        {/* 显示图例 */}
                        {legends.map((legend, index) => (
                            <Text
                                key={index}
                                x={legend.x}
                                y={legend.y}
                                text={legend.text}
                                fontSize={14}
                                fill="blue"
                                draggable
                                onDragMove={(e) => {
                                    const newLegends = legends.slice();
                                    newLegends[index] = {
                                        ...newLegends[index],
                                        x: e.target.x(),
                                        y: e.target.y(),
                                    };
                                    setLegends(newLegends);
                                }}
                            />
                        ))}
                    </Layer>
                </Stage>
            )}
            <Button type="primary" style={{ marginTop: '10px' }} onClick={handleConfirm}>
                确认并提交
            </Button>
        </div>
    );
}

export default RecognitionCanvas;