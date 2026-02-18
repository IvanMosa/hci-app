import Link from "next/link";

interface ButtonProps {
  content?: string;
}

export const Button = ({ content }: ButtonProps) => {
  return (
    <Link
      href="/login"
      className="bg-[#070415] text-white border rounded-[46px] px-4 py-3 text-[12px] hover:bg-gray-800 transition uppercase hover:cursor-pointer inline-block"
    >
      {content}
    </Link>
  );
};
