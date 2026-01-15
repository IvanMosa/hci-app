import Image from "next/image";
import Link from "next/link";

interface Props {
  open: boolean;
}

export const ExploreModal = ({ open }: Props) => {
  return (
    <div
      className={`
        absolute left-0 top-full mt-2 w-44 rounded-xl bg-white shadow-lg z-50
        transition-all duration-200 ease-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      <ul className="py-2 text-sm">
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image src="/folder.png" alt="Projects Icon" width={16} height={16} />
          <Link href="/projects">Projects</Link>
        </li>

        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Image
            src="/people_alt.png"
            alt="Freelancers Icon"
            width={16}
            height={16}
          />
          <Link href="/freelancers">Freelancers</Link>
        </li>
      </ul>
    </div>
  );
};
