import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import CTAButtons from "~/components/CTAButton";
import Hero from "~/components/Hero";
import HomeScene from "~/components/HomeScene";
import ScrollIndicator from "~/components/ScrollIndicator";
import Skills from "~/components/Skills";

export const meta: MetaFunction = () => {
  return [
    { title: "P4rth" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return json({
    title: "AI & ML Developer",
    description: "Passionate about AI, Machine Learning, and CUDA Programming",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "CUDA Programming",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "Natural Language Processing"
    ]
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 animated-bg" />
      <div className="fixed inset-0 bg-noise" />
      
      <ClientOnly fallback={<div className="fixed inset-0 bg-black" />}>
        {() => <HomeScene />}
      </ClientOnly>

      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <Hero title={data.title} description={data.description} />
          <Skills skills={data.skills} />
          <CTAButtons />
          <ScrollIndicator />
        </div>
      </div>
    </main>
  );
}

