import CreateGroupForm from "@/components/CreateGroupForm";

export default function Home() {
  return (
    <div className="bg-sky-100 min-h-screen">
      <div className="lg:w-1/2 md:w-2/3 w-full m-auto px-5 md:px-0 pt-10">
        <CreateGroupForm/>
      </div>
    </div>
  );
}
