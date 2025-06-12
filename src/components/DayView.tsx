'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Event {
  time: string;
  title: string;
}

interface Props {
  date: Date;
}

export default function DayView({ date }: Props) {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Event>({ time: '', title: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null); // 編集対象

  // ローカルストレージから読み込み
  useEffect(() => {
    const saved = localStorage.getItem(`events-${formattedDate}`);
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents([]);
    }
  }, [formattedDate]);

  // 保存
  const saveToLocalStorage = (updatedEvents: Event[]) => {
    localStorage.setItem(`events-${formattedDate}`, JSON.stringify(updatedEvents));
  };

  // 追加または編集保存
  const handleSave = () => {
    if (!formData.time || !formData.title) return;

    let updatedEvents: Event[];
    if (editIndex !== null) {
      updatedEvents = [...events];
      updatedEvents[editIndex] = formData;
    } else {
      updatedEvents = [...events, formData];
    }

    updatedEvents.sort((a, b) => a.time.localeCompare(b.time));
    setEvents(updatedEvents);
    saveToLocalStorage(updatedEvents);
    setFormData({ time: '', title: '' });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    saveToLocalStorage(updatedEvents);
  };

  const handleEdit = (index: number) => {
    setFormData(events[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">{format(date, 'yyyy年M月d日')} の予定</h2>

      <ul className="space-y-2 mb-4">
        {events.length === 0 && (
          <li className="text-gray-500">予定はまだありません。</li>
        )}
        {events.map((event, index) => (
          <li key={index} className="p-2 bg-blue-100 rounded flex justify-between items-center">
            <div>
              <span className="font-semibold">{event.time}</span> - {event.title}
            </div>
            <div className="space-x-1">
              <button
                onClick={() => handleEdit(index)}
                className="px-2 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-2 py-1 text-sm bg-red-400 text-white rounded hover:bg-red-500"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showForm ? (
        <div className="space-y-2 bg-gray-100 p-4 rounded">
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="予定の内容"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setShowForm(false);
                setEditIndex(null);
                setFormData({ time: '', title: '' });
              }}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editIndex !== null ? '更新' : '保存'}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ＋予定を追加
        </button>
      )}
    </div>
  );
}
