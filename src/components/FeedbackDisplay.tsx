'use client';

interface Persona {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  bio: string;
  feedback: string;
}

interface FeedbackDisplayProps {
  personas: Persona[];
  title: string;
  description: string;
}

export function FeedbackDisplay({ personas, title, description }: FeedbackDisplayProps) {
  return (
    <div className="mt-8 space-y-8">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-violet-400 mb-2">Feedback Summary</h2>
        <p className="text-gray-400">Here's what different personas think about your idea</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, index) => (
          <div 
            key={index}
            className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-violet-500 transition-colors"
          >
            {/* Persona Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">{persona.name}</h3>
                <p className="text-sm text-gray-400">{persona.occupation}</p>
              </div>
            </div>

            {/* Persona Details */}
            <div className="space-y-4">
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>{persona.age} years old</span>
                <span>•</span>
                <span>{persona.gender}</span>
              </div>

              {/* Bio */}
              <div className="text-sm text-gray-300 border-l-2 border-violet-500/50 pl-4">
                {persona.bio}
              </div>

              {/* Feedback */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-violet-400 mb-2">Their Feedback:</h4>
                <p className="text-gray-200">{persona.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}