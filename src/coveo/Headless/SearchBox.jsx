import React, { useEffect, useState } from 'react';
import { buildSearchBox } from '@coveo/headless';
import { engine } from './engine';

export default function SearchBox() {
  const [controller] = useState(() => buildSearchBox(engine));
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
        placeholder="Search..."
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button
        onClick={() => controller.submit()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
