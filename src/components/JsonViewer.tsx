'use client';

interface JsonViewerProps {
  data: any;
}

export function JsonViewer({ data }: JsonViewerProps) {
  const renderValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="pl-4 border-l border-gray-700">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="py-1">
              <span className="text-violet-400">{key}:</span>{' '}
              {renderValue(val)}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-green-400">{JSON.stringify(value)}</span>;
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg font-mono text-sm overflow-auto max-h-[600px]">
      {renderValue(data)}
    </div>
  );
}