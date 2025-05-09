export function ActionButton({ onClick, text, color, type }) {
  if (color == "liver") {
    color = "bg-[#976b83] hover:bg-[#7f576c] border-[#6a4a5a]";
  } else if (color == "chestnut") {
    color = "bg-[#9d6e62] hover:bg-[#8a5a55] border-[#744a49]";
  } else if (color == "hookers") {
    color = "bg-[#709781] hover:bg-[#507a64] border-[#3c5f4d]";
  } else if (color == "carmine") {
    color = "bg-[#c7374a] hover:bg-[#ae2a3f] border-[#8d2438]";
  }

  return (
    <button type={type} onClick={onClick} className={`${color} px-2 py-0 text-sm rounded-lg border cursor-pointer text-white`}>
      {text}
    </button>
  );
}
