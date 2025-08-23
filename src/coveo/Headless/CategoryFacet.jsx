import React, { useEffect, useState } from 'react';
import { buildFacet } from '@coveo/headless';
import { engine } from './engine';

export default function CategoryFacet() {
  const [controller] = useState(() =>
    buildFacet(engine, { options: { field: 'category' } })
  );
  const [state, setState] = useState(controller.state);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div>
      <h4>Categories</h4>
      {state.values.map((v) => (
        <div key={v.value}>
          <label>
            <input
              type="checkbox"
              checked={v.state === 'selected'}
              onChange={() => controller.toggleSelect(v)}
            />
            {v.value} ({v.numberOfResults})
          </label>
        </div>
      ))}
    </div>
  );
}
