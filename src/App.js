import React, { useState } from 'react';
import UploadComponent from './UploadComponent';
import CanvasDisplay from './CanvasDisplay';
import ResultDisplay from './ResultDisplay';
import '@arco-design/web-react/dist/css/arco.css';

function App() {
  const [image, setImage] = useState(null); // 上传的图片
  const [chartData, setChartData] = useState(null); // 后端返回的识别数据
  const [finalResult, setFinalResult] = useState(null); // 最终的 JSON 结果

  // 上传图片后收到的后端响应数据
  const handleUpload = (imageFile, data) => {
    setImage(imageFile);
    setChartData(data);
  };

  // 确认后的最终 JSON 数据
  const handleConfirm = (data) => {
    setFinalResult(data);
  };

  return (
    <div className="App">
      <h1>图表数据提取工具</h1>
      <UploadComponent onUpload={handleUpload} />
      {image && chartData && (
        <CanvasDisplay
          image={image}
          chartData={chartData}
          onConfirm={handleConfirm}
        />
      )}
      {finalResult && <ResultDisplay data={finalResult} />}
    </div>
  );
}

export default App;