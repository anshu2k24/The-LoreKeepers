
import React from 'react';
import { Book, Brain, Clock, Trophy } from 'lucide-react';

const Index = () => {
  const stats = [
    { icon: Book, label: 'Notes Created', value: '24' },
    { icon: Brain, label: 'Study Hours', value: '48' },
    { icon: Clock, label: 'Last Session', value: '2h ago' },
    { icon: Trophy, label: 'Streak', value: '5 days' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-neutral-900">
          Welcome back, Student!
        </h1>
        <p className="text-lg text-neutral-600">
          Ready to continue your learning journey?
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">{label}</p>
              <p className="text-2xl font-semibold text-neutral-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Recent Notes
          </h2>
          <div className="space-y-3">
            {['Physics Chapter 5', 'Math Formulas', 'History Notes'].map((note) => (
              <div
                key={note}
                className="p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 
                         transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{note}</span>
                <span className="text-sm text-neutral-500">2 days ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Study Reminders
          </h2>
          <div className="space-y-3">
            {[
              'Review Physics formulas',
              'Complete Math exercises',
              'Prepare for History test',
            ].map((reminder) => (
              <div
                key={reminder}
                className="p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 
                         transition-colors cursor-pointer flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="rounded border-neutral-300 text-primary 
                           focus:ring-primary"
                />
                <span>{reminder}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
