
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="opacity-80 mb-4">Built with Next.js</p>
        <div className="flex justify-center gap-8 mb-4 flex-col md:flex-row md:gap-8">
          <a href="#projects" className="text-slate-400 hover:text-indigo-200 transition-colors duration-200">
            Projects
          </a>
          <a href="#posts" className="text-slate-400 hover:text-indigo-200 transition-colors duration-200">
            Posts
          </a>
          <a href="#connect" className="text-slate-400 hover:text-indigo-200 transition-colors duration-200">
            Connect
          </a>
          <a href="mailto:octoiodev@gmail.com" className="text-slate-400 hover:text-indigo-200 transition-colors duration-200">
            Contact
          </a>
        </div>
        <p className="text-sm opacity-60 mt-4">
          © {new Date().getFullYear()} Octoio. Made with ❤️ for the dev community.
        </p>
      </div>
    </footer>
  );
}
