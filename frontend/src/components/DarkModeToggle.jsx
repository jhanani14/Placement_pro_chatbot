export default function DarkModeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 bg-white text-black px-3 py-1 rounded shadow"
    >
      🌙 Toggle Dark Mode
    </button>
  );
}
