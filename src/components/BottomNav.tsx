import React from 'react';
import { Home, Calendar, Layers, ShieldCheck, Activity } from 'lucide-react';

export type TabType = 'today' | 'calendar' | 'library' | 'safety' | 'progress';

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'today', label: 'Hoje', icon: Home },
    { id: 'calendar', label: '21 Dias', icon: Calendar },
    { id: 'library', label: 'Movimentos', icon: Layers },
    { id: 'safety', label: 'Segurança', icon: ShieldCheck },
    { id: 'progress', label: 'Progresso', icon: Activity },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800 shadow-sm">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] transition-colors relative ${
                isActive
                  ? 'text-emerald-800 dark:text-emerald-400 font-semibold'
                  : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight mt-1 leading-none">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
