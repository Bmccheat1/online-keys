export default function Loader({ size = 'md', text = 'Loading...' }) {
  const sizes = { sm: 'h-6 w-6 border-2', md: 'h-10 w-10 border-[3px]', lg: 'h-16 w-16 border-4' };
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className={`${sizes[size]} animate-spin rounded-full border-dark-600/60 border-t-amber-500`} />
        <div className="absolute inset-0 animate-pulse rounded-full" style={{ boxShadow: '0 0 24px rgba(245,158,11,0.15)' }} />
      </div>
      {text && <p className="mt-4 text-dark-400 text-sm tracking-wide">{text}</p>}
    </div>
  );
}
