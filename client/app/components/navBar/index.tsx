import Image from "next/image";
import profileGeneric from "@/app/assets/profileGeneric.png";

export default function NavBar() {
  return (
    <div className="bg-slate-800 flex justify-between items-center p-4">
      <h1 className="text-xl text-slate-200">Ticketify</h1>
      <button>
        <div className="bg-slate-200 p-1 rounded-full border-2 border-slate-400 hover:border-blue-500 hover:bg-slate-300">
            <Image
              src={profileGeneric}
              alt="ProfileImage"
              width={30}
              height={30}
            ></Image>
        </div>
      </button>
    </div>
  );
}
