import { SignUpForm } from "@/components/SignUpForm";
import { Toaster } from "@/components/ui/toaster";
const Signup = () => {
  return (
    <div>
      <div className="w-screen h-[100%] flex flex-col justify-center items-center bg-[#191919] gap-y-8 md:overflow-y-hidden overflow-y-scroll">
        <div className=" h-[100%] flex justify-center items-center ">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-[#D4D4D4] text-center pb-4">
              Signup to Organ<span className="text-[#ed5757]">Link</span>
            </h1>
            <div className="w-[400px]">
              <SignUpForm />
            </div>
            <div className=" flex justify-center pt-2">
              <p className="text-[#B9C0C7]">
                Already have an account ? <span> </span>
              </p>
            </div>
          </div>
        </div>
        <Toaster className="bg-[#191919] text-[#D4D4D4]" />
      </div>
    </div>
  );
};

export default Signup;
