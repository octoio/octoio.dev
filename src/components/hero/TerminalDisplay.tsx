interface TerminalDisplayProps {
  isVisible: boolean;
}

export default function TerminalDisplay({ isVisible }: TerminalDisplayProps) {
  return (
    <div
      className={`relative transition-all duration-1000 delay-300 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
      }`}
    >
      <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white/70 text-sm font-mono ml-2">
            ~/octoio/current-project
          </span>
        </div>

        <div className="font-mono text-sm space-y-2">
          <div className="text-green-400">
            <span className="text-purple-400">$</span> ocaml compile
            game_data.ml
          </div>
          <div className="text-cyan-300 pl-4">
            ✓ Type checking complete
          </div>
          <div className="text-cyan-300 pl-4">
            ✓ C# generation successful
          </div>

          <div className="text-green-400 mt-4">
            <span className="text-purple-400">$</span> unity build
            --target WebGL
          </div>
          <div className="text-cyan-300 pl-4">✓ Assets optimized</div>
          <div className="text-cyan-300 pl-4">
            ✓ Build ready for deployment
          </div>

          <div className="text-green-400 mt-4">
            <span className="text-purple-400">$</span> git commit -m
            &quot;Another epic feature&quot;
          </div>
          <div className="text-cyan-300 pl-4">✓ Ready to ship! 🚀</div>

          <div className="text-purple-400 mt-4 animate-pulse">
            <span className="text-purple-400">$</span>{" "}
            <span className="bg-purple-500/20 px-1">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}