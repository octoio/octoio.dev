import type { MDXComponents } from 'mdx/types'
import CopyCodeButton from './src/components/CopyCodeButton'
import HeadingAnchor from './src/components/HeadingAnchor'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-semibold text-slate-800 mb-8 mt-0" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 mt-12" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold text-slate-800 mb-4 mt-8" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-semibold text-slate-800 mb-3 mt-6" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="text-lg font-semibold text-slate-800 mb-2 mt-4" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 className="text-base font-semibold text-slate-800 mb-2 mt-4" {...props}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }) => (
      <p className="text-slate-600 leading-relaxed mb-6" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="text-slate-600 mb-6 pl-6 space-y-2 list-disc" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="text-slate-600 mb-6 pl-6 space-y-2 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    pre: ({ children, ...props }) => (
      <div className="relative mb-6">
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm" {...props}>
          {children}
        </pre>
      </div>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className?.includes('language-')
      if (isInline) {
        return (
          <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        )
      }
      return (
        <code className={`${className || ''} text-slate-100 font-mono text-sm`} {...props}>
          {children}
        </code>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-slate-700" {...props}>
        {children}
      </blockquote>
    ),
    a: ({ children, href, ...props }) => (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-slate-200" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-slate-200 bg-slate-50 px-4 py-2 text-left font-semibold text-slate-800" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-slate-200 px-4 py-2 text-slate-600" {...props}>
        {children}
      </td>
    ),
    hr: ({ ...props }) => (
      <hr className="border-t border-slate-200 my-8" {...props} />
    ),
    ...components,
  }
}