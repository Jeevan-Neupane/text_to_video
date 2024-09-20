import Image from "next/image";
import MaxWidthWrapper from "./components/common/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-black bg-white">
      <div className="h-[52px] bg-white border-b border-b-gray-200 shadow-md flex items-center">
        <MaxWidthWrapper>
          <div>
          Navbar
          </div>
        </MaxWidthWrapper>

      </div>
      
      <div className="pt-[60px] min-h-screen">
          <MaxWidthWrapper>
            <div>
              <h1 className="text-3xl text-center">Enter anything you want to learn</h1>
              <div className="flex items-center mt-5 text-5xl">
              <Input placeholder="Enter anything you want to learn" className="text-lg" required/>
              <Button className="text-lg">Generate Video</Button>
              </div>
              
            </div>
          </MaxWidthWrapper>
      </div>
    </div>

  );
}
