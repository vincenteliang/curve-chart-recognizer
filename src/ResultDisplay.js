import React from 'react';
import { JSONTree } from 'react-json-tree';

function ResultDisplay({ data }) {
    return (
        <div>
            <h2>最终识别结果</h2>
            <JSONTree data={data} />
        </div>
    );
}

export default ResultDisplay;