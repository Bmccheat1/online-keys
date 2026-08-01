/**
 * Reusable Spinner component for checkout loading states.
 * Mirrors the gateway's Loading component.
 */

export function Spinner({ size = 'sm' }) {
  const sizeMap = { xs: 'w-3.5 h-3.5 border-2', sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-3', lg: 'w-12 h-12 border-4' };
  const s = sizeMap[size] || sizeMap.sm;
  return (
    <div className={`${s} animate-spin rounded-full border-[#1e1e2e] border-t-amber-400`} style={{ borderTopColor: 'rgb(251 191 36)' }} />
  );
}

export default function Loading({ size = 'md', text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size={size} />
      {text && <p className="mt-4 text-gray-500 text-sm">{text}</p>}
    </div>
  );
}
