import { ActionFunction, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import AboutSection from "~/components/AboutUs";
import ArticlesSection from "~/components/ArticlesSection";
import Contact from "~/components/Contact";
import CTAButtons from "~/components/CTAButton";
import Hero from "~/components/Hero";
import HomeScene from "~/components/HomeScene";
import ProjectsSection from "~/components/ProjectSection";
import ScrollIndicator from "~/components/ScrollIndicator";
import Skills from "~/components/Skills";
import { sendEmail } from "~/services/email.server";
import { getPublicRepositories } from "~/services/github.server";
import { getMediumArticles } from "~/services/medium.server";
import { csrfToken, generateToken } from "~/utils/security.server";

export const meta: MetaFunction = () => {
  return [
    { title: "P4rth" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const username = "sinhaparth5";
  const mediumUsername = "parth-sinha";

  const [repositories, articles] = await Promise.all([
    getPublicRepositories(username),
    getMediumArticles(mediumUsername)
  ]);

  const latestRepos = repositories
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const latestArticles = articles.slice(0, 3);

  const token = await generateToken();

  return json({
    title: "I'm Parth Sinha",
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
    ],
    csrf: token,
    repositories: latestRepos,
    articles: latestArticles,
  }, {
    headers: {
      "Set-Cookie": await csrfToken.serialize(token)
    }
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const result = await sendEmail(formData, request);
  
  if (!result.success) {
    return json({ success: false, error: result.error }, { status: 400 });
  }

  return json({ success: true });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/80 backdrop-blur-xl" />
      </main>
      <AboutSection />
      <ArticlesSection articles={data.articles} />
      <ProjectsSection repositories={data.repositories} />
      <Contact />
    </>
  );
}

