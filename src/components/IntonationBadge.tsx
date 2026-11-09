import React from 'react';

interface IntonationBadgeProps {
  tag: string;
}

export const IntonationBadge: React.FC<IntonationBadgeProps> = ({ tag }) => {
  const upper = tag.toUpperCase().trim();

  if (upper.includes('TEGAS')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-red-100 text-red-800 border border-red-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
        TEGAS
      </span>
    );
  }

  if (upper.includes('LEMBUT')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-sky-100 text-sky-800 border border-sky-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
        LEMBUT
      </span>
    );
  }

  if (upper.includes('JEDA')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800 border border-amber-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
        {upper.replace(/[\[\]]/g, '')}
      </span>
    );
  }

  if (upper.includes('TEKANAN')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 text-purple-800 border border-purple-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
        TEKANAN
      </span>
    );
  }

  if (upper.includes('SEMANGAT')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-orange-100 text-orange-800 border border-orange-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
        SEMANGAT
      </span>
    );
  }

  if (upper.includes('KHIDMAT') || upper.includes('HARU')) {
    return (
      <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 border border-emerald-200 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        {upper.replace(/[\[\]]/g, '')}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center mx-1 px-1.5 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-700 select-none">
      {tag}
    </span>
  );
};

/**
 * Helper to render speech text with visual badges replacing [TAG] syntax.
 */
export const FormattedSpeechText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = text.split(/(\[[^\]]+\])/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return <IntonationBadge key={index} tag={part} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
