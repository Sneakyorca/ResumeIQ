export default function MenuToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`flex h-7 w-7 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border-2 transition-all sm:hidden duration-300 ${
        isOpen ? "border-black p-1 scale-75" : "border-transparent"
      }`}
    >
      <span
        className={`h-[2px] rounded-full bg-black transition-all duration-300 ease-in-out ${
          isOpen ? "w-4 translate-y-[7px] rotate-45" : "w-full"
        }`}
      />

      <span
        className={`h-[2px] w-full rounded-full bg-black transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : ""
        }`}
      />

      <span
        className={`h-[2px] rounded-full bg-black transition-all duration-300 ease-in-out ${
          isOpen ? "w-4 -translate-y-[7px] -rotate-45" : "w-full"
        }`}
      />
    </button>
  );
}
