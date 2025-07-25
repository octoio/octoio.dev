interface NavigationLabelProps {
  id: string;
  label: string;
  isActive: boolean;
  showLabels: boolean;
  onClick: (id: string) => void;
}

export default function NavigationLabel({
  id,
  label,
  isActive,
  showLabels,
  onClick,
}: NavigationLabelProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`absolute right-6 bg-none border-none py-1 px-2 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 focus:outline-none hover:text-indigo-500 hover:bg-indigo-500/10 max-w-[200px] overflow-hidden text-ellipsis ${
        isActive ? "text-indigo-500" : "text-slate-600"
      } ${
        showLabels
          ? "opacity-100 translate-x-0 pointer-events-auto backdrop-blur-md"
          : "opacity-0 translate-x-2.5 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto"
      }`}
    >
      {label}
    </button>
  );
}
