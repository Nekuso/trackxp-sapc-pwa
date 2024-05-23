import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageInput({ data }: { data: any }) {
  return (
    <Avatar className="w-32 h-32 rounded-lg  cursor-pointer z-0">
      <AvatarImage className="rounded-lg" src={data} alt={"something"} />
      <AvatarFallback className="bg-darkBg rounded-lg">+</AvatarFallback>
    </Avatar>
  );
}
