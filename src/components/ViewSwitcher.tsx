'use client';

type ViewType = 'month' | 'week' | 'day';

interface Props {
    currentView: ViewType;
    onChange: (view: ViewType) => void;
}

export default function ViewSwitcher({ currentView, onChange}: Props) {
    return (
        <div className="flex space-x-2 mb-4">
            {['month', 'week', 'day'].map((view) => (
                <button
                    key={view}
                    onClick={() => onChange(view as ViewType)}
                    className={`px-3 py-1 rounded ${
                        currentView === view ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                >
                    {view === 'month' ? '月' : view === 'week' ? '週' : '日'}
                </button>
            ))}
        </div>
    );
}