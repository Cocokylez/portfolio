export default function Footer() {
  return (
    <footer
      className="relative z-10 text-center py-7
        text-[0.8rem] text-[#8e8e93] dark:text-[#636366]
        border-t border-black/[0.07] dark:border-white/[0.08]
        transition-colors duration-500"
    >
      © {new Date().getFullYear()} Adrian Kyle Condeza · Built with care
    </footer>
  )
}
