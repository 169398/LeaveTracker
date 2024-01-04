import { SignIn } from "@clerk/nextjs";

export default function page(){
    return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-0"><SignIn/></div>
    );
}