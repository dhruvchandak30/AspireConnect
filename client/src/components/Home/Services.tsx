import ServiceCard from "./ServiceCard";
import GoalBasedMatching from "../../assets/GoalBasedMatching.jpeg";
import Profile from "../../assets/Profile.jpeg";
import VideoCall from "../../assets/VideoCall.jpeg";
type ServiceCardProps = {
  img: string;
  text: string;
  desc: string;
};

const features: ServiceCardProps[] = [
  {
    img: GoalBasedMatching,
    text: "Goal-Based Matching",
    desc: "Utilize advanced AI algorithms to match users based on shared long-term life goals, such as career ambitions, personal growth objectives, and family plans, fostering meaningful and goal-oriented connections.",
  },
  {
    img: Profile,
    text: "Comprehensive User Profiles",
    desc: "Create detailed user profiles that encompass a wide range of personal information, including goals, hobbies, interests, and aspirations, journey, providing a holistic view to better align users with potential matches.",
  },
  {
    img: VideoCall,
    text: "Chat and Video Call with Matched People",
    desc: "Facilitate seamless communication between matched users through integrated chat and video call features, enabling real-time interaction and fostering deeper connections.",
  },
];

const Services = () => {
  return (
    <div className=" lg:mx-16 mx-6 lg:py-8 py-4">
      <div className="text-5xl font-serif  font-bold mb-4 text-center">
        Our Services
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <ServiceCard
            key={index}
            img={feature.img}
            text={feature.text}
            desc={feature.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
