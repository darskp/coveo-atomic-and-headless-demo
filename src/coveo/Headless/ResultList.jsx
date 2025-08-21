import React, { useEffect, useState } from 'react';
import { buildResultList } from '@coveo/headless';
import { engine } from './engine';

export default function ResultList() {
  const [controller] = useState(() => buildResultList(engine));
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className="mt-4">
        <p>Lists</p>
      {state.results.map((result) => (
        <div key={result.uniqueId} className="border-b py-3">
          <a
            href={result.clickUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold"
          >
            {result.title}
          </a>
          <p className="text-sm text-gray-600">{result.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
